<?php

namespace App\Http\Controllers;

use App\Models\Etudiant;
use Illuminate\Http\Request;

class EtudiantController extends Controller
{
    // List all students.
    public function index()
    {
        // Fetch all students from the database
        return response()->json(Etudiant::all(), 200);
    }

    // Create a new student.
    public function store(Request $request)
    {
        // 1. Validation: Ensure required fields are present and email is unique
        $fields = $request->validate([
            'nom' => 'required|string|max:255',
            'prenom' => 'required|string|max:255',
            'email' => 'required|email|unique:etudiants',
            'mot_de_passe' => 'required|min:6',
        ]);

        $etudiant = Etudiant::create($fields);

        // 3. Response: Return the created object with HTTP 201 (Created)
        return response()->json($etudiant, 201);
    }

    // Fetch a specific student by ID.
    public function show($id)
    {
        // findOrFail throws a 404 error if the ID doesn't exist
        $etudiant = Etudiant::findOrFail($id);

        return response()->json($etudiant, 200);
    }


    // Update a student's info.

    public function update(Request $request, $id)
    {
        $etudiant = Etudiant::findOrFail($id);

        $fields = $request->validate([
            'nom' => 'sometimes|string|max:255',
            'prenom' => 'sometimes|string|max:255',
            'email' => 'sometimes|email|unique:etudiants,email,' . $id, // Ignore current user's email check
            'mot_de_passe' => 'sometimes|min:6',
        ]);

        $etudiant->update($fields);

        return response()->json($etudiant, 200);
    }


    //Remove a student.

    public function destroy($id)
    {
        Etudiant::destroy($id);
        return response()->json(['message' => 'Étudiant supprimé'], 200);
    }
}
