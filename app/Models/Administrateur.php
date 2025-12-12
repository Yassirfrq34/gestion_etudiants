<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class Administrateur extends Authenticatable
{
    use HasApiTokens, Notifiable;

    // Allow mass assignment
    protected $fillable = ['nom', 'email', 'mot_de_passe'];

    // Important for Auth: Specify the password field if it's not 'password'
    public function getAuthPassword()
    {
        return $this->mot_de_passe;
    }
}
