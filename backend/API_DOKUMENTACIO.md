# API Dokumentáció

## Alap információk

- **Base URL:** `http://localhost:8000/api`
- **Authentikáció:** Laravel Sanctum (Bearer token)
- **Formátum:** JSON

---

## Authentikáció

### Regisztráció
```
POST /register
```
**Body:**
```json
{
  "name": "Kovács János",
  "email": "kovacs@gmail.com",
  "password": "jelszo123",
  "password_confirmation": "jelszo123"
}
```
**Válasz (201):**
```json
{
  "access_token": "1|abc123...",
  "user": { "id": 1, "name": "Kovács János", "email": "kovacs@gmail.com", "role": 0 }
}
```

---

### Bejelentkezés
```
POST /login
```
**Body:**
```json
{
  "email": "kovacs@gmail.com",
  "password": "jelszo123"
}
```
**Válasz (200):**
```json
{
  "access_token": "2|xyz456...",
  "user": { "id": 1, "name": "Kovács János", "role": 0 }
}
```

---

### Kijelentkezés
```
POST /logout
Authorization: Bearer {token}
```
**Válasz (200):**
```json
{ "message": "Logout successful" }
```

---

## 🔓 Publikus végpontok

### Segédadatok lekérése
```
GET /rent-types       → ingatlantípusok (lakás, ház, stb.)
GET /counties         → megyék listája
GET /cities           → városok listája
GET /utility-options  → extrák listája (parkoló, erkély, stb.)
```

---

## ⭐ Nem alap funkciók

### 1. Hirdetések listázása szűréssel és rendezéssel
```
GET /rents
```
A végpont egyszerre végez **több táblás JOIN-t**, **dinamikus szűrést** query paraméterek alapján, **átlagos értékelés számítást** (`COALESCE(AVG(reviews.rating), 0)`), és **kiemelt hirdetések előre rendezését**.

**Query paraméterek (mind opcionális):**
| Paraméter | Típus | Leírás |
|---|---|---|
| `city` | string | Városnév (LIKE keresés) |
| `county` | string | Megye pontos neve |
| `price_min` | number | Minimum ár |
| `price_max` | number | Maximum ár |
| `area_min` | number | Minimum alapterület (m²) |
| `area_max` | number | Maximum alapterület (m²) |
| `bedrooms` | integer | Minimum hálószobák száma |
| `bathrooms` | integer | Minimum fürdőszobák száma |
| `status` | string | `available` \| `rented` \| `inactive` |
| `available_from` | date | Elérhető ettől a dátumtól |

**Példa:**
```
GET /rents?city=Budapest&price_min=100000&price_max=300000&bedrooms=2
```

**Válasz (200):**
```json
[
  {
    "id": 1,
    "title": "Szép budai lakás",
    "highlighted": "2025-04-10T08:00:00Z",
    "price": 150000,
    "currency": "HUF",
    "city": "Budapest",
    "available_from": "2025-05-01",
    "defaultimage": "data:image/jpeg;base64,...",
    "rating": 4.5
  }
]
```
> A kiemelt hirdetések (`highlighted != null`) mindig a lista elején jelennek meg.

---

### 2. Hirdetés részletei (összetett lekérdezés)
```
GET /rents/{id}
```
Egyetlen kéréssel adja vissza az ingatlan összes adatát: képek, extrák (utilities), értékelések és az átlagos rating.

**Válasz (200):**
```json
{
  "id": 1,
  "title": "Szép budai lakás",
  "description": "...",
  "price": 150000,
  "currency": "HUF",
  "city": "Budapest",
  "address": "Fő utca 1.",
  "area": 65,
  "bedrooms": 2,
  "bathrooms": 1,
  "status": "available",
  "available_from": "2025-05-01",
  "highlighted": null,
  "defaultimage": "data:image/jpeg;base64,...",
  "images": [
    { "id": 3, "base64": "data:image/jpeg;base64,..." }
  ],
  "utilities": [
    { "id": 1, "name": "Parkoló" },
    { "id": 2, "name": "Erkély" }
  ],
  "reviews": [
    {
      "rating": 5,
      "renter_comment": "Remek hely!",
      "owner_comment": "Ajánlom.",
      "created_at": "2025-03-01",
      "renter_name": "Kovács János",
      "owner_name": "Nagy Béla"
    }
  ],
  "average_rating": 4.7
}
```

---

