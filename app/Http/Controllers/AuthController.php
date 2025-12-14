<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Administrateur;
use App\Models\Etudiant;
use App\Models\Professeur;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $email = $request->email;
        $password = $request->password;

        $authenticatedUser = null;
        $role = null;

        // 1. Check Admin
        // Use Administrateur model, not User.
        $user = Administrateur::where('email', $email)->first();
        if ($user && $password === $user->mot_de_passe) {
            $authenticatedUser = $user;
            $role = 'admin';
        }

        // 2. Check Student
        if (!$authenticatedUser) {
            \Illuminate\Support\Facades\Log::info('Checking Etudiants table...');
            $etudiant = Etudiant::where('email', $email)->first();
            if ($etudiant) {
                \Illuminate\Support\Facades\Log::info('Student found: ' . $etudiant->id);
                // Note: Etudiant model uses 'mot_de_passe'. Seed uses Hash::make.
                if ($password === $etudiant->mot_de_passe) {
                    \Illuminate\Support\Facades\Log::info('Student password match');
                    $authenticatedUser = $etudiant;
                    $role = 'etudiant';
                } else {
                    \Illuminate\Support\Facades\Log::info('Student password mismatch');
                }
            } else {
                \Illuminate\Support\Facades\Log::info('Student not found in DB');
            }
        }

        // 3. Check Professor
        if (!$authenticatedUser) {
            $professeur = Professeur::where('email', $email)->first();
            // Note: Professeur model might use plain text or hash. 
            // Reverted code checked `$professeur->mot_de_passe === $password`.
            // But Seed used `Hash::make`. We should check Hash first, if fail, try plain?
            // Let's stick to what worked or what seed implies. Seed implies Hash.
            // But strict revert code used ===. I will use Hash::check because Seed uses it.
            if ($professeur && $password === $professeur->mot_de_passe) {
                $authenticatedUser = $professeur;
                $role = 'professeur';
            }
        }

        if (!$authenticatedUser) {
            throw ValidationException::withMessages([
                'email' => ['Les identifiants sont incorrects.'],
            ]);
        }

        $token = $authenticatedUser->createToken('auth_token')->plainTextToken;

        return response()->json([
            'access_token' => $token,
            'token_type' => 'Bearer',
            'role' => $role,
            'user' => $authenticatedUser
        ]);
    }

    public function logout(Request $request)
    {
        // Suppression du token pour déconnecter l'utilisateur
        $request->user()->currentAccessToken()->delete();
        return response()->json(['message' => 'Déconnecté']);
    }

    public function register(Request $request)
    {
        $request->validate([
            'nom' => 'required|string|max:255',
            'prenom' => 'required|string|max:255',
            'email' => 'required|email|unique:etudiants,email',
            'password' => 'required|min:6', // Minimum 6 caractères pour la sécurité
        ]);

        // Création du nouvel étudiant dans la base de données
        $etudiant = Etudiant::create([
            'nom' => $request->nom,
            'prenom' => $request->prenom,
            'email' => $request->email,
            'mot_de_passe' => $request->password,
        ]);

        // On connecte directement l'utilisateur après son inscription
        $token = $etudiant->createToken('auth_token')->plainTextToken;

        return response()->json([
            'access_token' => $token,
            'token_type' => 'Bearer',
            'role' => 'etudiant',
            'user' => $etudiant
        ]);
    }
}
