<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Matiere extends Model
{
    public function notes()
    {
        return $this->hasMany(Note::class); // Une matière peut avoir plusieurs notes
    }

    public function plannings()
    {
        return $this->hasMany(Planning::class); // Une matière peut avoir plusieurs plannings
    }
}