### 3. Kép feltöltése (Base64 konverzió)
```
POST /upload
Authorization: Bearer {token}
Content-Type: multipart/form-data
```
**Body:**
| Mező | Típus | Leírás |
|---|---|---|
| `rent_id` | integer | Melyik hirdetéshez |
| `images[]` | file | Feltöltendő képek (max. 40 MB/db) |
| `default_image_index` | integer | Melyik legyen az alapkép (0-tól indexelve) |

A szerver a képeket **Base64 formátumra konvertálja** és az adatbázisban tárolja. Automatikusan beállítja az ingatlan `defaultimage` mezőjét.

**Válasz (200):**
```json
{
  "message": "Sikeres feltöltés",
  "images": [
    { "id": 5, "rent_id": 1, "base64": "data:image/jpeg;base64,..." }
  ],
  "default_image_id": 5
}
```

---

### 4. Hirdetés kiemelés toggle (Admin)
```
PATCH /admin/rents/{id}/highlight
Authorization: Bearer {admin_token}
```
Toggle logika: ha a hirdetés **már ki van emelve**, eltávolítja; ha **nincs kiemelve**, beállítja az aktuális időbélyeget. Nem kell body.

**Válasz (200) — kiemelés esetén:**
```json
{ "highlighted": "2025-04-15T10:30:00.000000Z" }
```

**Válasz (200) — kiemelés eltávolítása esetén:**
```json
{ "highlighted": null }
```

---

### 5. Saját profil szerkesztése
```
PUT /user
Authorization: Bearer {token}
```
Csak a megadott mezőket módosítja (`sometimes` validáció). A jelszóhoz `confirmed` szabály szükséges, a hash-elés automatikus.

**Body (mind opcionális):**
```json
{
  "name": "Kovács Béla",
  "password": "ujjelszo123",
  "password_confirmation": "ujjelszo123"
}
```

**Válasz (200):**
```json
{
  "id": 1,
  "name": "Kovács Béla",
  "email": "kovacs@gmail.com",
  "role": 0,
  "avatar": null
}
```

---

## 🔐 Bejelentkezett user végpontok

| Metódus | URL | Leírás |
|---|---|---|
| GET | `/user` | Saját profil |
| PUT | `/user` | Profil szerkesztése |
| POST | `/rents` | Hirdetés feladása |
| PUT | `/rents/{id}` | Saját hirdetés módosítása |
| DELETE | `/rents/{id}` | Saját hirdetés törlése |
| GET | `/user/rents` | Saját hirdetések |
| POST | `/upload` | Képfeltöltés |
| DELETE | `/images/{id}` | Kép törlése |
| POST | `/rentings` | Bérlés indítása |
| GET | `/user/rentings` | Saját bérlések (bérlőként) |
| GET | `/user/ownerships` | Saját bérbeadások (tulajdonosként) |
| DELETE | `/rentings/{id}` | Bérlés lemondása |
| POST | `/reviews` | Értékelés írása |
| PUT | `/reviews/{id}` | Értékelés módosítása |
| DELETE | `/reviews/{id}` | Értékelés törlése |

---

## 🛡️ Admin végpontok

> Minden admin végpont `auth:sanctum` + `Admin` middleware-t igényel (`role === 1`).

| Metódus | URL | Leírás |
|---|---|---|
| GET | `/admin/users` | Összes felhasználó |
| PUT | `/admin/users/{id}` | Felhasználó szerkesztése |
| DELETE | `/admin/users/{id}` | Felhasználó törlése |
| GET | `/admin/rents` | Összes hirdetés |
| PUT | `/admin/rents/{id}` | Hirdetés szerkesztése |
| DELETE | `/admin/rents/{id}` | Hirdetés törlése |
| PATCH | `/admin/rents/{id}/highlight` | Kiemelés toggle |
| GET | `/admin/rentings` | Összes bérlés |
| DELETE | `/admin/rentings/{id}` | Bérlés törlése |
| GET | `/admin/reviews` | Összes értékelés |
| DELETE | `/admin/reviews/{id}` | Értékelés törlése |
| POST/PUT/DELETE | `/admin/counties` | Megyék kezelése |
| POST/PUT/DELETE | `/admin/cities` | Városok kezelése |
| POST/PUT/DELETE | `/admin/rent-types` | Ingatlantípusok kezelése |
| POST/PUT/DELETE | `/admin/utility-options` | Extrák kezelése |

---

## Hibakódok

| Kód | Leírás |
|---|---|
| 200 | Sikeres lekérés / módosítás |
| 201 | Sikeres létrehozás |
| 204 | Sikeres törlés (üres válasz) |
| 401 | Nem authentikált |
| 403 | Nem jogosult (nem admin) |
| 404 | Nem található |
| 422 | Validációs hiba |
