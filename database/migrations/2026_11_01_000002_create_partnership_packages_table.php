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
        Schema::create('partnership_packages', function (Blueprint $table) {
            $table->id();
            $table->string('code', 10);
            $table->string('label');
            $table->string('name');
            $table->text('description');
            $table->unsignedInteger('price')->default(0);
            $table->string('price_suffix', 30)->default('/ Konten');
            $table->json('features');
            $table->string('cta_label');
            $table->string('cta_url')->nullable();
            $table->boolean('is_featured')->default(false);
            $table->boolean('is_active')->default(true);
            $table->unsignedInteger('sort_order')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('partnership_packages');
    }
};
