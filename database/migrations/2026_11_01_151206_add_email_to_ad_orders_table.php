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
        Schema::table('ad_orders', function (Blueprint $table) {
            $table->string('email')->nullable()->after('owner_name');
            $table->string('whatsapp_number')->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('ad_orders', function (Blueprint $table) {
            $table->dropColumn('email');
        });
    }
};
