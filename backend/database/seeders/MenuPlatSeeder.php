<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class MenuPlatSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('menu_plat')->insert([
            ['menu_id' => 1, 'plat_id' => 1],
            ['menu_id' => 1, 'plat_id' => 2],
            // ajoute ce que tu veux
        ]);
    }
}
