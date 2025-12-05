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
Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

Route::apiResource('etudiants', EtudiantController::class);
Route::apiResource('professeurs', ProfesseurController::class);
Route::apiResource('matieres', MatiereController::class);
Route::apiResource('notes', NoteController::class);
Route::apiResource('plannings', PlanningController::class);
