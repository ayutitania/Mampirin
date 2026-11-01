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
        Schema::create('ad_orders', function (Blueprint $table) {
            $table->id();
            $table->string('order_code')->unique();
            $table->string('package_type');
            $table->string('package_name');
            $table->unsignedBigInteger('package_price');
            $table->string('cafe_name');
            $table->string('owner_name');
            $table->string('whatsapp_number');
            $table->text('address');
            $table->string('maps_url')->nullable();
            $table->string('social_media');
            $table->text('notes')->nullable();
            $table->string('payment_status')->default('pending');
            $table->string('payment_method')->nullable();
            $table->timestamp('paid_at')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ad_orders');
    }
};
