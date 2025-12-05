<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Note extends Model
{
    protected $fillable = ['valeur', 'etudiant_id', 'matiere_id', 'professeur_id'];

    public function etudiant()
    {
        return $this->belongsTo(Etudiant::class); // Une note appartient à un étudiant
    }
    public function matiere()
    {
        return $this->belongsTo(Matiere::class); // Une note appartient à une matière
    }
    public function professeur()
    {
        return $this->belongsTo(Professeur::class); // Une note appartient à un professeur
    }
}
