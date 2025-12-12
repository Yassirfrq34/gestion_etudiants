<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\EtudiantController;
use App\Http\Controllers\ProfesseurController;
use App\Http\Controllers\MatiereController;
use App\Http\Controllers\NoteController;
use App\Http\Controllers\PlanningController;
use App\Http\Controllers\AuthController;

Route::post('/login', [AuthController::class, 'login']);
Route::middleware('auth:sanctum')->post('/logout', [AuthController::class, 'logout']);

Route::get('/fix-student-db', function () {
    try {
        // 1. Drop and Create Table
        Illuminate\Support\Facades\Schema::dropIfExists('etudiants_new');

        Illuminate\Support\Facades\Schema::create('etudiants_new', function (Illuminate\Database\Schema\Blueprint $table) {
            $table->id();
            $table->string('nom');
            $table->string('prenom');
            $table->string('email')->unique();
            $table->string('mot_de_passe'); // Note: standard Laravel is 'password', but this project uses 'mot_de_passe'
            $table->timestamps();
        });

        // 2. Add 'etudiants_new' to Model (Dynamically if possible, but we will edit the file too)
        // We assume the file is ALREADY edited or we edit it now.
        // Actually, we should edit the Model file FIRST so that Etudiant::create uses the right table.
        // But for this script, we can force the table on the instance if needed, or just rely on the edited model.

        return 'Schema Created. Now creating user...';
    } catch (\Exception $e) {
        return 'Error: ' . $e->getMessage();
    }
});

Route::get('/seed-student-db', function () {
    try {
        App\Models\Etudiant::create([
            'nom' => 'Etudiant 1',
            'prenom' => 'Test',
            'email' => 'etudiant1@student.com',
            'mot_de_passe' => Illuminate\Support\Facades\Hash::make('student123')
        ]);
        return 'Student Seeded in etudiants_new';
    } catch (\Exception $e) {
        return 'Seed Error: ' . $e->getMessage();
    }
});
Route::post('/register', [AuthController::class, 'register']);

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

Route::apiResource('etudiants', EtudiantController::class);
Route::apiResource('professeurs', ProfesseurController::class);
Route::apiResource('matieres', MatiereController::class);
Route::apiResource('notes', NoteController::class);
Route::apiResource('plannings', PlanningController::class);