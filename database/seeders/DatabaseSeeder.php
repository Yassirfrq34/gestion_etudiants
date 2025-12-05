<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Etudiant;
use App\Models\Professeur;
use App\Models\Matiere;
use App\Models\Note;
use App\Models\Planning;
use App\Models\Administrateur;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Create the Admin
        // 1. Create the Admin (User table)
        \App\Models\User::create([
            'name' => 'Admin Principal',
            'email' => 'admin@gmail.com',
            'password' => bcrypt('password') // User model uses Hash by default usually, but seeder needs hashing if model doesn't auto-hash
        ]);

        // 2. Create Subjects (Matières)
        $math = Matiere::create(['nom' => 'Mathématiques']);
        $info = Matiere::create(['nom' => 'Informatique']);
        $phys = Matiere::create(['nom' => 'Physique']);
        $eng = Matiere::create(['nom' => 'Anglais']);

        // 3. Create Professors
        $prof1 = Professeur::create(['nom' => 'Dr. SABRAOUI', 'email' => 'sabraoui@univ.com', 'mot_de_passe' => 'password']);
        $prof2 = Professeur::create(['nom' => 'Pr. ALAMI', 'email' => 'alami@univ.com', 'mot_de_passe' => 'password']);
        $prof3 = Professeur::create(['nom' => 'Pr. BENANI', 'email' => 'benani@univ.com', 'mot_de_passe' => 'password']);
        $prof4 = Professeur::create(['nom' => 'Pr. test', 'email' => 'prof@gmail.com', 'mot_de_passe' => 'password']);
        // 4. Create Students
        $students = [];
        for ($i = 1; $i <= 5; $i++) {
            $students[] = Etudiant::create([
                'nom' => 'Etudiant ' . $i,
                'prenom' => 'Test',
                'email' => 'etudiant' . $i . '@student.com',
                'mot_de_passe' => 'student123'
            ]);
        }

        Etudiant::create([
            'nom' => 'frq',
            'prenom' => 'yassir',
            'email' => 'etudiant@gmail.com',
            'mot_de_passe' => 'password'
        ]);





        // 5. Assign Grades (Notes)
        // Give the first student a grade in Math from Prof 1
        Note::create([
            'valeur' => 15.5,
            'etudiant_id' => $students[0]->id,
            'matiere_id' => $math->id,
            'professeur_id' => $prof1->id
        ]);

        // Give the second student a grade in Info from Prof 1
        Note::create([
            'valeur' => 18.0,
            'etudiant_id' => $students[1]->id,
            'matiere_id' => $info->id,
            'professeur_id' => $prof1->id
        ]);

        // 6. Create Schedule (Planning)
        Planning::create([
            'jour' => '2025-10-15',
            'horaire' => '08:30:00',
            'etudiant_id' => $students[0]->id,
            'matiere_id' => $math->id
        ]);

        Planning::create([
            'jour' => '2025-10-16',
            'horaire' => '10:00:00',
            'etudiant_id' => $students[0]->id,
            'matiere_id' => $info->id
        ]);
    }
}
