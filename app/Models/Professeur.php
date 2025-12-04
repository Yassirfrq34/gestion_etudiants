<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Professeur extends Model
{
    public function notes()
    {
        return $this->hasMany(Note::class); // notes attribuées par le professeur
    }
}
