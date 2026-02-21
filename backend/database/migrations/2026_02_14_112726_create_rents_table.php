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
        Schema::create('rents', function (Blueprint $table) {
            $table->id();
            $table->foreignId('rent_type')->constrained('rent_types');
            $table->string('title', 255);
            $table->dateTime('highlighted')->nullable();
            $table->string('description');
            $table->double('price');
            $table->string('currency');
            $table->foreignId('county')->constrained('counties');
            $table->foreignId('city')->constrained('cities');
            $table->string('address');
            $table->double('area');
            $table->integer('bedrooms');
            $table->integer('bathrooms');
            $table->string('status');
            $table->unsignedBigInteger('defaultimage')->nullable();
            $table->dateTime('available_from');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('rents');
    }
};
