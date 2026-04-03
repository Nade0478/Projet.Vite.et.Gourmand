<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Avis extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'note',
        'description',
        'statut',
    ];

    /*
    |--------------------------------------------------------------------------
    | RELATIONS
    |--------------------------------------------------------------------------
    */

    // Un avis appartient à un utilisateur
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
