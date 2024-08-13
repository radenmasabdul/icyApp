<?php

namespace App\Http\Controllers\Course;

use App\Http\Controllers\Controller;
use App\Models\Course;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Database\QueryException;

class CourseController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        try {
            $query = Course::query();

            //filter by level
            if($request->has('level') && !empty($request->level)) {
                $query->where('level', $request->level);
            }

            //searching
            if($request->has('search')) {
                $search = $request->get('search');

                //get column from table student
                $searchableColumns = (new Course)->getFillable();

                //do searching
                $query->where(function ($q) use ($search, $searchableColumns) {
                    foreach ($searchableColumns as $column) {
                        $q->orWhere($column, 'like', '%' . $search . '%');
                    }
                });
            }

            //pagination
            $page = $request->get('page', 1);
            $perPage = $request->get('perPage', 10);

            //get the paginate result
            $course = $query->paginate($perPage, ['*'], 'page', $page);

            //auto add queue number
            $course->getCollection()->transform(function ($courses, $key) use ($page, $perPage) {
                $courses->no = ($key + 1) + ($perPage * ($page - 1));
                return $courses;
            });

            return response()->json($course);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to retrieve course', 'message' => $e->getMessage()], 500);
        }
    }

     /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|unique:courses',
            'description' => 'required|string',
            'instructor' => 'required|unique:courses',
            'duration' => 'required|integer',
            'level' => 'required|string',
            'price' => 'required|numeric',
            'start_date' => 'required|string',
            'end_date' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        try {
            $course = new Course([
                'title' => $request->title,
                'description' => $request->description,
                'instructor' => $request->instructor,
                'duration' => $request->duration,
                'level' => $request->level,
                'price' => $request->price,
                'start_date' => $request->start_date,
                'end_date' => $request->end_date,
            ]);

            $course->save();

            return response()->json(['success' => true, 'message' => 'Courses created successfully', 'course' => $course], 201);
        } catch (QueryException $e) {
            return response()->json(['error' => 'Database query error', 'message' => $e->getMessage()], 500);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to create course', 'message' => $e->getMessage()], 500);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($id)
    {
        try {
            $course = Course::find($id);
            if (!$course) {
                return response()->json(['message' => 'Course not found'], 404);
            }

            return response()->json($course);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to retrieve course', 'message' => $e->getMessage()], 500);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, $id)
    {
        try {
            $course = Course::find($id);

            if (!$course) {
                return response()->json(['message' => 'Course not found'], 404);
            }

            $validator = Validator::make($request->all(), [
                'title' => 'required|string',
                'description' => 'required|string',
                'instructor' => 'required|string',
                'duration' => 'required|integer',
                'level' => 'required|string',
                'price' => 'required|numeric',
                'start_date' => 'required|string',
                'end_date' => 'required|string',
            ]);

            if ($validator->fails()) {
                return response()->json($validator->errors(), 422);
            }

            $course->update($request->only(['title', 'description', 'instructor', 'duration', 'level', 'price', 'start_date', 'end_date']));

            $course->save();

            return response()->json(['success' => true, 'message' => 'Course updated successfully', 'course' => $course]);
        } catch (QueryException $e) {
            return response()->json(['error' => 'Database query error', 'message' => $e->getMessage()], 500);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to update course', 'message' => $e->getMessage()], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy($id)
    {
        try {
            $course = Course::find($id);

            if (!$course) {
                return response()->json(['message' => 'Course not found'], 404);
            }

            $course->delete();
            return response()->json(['message' => 'Course deleted successfully']);
        } catch (QueryException $e) {
            return response()->json(['error' => 'Database query error', 'message' => $e->getMessage()], 500);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to delete course', 'message' => $e->getMessage()], 500);
        }
    }
}
