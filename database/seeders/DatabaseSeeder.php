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
        /* ===========================
         * ADMINISTRATEURS
         * =========================== */
        $admin1 = Administrateur::create([
            'nom' => 'Admin Principal',
            'email' => 'admin@gmail.com',
            'mot_de_passe' => 'password'
        ]);

        $admin2 = Administrateur::create([
            'nom' => 'Admin Secondaire',
            'email' => 'admin1@gmail.com',
            'mot_de_passe' => 'password'
        ]);

        /* ===========================
         * MATIÈRES (7)
         * =========================== */
        $math  = Matiere::create(['nom' => 'Mathématiques']);
        $web   = Matiere::create(['nom' => 'Programmation Web']);
        $bdd   = Matiere::create(['nom' => 'Bases de Données']);
        $si    = Matiere::create(['nom' => 'Systèmes d’Information']);
        $rese  = Matiere::create(['nom' => 'Réseaux']);
        $algo  = Matiere::create(['nom' => 'Algorithmique']);
        $gl    = Matiere::create(['nom' => 'Génie Logiciel']);

        $matieres = [$math, $web, $bdd, $si, $rese, $algo, $gl];


        $prof1 = Professeur::create([
            'nom' => 'Pr. ALAMI',
            'email' => 'alami@univ.ma',
            'mot_de_passe' => 'password'
        ]);

        $prof2 = Professeur::create([
            'nom' => 'Pr. BENANI',
            'email' => 'benani@univ.ma',
            'mot_de_passe' => 'password'
        ]);

        $prof3 = Professeur::create([
            'nom' => 'Pr. EL FASSI',
            'email' => 'elfassi@univ.ma',
            'mot_de_passe' => 'password'
        ]);

        $prof4 = Professeur::create([
            'nom' => 'Pr. CHERKAOUI',
            'email' => 'cherkaoui@univ.ma',
            'mot_de_passe' => 'password'
        ]);

        $profs = [$prof1, $prof2, $prof3, $prof4];

        /* ===========================
         * ÉTUDIANTS (MAROCAINS)
         * =========================== */
        $students = [];

        $students[] = Etudiant::create([
            'nom' => 'EL AMRANI',
            'prenom' => 'Yassine',
            'email' => 'yassine@student.ma',
            'mot_de_passe' => 'student123'
        ]);

        $students[] = Etudiant::create([
            'nom' => 'BENALI',
            'prenom' => 'Omar',
            'email' => 'omar@student.ma',
            'mot_de_passe' => 'student123'
        ]);

        $students[] = Etudiant::create([
            'nom' => 'AIT SAID',
            'prenom' => 'Hamza',
            'email' => 'hamza@student.ma',
            'mot_de_passe' => 'student123'
        ]);

        $students[] = Etudiant::create([
            'nom' => 'EL KHAYAT',
            'prenom' => 'Imane',
            'email' => 'imane@student.ma',
            'mot_de_passe' => 'student123'
        ]);

        $students[] = Etudiant::create([
            'nom' => 'ERRAHMANI',
            'prenom' => 'Sara',
            'email' => 'sara@student.ma',
            'mot_de_passe' => 'student123'
        ]);

        /* ===========================
         * NOTES (7 PAR ÉTUDIANT)
         * =========================== */
        foreach ($students as $etudiant) {
            foreach ($matieres as $matiere) {
                Note::create([
                    'valeur' => rand(8, 18) + (rand(0, 9) / 10),
                    'etudiant_id' => $etudiant->id,
                    'matiere_id' => $matiere->id,
                    'professeur_id' => $profs[array_rand($profs)]->id
                ]);
            }
        }

        /* ===========================
         * PLANNING (EXEMPLE SIMPLE)
         * =========================== */
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
            'matiere_id' => $web->id
        ]);
    }
}
