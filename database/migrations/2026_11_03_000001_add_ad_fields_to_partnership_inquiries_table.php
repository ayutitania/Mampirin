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
            $table->string('ad_title')->after('message');
            $table->string('ad_target_url', 2048)->nullable()->after('ad_title');
            $table->string('ad_image_url', 2048)->nullable()->after('ad_target_url');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('partnership_inquiries', function (Blueprint $table) {
            $table->dropColumn(['ad_title', 'ad_target_url', 'ad_image_url']);
        });
    }
};
