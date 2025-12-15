<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Planning extends Model
{
    protected $fillable = ['jour', 'horaire', 'etudiant_id', 'matiere_id'];

    public function etudiant()
    {
        return $this->belongsTo(Etudiant::class); // Un planning appartient à un étudiant
    }

    public function matiere()
    {
        return $this->belongsTo(Matiere::class); // Un planning appartient à une matière
    }
}
