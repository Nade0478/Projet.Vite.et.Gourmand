<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PlatAllergeneSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('plat_allergene')->insert([
            ['plat_id' => 1, 'allergene_id' => 1],
            // ...
        ]);
    }
}
