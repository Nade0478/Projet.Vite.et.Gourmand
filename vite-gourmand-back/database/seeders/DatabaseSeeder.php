<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Ordre important pour respecter les contraintes FK

        // 1. Roles (doit exister avant les users)
        $this->call(RoleSeeder::class);

        // 2. Users (utilisateurs de test : admin, salarie, client)
        $this->call(UserSeeder::class);

        // 3. Regimes et Themes (utilisés par les menus)
        $this->call(RegimeSeeder::class);
        $this->call(ThemeSeeder::class);

        // 4. Plats et Allergènes (avant les pivots menu_plat et plat_allergene)
        $this->call(PlatSeeder::class);
        $this->call(AllergeneSeeder::class);

        // 5. Menus (utilise regime_id et theme_id)
        $this->call(MenuSeeder::class);

        // 6. Horaires
        $this->call(HoraireSeeder::class);

        // 7. Avis
        $this->call(AvisSeeder::class);

        // 8. Commandes (si tu veux en créer)
        $this->call(CommandeSeeder::class);

        // 9. Seeders pour tables pivot (optionnel mais utile)
        // Exemple : remplir menu_plat et plat_allergene et commande_menu
        if (class_exists(\Database\Seeders\MenuPlatSeeder::class)) {
            $this->call(\Database\Seeders\MenuPlatSeeder::class);
        }

        if (class_exists(\Database\Seeders\PlatAllergeneSeeder::class)) {
            $this->call(\Database\Seeders\PlatAllergeneSeeder::class);
        }

        if (class_exists(\Database\Seeders\CommandeMenuSeeder::class)) {
            $this->call(\Database\Seeders\CommandeMenuSeeder::class);
        }
    }
}
