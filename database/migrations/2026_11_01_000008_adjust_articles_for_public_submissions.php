<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // Fitur komentar tidak dipakai
        Schema::dropIfExists('comments');

        Schema::table('articles', function (Blueprint $table) {
            // Artikel dari pengunjung tidak punya akun, jadi user_id boleh kosong
            $table->unsignedBigInteger('user_id')->nullable()->change();

            // Data pengirim (diisi lewat form "Write Us")
            $table->string('submitter_name', 100)->nullable()->after('user_id');
            $table->string('submitter_email', 150)->nullable()->after('submitter_name');
            $table->string('submitter_phone', 30)->nullable()->after('submitter_email');
            $table->string('submitter_address')->nullable()->after('submitter_phone');

            // Alur persetujuan admin
            $table->foreignId('reviewed_by')->nullable()->after('published_at')
                  ->constrained('users')->nullOnDelete();
            $table->timestamp('reviewed_at')->nullable()->after('reviewed_by');
            $table->text('rejection_note')->nullable()->after('reviewed_at');

            // Kiriman baru otomatis berstatus pending
            // Status: pending, published, rejected
            $table->string('status', 20)->default('pending')->change();
        });
    }

    public function down(): void
    {
        Schema::table('articles', function (Blueprint $table) {
            $table->dropConstrainedForeignId('reviewed_by');
            $table->dropColumn([
                'submitter_name', 'submitter_email', 'submitter_phone', 'submitter_address',
                'reviewed_at', 'rejection_note',
            ]);
            $table->string('status', 20)->default('draft')->change();
        });

        Schema::create('comments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('article_id')->constrained()->cascadeOnDelete();
            $table->foreignId('user_id')->nullable()->constrained()->nullOnDelete();
            $table->foreignId('parent_id')->nullable()->constrained('comments')->cascadeOnDelete();
            $table->string('guest_name', 100)->nullable();
            $table->text('body');
            $table->string('status', 20)->default('pending');
            $table->timestamps();
        });
    }
};
