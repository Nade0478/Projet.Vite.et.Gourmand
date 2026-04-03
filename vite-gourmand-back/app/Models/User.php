<?php

namespace App\Models;

use App\Models\Avis;
use App\Models\Commande;
use App\Models\Role;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use PHPOpenSourceSaver\JWTAuth\Contracts\JWTSubject;

class User extends Authenticatable implements JWTSubject
{
    use HasFactory, Notifiable;

    protected $fillable = [
        'prenom',
        'nom',
        'email',
        'password',
        'telephone',
        'adresse_postale',
        'ville',
        'pays',
        'role_id',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed', // Hash automatique Laravel 10+
    ];

    /*
    |--------------------------------------------------------------------------
    | RELATIONS
    |--------------------------------------------------------------------------
    */

    // Un utilisateur appartient à un rôle
    public function role()
    {
        return $this->belongsTo(Role::class);
    }

    // Un utilisateur a plusieurs commandes
    public function commandes()
    {
        return $this->hasMany(Commande::class);
    }

    // Un utilisateur a plusieurs avis
    public function avis()
    {
        return $this->hasMany(Avis::class);
    }

    /*
    |--------------------------------------------------------------------------
    | HELPERS POUR LES RÔLES
    |--------------------------------------------------------------------------
    */

    public function hasRole(string $role)
    {
        return $this->role?->name === $role;
    }

    public function isAdmin()
    {
        return $this->hasRole('administrateur');
    }

    public function isSalarie()
    {
        return $this->hasRole('salarie');
    }

    public function isClient()
    {
        return $this->hasRole('client');
    }

    /*
    |--------------------------------------------------------------------------
    | JWT AUTH
    |--------------------------------------------------------------------------
    */

    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    public function getJWTCustomClaims()
    {
        return [];
    }
}
