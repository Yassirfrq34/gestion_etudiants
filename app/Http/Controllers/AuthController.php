<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
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

        // On vérifie d'abord si c'est un administrateur
        $user = User::where('email', $email)->first();
        if ($user && Hash::check($password, $user->password)) {
            $token = $user->createToken('auth_token')->plainTextToken;
            return response()->json([
                'access_token' => $token,
                'token_type' => 'Bearer',
                'role' => 'admin',
                'user' => $user
            ]);
        }

        // Si ce n'est pas un admin, on regarde si c'est un étudiant
        $etudiant = Etudiant::where('email', $email)->first();
        if ($etudiant && $etudiant->mot_de_passe === $password) {
            $token = $etudiant->createToken('auth_token')->plainTextToken;
            return response()->json([
                'access_token' => $token,
                'token_type' => 'Bearer',
                'role' => 'etudiant',
                'user' => $etudiant
            ]);
        }

        // Enfin, on vérifie si c'est un prof
        $professeur = Professeur::where('email', $email)->first();
        if ($professeur && $professeur->mot_de_passe === $password) {
            $token = $professeur->createToken('auth_token')->plainTextToken;
            return response()->json([
                'access_token' => $token,
                'token_type' => 'Bearer',
                'role' => 'professeur',
                'user' => $professeur
            ]);
        }

        throw ValidationException::withMessages([
            'email' => ['Les identifiants sont incorrects.'],
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
