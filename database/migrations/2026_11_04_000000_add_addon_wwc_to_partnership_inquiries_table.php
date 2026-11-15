<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('partnership_inquiries', function (Blueprint $table) {
            $table->boolean('addon_wwc')->default(false)->after('ad_image_url');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('partnership_inquiries', function (Blueprint $table) {
            $table->dropColumn('addon_wwc');
        });
    }
};
