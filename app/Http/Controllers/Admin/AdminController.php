<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Database\QueryException;

class AdminController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        try {
            $query = User::query();

            //searching
            if($request->has('search')) {
                $search = $request->get('search');

                //get column from table user
                $searchableColumns = (new User)->getFillable();

                //delete password column from the array, because the password does'nt need to be searched
                if(($key = array_search('password', $searchableColumns)) !== false) {
                    unset($searchableColumns[$key]);
                }

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
             $user = $query->paginate($perPage, ['*'], 'page', $page);

             //auto add queue number
             $user->getCollection()->transform(function ($users, $key) use ($page, $perPage) {
                 $users->no = ($key + 1) + ($perPage * ($page - 1));
                 return $users;
             });

             //hide password field from response
             $user->makeHidden(['password']);

             return response()->json($user);
        } catch (\Throwable $e) {
            return response()->json(['error' => 'Failed to retrieve user', 'message' => $e->getMessage()], 500);
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
            'name' => 'required|string',
            'email' => 'required|string|email|unique:users',
            'password' => 'required|string',
            'role' => 'required|string|in:administrator,adminbranch'
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        try {
            $users = new User([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'role' => $request->role,
            ]);

            $users->save();

            return response()->json(['success' => true, 'message' => 'Users created successfully', 'users' => $users], 201);
        } catch (QueryException $e) {
            return response()->json(['error' => 'Database query error', 'message' => $e->getMessage()], 500);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to create user', 'message' => $e->getMessage()], 500);
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
            $users = User::find($id);
            if (!$users) {
                return response()->json(['message' => 'Users not found'], 404);
            }

            return response()->json($users);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to retrieve users', 'message' => $e->getMessage()], 500);
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
            $user = User::find($id);

            if (!$user) {
                return response()->json(['message' => 'User not found'], 404);
            }

            $validator = Validator::make($request->all(), [
                'name' => 'required|string',
                'email' => 'required|string|email|unique:users,email,' . $user->id,
                'password' => 'nullable|string',
                'role' => 'nullable|string|in:administrator,adminbranch',
            ]);

            if ($validator->fails()) {
                return response()->json($validator->errors(), 422);
            }

            $user->update($request->only(['name', 'email','role']));

            if ($request->has('password')) {
                $user->password = Hash::make($request->password);
                $user->save();
            }

            return response()->json(['success' => true, 'message' => 'User updated successfully', 'user' => $user]);
        } catch (QueryException $e) {
            return response()->json(['error' => 'Database query error', 'message' => $e->getMessage()], 500);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to update user', 'message' => $e->getMessage()], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(string $id)
    {
       try {
            $user = User::find($id);

            if (!$user) {
                return response()->json(['message' => 'User not found'], 404);
            }

            $user->delete();
            return response()->json(['message' => 'User deleted successfully']);
        } catch (QueryException $e) {
            return response()->json(['error' => 'Database query error', 'message' => $e->getMessage()], 500);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to delete user', 'message' => $e->getMessage()], 500);
        }
    }
}
