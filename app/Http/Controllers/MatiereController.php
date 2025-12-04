<?php

namespace App\Http\Controllers;

use App\Models\Matiere;
use Illuminate\Http\Request;

class MatiereController extends Controller
{
    /**
     * GOAL: Get all subjects (e.g., Math, History, Java).
     * USED BY: Admin (to manage them) and Students (to see what they study).
     */
    public function index()
    {
        return response()->json(Matiere::all(), 200);
    }

    /**
     * GOAL: Create a new subject.
     */
    public function store(Request $request)
    {
        $fields = $request->validate([
            'nom' => 'required|string|unique:matieres|max:255',
        ]);

        $matiere = Matiere::create($fields);

        return response()->json($matiere, 201);
    }

    /**
     * GOAL: Show one subject.
     */
    public function show($id)
    {
        $matiere = Matiere::find($id);
        if (!$matiere) {
            return response()->json(['message' => 'Matière introuvable'], 404);
        }
        return response()->json($matiere, 200);
    }

    /**
     * GOAL: Update a subject name.
     */
    public function update(Request $request, $id)
    {
        $matiere = Matiere::find($id);
        if (!$matiere) {
            return response()->json(['message' => 'Matière introuvable'], 404);
        }

        $fields = $request->validate([
            'nom' => 'required|string|unique:matieres,nom,' . $id,
        ]);

        $matiere->update($fields);

        return response()->json($matiere, 200);
    }

    /**
     * GOAL: Delete a subject.
     */
    public function destroy($id)
    {
        Matiere::destroy($id);
        return response()->json(['message' => 'Matière supprimée'], 200);
    }
}
