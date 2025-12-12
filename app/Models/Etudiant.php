<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Etudiant extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $table = 'etudiants_new';

    protected $fillable = [
        'nom',
        'prenom',
        'email',
        'mot_de_passe'
    ];

    // Important for Auth: Specify the password field if it's not 'password'
    public function getAuthPassword()
    {
        return $this->mot_de_passe;
    }
    public function notes()
    {
        return $this->hasMany(Note::class); // Un étudiant peut avoir plusieurs notes
    }

    public function plannings()
    {
        return $this->hasMany(Planning::class); // Un étudiant peut avoir plusieurs plannings
    }
}
