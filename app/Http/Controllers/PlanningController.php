<?php

namespace App\Http\Controllers;

use App\Models\Planning;
use Illuminate\Http\Request;

class PlanningController extends Controller
{
    /**
     * GOAL: Get the full schedule.
     */
    public function index()
    {
        // Include Student and Subject names
        $plannings = Planning::with(['etudiant', 'matiere'])->get();
        return response()->json($plannings, 200);
    }

    /**
     * GOAL: Schedule a class for a student.
     */
    public function store(Request $request)
    {
        $fields = $request->validate([
            'jour' => 'required|date',
            'horaire' => 'required', // e.g. "08:30"
            'etudiant_id' => 'required|exists:etudiants,id',
            'matiere_id' => 'required|exists:matieres,id',
        ]);

        $planning = Planning::create($fields);

        return response()->json($planning, 201);
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
