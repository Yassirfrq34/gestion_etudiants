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

        // 1. Check Admin (User)
        $user = User::where('email', $email)->first();
        if ($user && Hash::check($password, $user->password)) {
            $token = $user->createToken('auth_token')->plainTextToken;
            return response()->json([
                'access_token' => $token,
                'token_type' => 'Bearer',
                'role' => 'admin'
            ]);
        }

        // 2. Check Etudiant (Plain text password check for now as per user implementation, can upgrade later)
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

        // 3. Check Professeur
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
        $request->user()->currentAccessToken()->delete();
        return response()->json(['message' => 'Déconnecté']);
    }
}
