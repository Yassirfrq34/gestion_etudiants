<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Etudiant extends Model
{
    protected $fillable = [
        'nom',
        'prenom',
        'email',
        'mot_de_passe'
    ];
    public function notes()
    {
        return $this->hasMany(Note::class); // Un étudiant peut avoir plusieurs notes
    }

    public function plannings()
    {
        return $this->hasMany(Planning::class); // Un étudiant peut avoir plusieurs plannings
    }
}
