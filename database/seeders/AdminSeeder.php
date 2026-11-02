<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class AdminSeeder extends Seeder
{
    /**
     * Seed the default admin account for the CMS.
     */
    public function run(): void
    {
        User::query()->updateOrCreate(
            ['email' => 'admin@mampirin.test'],
            [
                'name' => 'Admin Mampirin',
                'password' => 'mampirin123',
            ],
        );
    }
}
