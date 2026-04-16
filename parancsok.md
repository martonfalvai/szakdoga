# Laravel Parancsok

```bash
# Projekt létrehozás ("." az adott mappába hozza létre)
composer create-project laravel/laravel .
```

```bash
# Api routing létrehozása
php artisan install:api
```

```bash
# Kulcs generálás
php artisan key:generate
```

```bash
# Indítás
php artisan serve
```

---

## Model & Controller generálás

```bash
# Csak model + migration
php artisan make:model Book -m

# Model + migration + factory + seeder + controller (API)
php artisan make:model Book -a --api

# Csak API controller
php artisan make:controller BookController --api

# Factory külön
php artisan make:factory TaskFactory --model=Task
```

---

## Migráció

```bash
php artisan migrate

php artisan migrate:fresh

php artisan migrate:fresh --seed

php artisan migrate:rollback
```

---

## Route definíció

```php
Route::get('/travel/{id}', [TravelController::class, 'show']);
Route::get('/travel/', [TravelController::class, 'index']);
Route::post('/travel/{id}', [TravelController::class, 'store']);
Route::delete('/travel/{id}', [TravelController::class, 'destroy']);
```

> **Fontos:** A `Request` mindig legyen paraméterként megadva típussal együtt!

---

## Migration definíciók

```php
$table->id();
$table->string('evaluation')->default('foglalva');
$table->foreignId('flight_id')->constrained('flights'); // külső kulcs, tábla neve amire hivatkozik
$table->foreignId('user_id')->constrained('users');
```

---

## Factory definíciók

```php
'evaluation' => fake()->sentence(), // random string
'flight_id'  => Flight::all()->random()->id,
```

> **Fontos:** Ha `HasFactory`-t használsz a modellben, add hozzá az importot:
>
> ```php
> use Illuminate\Database\Eloquent\Factories\HasFactory;
> ```

## Controller metódusok

return Receptek::leftJoin('kategorias', 'recepteks.kat_id', '=', 'kategorias.id')
->select('recepteks.\*', 'kategorias.nev as kategoria_nev')
->get();

```php

// Index kapcsolattal
 public function index()
    {
        return Receptek::leftJoin('kategorias', 'recepteks.kat_id', '=', 'kategorias.id')
            ->select('recepteks.*', 'kategorias.nev as kategoria_nev')
            ->get();
        // return Receptek::with("kategorias")->(); EZ CSAK SHOW ESETÉN!
    }


// Egy rekord lekérése
public function show(string $id)
{
    // Ha van külső kulcs (pl. user -> cart), with()-tel lekérdezzük a kapcsolódó adatokat is
    // A modellben definiált reláció neve kell (pl. 'cart', 'orders', stb.)
    return User::with('cart')->find($id);
}

// Létrehozás
public function store(Request $request)
{
    $user = new User();
    $user->fill($request->all());
    $user->save();
    return response()->json($user, 201);
}

// Frissítés
public function update(Request $request, string $id)
{
    $user = User::find($id);
    $user->fill($request->all());
    $user->save();
    return response()->json($user, 200);
}

// Törlés
public function destroy(string $id)
{
    User::find($id)->delete();
    return response()->json(null, 200);
}
```

---

## Összetett (több oszlopos) primary key

```php
// Model-ben felülírjuk a mentési query kulcsait
protected function setKeysForSaveQuery($query)
{
    $query
        ->where('user_id', '=', $this->getAttribute('user_id'))
        ->where('copy_id', '=', $this->getAttribute('copy_id'))
        ->where('start',   '=', $this->getAttribute('start'));

    return $query;
}
```

BOOTSTRAP:
npm install react-bootstrap bootstrap
App.tsx -> import 'bootstrap/dist/css/bootstrap.min.css';

Alap context:
import React, { createContext, useContext, useState, useEffect } from "react";

interface Recept {
id: number;
nev: string;
kat_nev: string;
kep_eleresi_ut: number;
leiras: string;
}

const ReceptContext = createContext<Recept[]>([]);

export const ReceptProvider: React.FC<{ children: React.ReactNode }> = ({
children,
}) => {
const [receptek, setReceptek] = useState<Recept[]>([]);

useEffect(() => {
fetch("http://127.0.0.1:8000/api/receptek").then(async (data: any) =>
setReceptek(await data.json()),
);
}, []);

return (
<ReceptContext.Provider value={receptek}>{children}</ReceptContext.Provider>
);
};

export const useReceptek = () => {
const context = useContext(ReceptContext);
if (!context) throw new Error("useAuth must be used within AuthProvider");
return context;
};
