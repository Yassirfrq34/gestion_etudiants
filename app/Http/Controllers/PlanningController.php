<?php

namespace App\Http\Controllers;

use App\Models\Planning;
use Illuminate\Http\Request;

class PlanningController extends Controller
{
    // Fonction pour récupérer l'emploi du temps
    public function index(Request $request)
    {
        // Si on a un ID étudiant, on filtre les plannings pour cet étudiant
        if ($request->has('etudiant_id')) {
            return Planning::with('matiere') // On charge aussi les infos de la matière
                ->where('etudiant_id', $request->etudiant_id)
                ->get();
        }
        return []; // Sinon on retourne une liste vide
    }

    /**
     * GOAL: Schedule a class for a student.
     */
    // Fonction pour ajouter une séance
    public function store(Request $request)
    {
        // Validation des données reçues
        $request->validate([
            'jour' => 'required', // Date
            'horaire' => 'required', // Heure
            'etudiant_id' => 'required|exists:etudiants,id', // L'étudiant doit exister
            'matiere_id' => 'required|exists:matieres,id', // La matière doit exister
        ]);

        // Création de la séance
        return Planning::create($request->all());
    }

    public function show($id)
    {
        $planning = Planning::with(['etudiant', 'matiere'])->find($id);
        if (!$planning) {
            return response()->json(['message' => 'Planning introuvable'], 404);
        }
        return response()->json($planning, 200);
    }

    public function update(Request $request, $id)
    {
        $planning = Planning::find($id);
        if (!$planning) {
            return response()->json(['message' => 'Planning introuvable'], 404);
        }

        $fields = $request->validate([
            'jour' => 'sometimes|date',
            'horaire' => 'sometimes',
        ]);

        $planning->update($fields);
        return response()->json($planning, 200);
    }

    public function destroy($id)
    {
        Planning::destroy($id);
        return response()->json(['message' => 'Planning supprimé'], 200);
    }
}
