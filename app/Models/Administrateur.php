<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Administrateur extends Model
{
    // Allow mass assignment
    protected $fillable = ['nom', 'email', 'mot_de_passe'];
}
