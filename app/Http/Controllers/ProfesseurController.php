<?php

namespace App\Http\Controllers;

use App\Models\Professeur;
use Illuminate\Http\Request;

class ProfesseurController extends Controller
{
    // List all professors
    public function index()
    {
        return response()->json(Professeur::all(), 200);
    }

    // Create a new professor
    public function store(Request $request)
    {
        $fields = $request->validate([
            'nom' => 'required|string|max:255',
            'email' => 'required|email|unique:professeurs',
            'mot_de_passe' => 'required|min:6',
        ]);

        $professeur = Professeur::create($fields);

        return response()->json($professeur, 201);
    }

    // Show a specific professor
    public function show($id)
    {
        $professeur = Professeur::findOrFail($id);
        return response()->json($professeur, 200);
    }

    // Update a professor
    public function update(Request $request, $id)
    {
        $professeur = Professeur::findOrFail($id);

        $fields = $request->validate([
            'nom' => 'sometimes|string|max:255',
            'email' => 'sometimes|email|unique:professeurs,email,' . $id,
            'mot_de_passe' => 'sometimes|min:6',
        ]);

        $professeur->update($fields);

        return response()->json($professeur, 200);
    }

    // Delete a professor
    public function destroy($id)
    {
        Professeur::destroy($id);
        return response()->json(['message' => 'Professeur supprimé'], 200);
    }
}
