<?php

namespace App\Http\Controllers;

use App\Models\Note;
use Illuminate\Http\Request;

class NoteController extends Controller
{
    /**
     * GOAL: Get all grades.
     * USED BY: Admin (to see everything) or Profs.
     */
    public function index()
    {
        // "with" is Eager Loading. It means: "Get the grade, BUT ALSO include the student's name and subject name."
        // If we don't use this, React only gets IDs (student_id: 1) which is useless for the user.
        $notes = Note::with(['etudiant', 'matiere', 'professeur'])->get();

        return response()->json($notes, 200);
    }

    /**
     * GOAL: Add a grade to a student.
     */
    public function store(Request $request)
    {
        $fields = $request->validate([
            'valeur' => 'required|numeric|min:0|max:20', // Grades are 0-20
            'etudiant_id' => 'required|exists:etudiants,id', // Student must exist
            'matiere_id' => 'required|exists:matieres,id',
            'professeur_id' => 'required|exists:professeurs,id',
        ]);

        $note = Note::create($fields);

        return response()->json($note, 201);
    }

    /**
     * GOAL: Show one specific grade details.
     */
    public function show($id)
    {
        $note = Note::with(['etudiant', 'matiere'])->find($id);

        if (!$note) {
            return response()->json(['message' => 'Note introuvable'], 404);
        }
        return response()->json($note, 200);
    }

    /**
     * GOAL: Update a grade (e.g. correct a mistake).
     */
    public function update(Request $request, $id)
    {
        $note = Note::find($id);
        if (!$note) {
            return response()->json(['message' => 'Note introuvable'], 404);
        }

        $fields = $request->validate([
            'valeur' => 'required|numeric|min:0|max:20',
        ]);

        $note->update($fields);

        return response()->json($note, 200);
    }

    /**
     * GOAL: Delete a grade.
     */
    public function destroy($id)
    {
        Note::destroy($id);
        return response()->json(['message' => 'Note supprimée'], 200);
    }
}
