<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        // Trigger 1: reviews.created_at automatikus kitöltése INSERT-nél
        DB::unprepared("
            CREATE TRIGGER set_review_created_at
            BEFORE INSERT ON reviews
            FOR EACH ROW
            BEGIN
                IF NEW.created_at IS NULL THEN
                    SET NEW.created_at = NOW();
                END IF;
            END
        ");

        // Trigger 2: rents.highlighted nullázása ha a hirdetés státusza megváltozik
        DB::unprepared("
            CREATE TRIGGER clear_highlight_on_status_change
            BEFORE UPDATE ON rents
            FOR EACH ROW
            BEGIN
                IF NEW.status != 'available' AND OLD.status = 'available' THEN
                    SET NEW.highlighted = NULL;
                END IF;
            END
        ");

        // Trigger 3: Önbérlést megakadályozó trigger - INSERT
        DB::unprepared("
            CREATE TRIGGER prevent_self_renting_insert
            BEFORE INSERT ON rentings
            FOR EACH ROW
            BEGIN
                IF NEW.renter = NEW.owner THEN
                    SIGNAL SQLSTATE '45000'
                    SET MESSAGE_TEXT = 'Nem lehetséges: ugyanaz a felhasználó nem lehet egyszerre bérlő és tulajdonos ugyanabban a bérleti szerződésben.';
                END IF;
            END
        ");

        // Trigger 4: Önbérlést megakadályozó trigger - UPDATE
        DB::unprepared("
            CREATE TRIGGER prevent_self_renting_update
            BEFORE UPDATE ON rentings
            FOR EACH ROW
            BEGIN
                IF NEW.renter = NEW.owner THEN
                    SIGNAL SQLSTATE '45000'
                    SET MESSAGE_TEXT = 'Nem lehetséges: ugyanaz a felhasználó nem lehet egyszerre bérlő és tulajdonos ugyanabban a bérleti szerződésben.';
                END IF;
            END
        ");
    }

    public function down(): void
    {
        DB::unprepared('DROP TRIGGER IF EXISTS set_review_created_at');
        DB::unprepared('DROP TRIGGER IF EXISTS clear_highlight_on_status_change');
        DB::unprepared('DROP TRIGGER IF EXISTS prevent_self_renting_insert');
        DB::unprepared('DROP TRIGGER IF EXISTS prevent_self_renting_update');
    }
};
