<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use App\Models\Student;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Database\QueryException;

class StudentController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        try {
            $students = Student::all();
            return response()->json($students);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to retrieve students', 'message' => $e->getMessage()], 500);
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
            'fullname' => 'required|string',
            'username' => 'required|string|unique:students',
            'email' => 'required|string|email|unique:students',
            'password' => 'required|string',
            'course' => 'nullable|string',
            'phone' => 'nullable|string',
            'gender' => 'nullable|string'
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        try {
            $student = new Student([
                'fullname' => $request->fullname,
                'username' => $request->username,
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'course' => $request->course,
                'phone' => $request->phone,
                'gender' => $request->gender,
            ]);

            $student->save();

            return response()->json(['success' => true, 'message' => 'Student created successfully', 'student' => $student], 201);
        } catch (QueryException $e) {
            return response()->json(['error' => 'Database query error', 'message' => $e->getMessage()], 500);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to create student', 'message' => $e->getMessage()], 500);
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
            $student = Student::find($id);
            if (!$student) {
                return response()->json(['message' => 'Student not found'], 404);
            }

            return response()->json($student);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to retrieve student', 'message' => $e->getMessage()], 500);
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
            $student = Student::find($id);

            if (!$student) {
                return response()->json(['message' => 'Student not found'], 404);
            }

            $validator = Validator::make($request->all(), [
                'fullname' => 'required|string',
                'username' => 'required|string|unique:students,username,' . $student->id,
                'email' => 'required|string|email|unique:students,email,' . $student->id,
                'password' => 'nullable|string',
                'course' => 'nullable|string',
                'phone' => 'nullable|string',
                'gender' => 'nullable|string',
            ]);

            if ($validator->fails()) {
                return response()->json($validator->errors(), 422);
            }

            $student->update($request->only(['fullname', 'username', 'email', 'course', 'phone', 'gender']));

            if ($request->has('password')) {
                $student->password = Hash::make($request->password);
                $student->save();
            }

            return response()->json(['success' => true, 'message' => 'Student updated successfully', 'student' => $student]);
        } catch (QueryException $e) {
            return response()->json(['error' => 'Database query error', 'message' => $e->getMessage()], 500);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to update student', 'message' => $e->getMessage()], 500);
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
            $student = Student::find($id);

            if (!$student) {
                return response()->json(['message' => 'Student not found'], 404);
            }

            $student->delete();
            return response()->json(['message' => 'Student deleted successfully']);
        } catch (QueryException $e) {
            return response()->json(['error' => 'Database query error', 'message' => $e->getMessage()], 500);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to delete student', 'message' => $e->getMessage()], 500);
        }
    }
}
