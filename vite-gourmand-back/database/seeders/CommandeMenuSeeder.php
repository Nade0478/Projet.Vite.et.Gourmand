<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CommandeMenuSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('commande_menu')->insert([
            ['commande_id' => 1, 'menu_id' => 1, 'prix_unitaire' => 12.50],
            ['commande_id' => 1, 'menu_id' => 2, 'prix_unitaire' => 14.90],
        ]);
    }
}
