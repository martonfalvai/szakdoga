# MAPUMA - Ingatlan Webalkalmaz

## Rövid Leírás

A MAPUMA egy modern webalkalmazás, amely lehetővé teszi a hosszú és rövid távú ingatlan kiadást. Az alkalmazás egyetlen felületen kapcsolja össze a tulajdonosokat és bérlőket, megkönnyítve a kommunikációt és az értékeléseket.

**Fő Funkciók**:
- Ingatlan hirdetések böngészése és szűrése
- Saját hirdetések létrehozása és kezelése
- Bérlés indítása és kezelése
- Kölcsönös értékelési rendszer
- Beépített csevegő
- Admin felület

---

## Technológiai Stack

### Backend
- **PHP 8.2+** & **Laravel 11**
- **MySQL 8.0+** / MariaDB
- **RESTful API** (Laravel Sanctum)

### Frontend
- **React 18+** & **TypeScript**
- **Tailwind CSS**
- **Vite**
- **React Router**
- **Axios**

---

## Csapat

| Név | Szerepkör |
|-----|-----------|
| **Márki András** | Frontend fejlesztés |
| **Urbanics Pál** | Backend + Adatbázis |
| **Martonfalvai Manassé Antal** | Backend + Adatbázis tervezés |

---

## Dokumentáció

A teljes dokumentáció a projekt gyökerében található:

- 📄 **[API Dokumentáció](API_DOKUMENTACIO_TELJES.md)** - Összes API végpont
- 📄 **[Tesztelés Stratégia](TESZTELÉS_ÉS_DRÓTVÁZAK.md)** - Unit, integráció, E2E tesztek
- 📄 **[Telepítés Útmutató](TELEPÍTÉS_ÉS_KONFIGURÁCIÓ.md)** - Dev, Docker, production
- 📄 **[Biztonsági Útmutató](BIZTONSAG_ÉS_BEST_PRACTICES.md)** - Security best practices
- 📄 **[Fejlesztési Lehetőségek](FEJLESZTÉSI_LEHETŐSÉGEK.md)** - Future features
- 📄 **[Dokumentáció Index](DOKUMENTÁCIÓ_INDEX.md)** - Összes dokumentum áttekintése

---

## Gyors Kezdés

### Fejlesztői Telepítés

```bash
# Backend
cd backend
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan serve

# Frontend (új terminál)
cd frontend
npm install
npm run dev
```

Nyisd meg: `http://localhost:5173`

### Tesztfelhasználók

```
Email: test@example.com
Jelszó: password

Admin:
Email: admin@example.com
Jelszó: admin123
```

---

## Jogok és Licenc

© 2026 MAPUMA - Összes jog fenntartva

---

## Támogatás

Kérdésekhez vagy problémákhoz:
- GitHub Issues: [szakdoga/issues](https://github.com/yourusername/szakdoga/issues)
- Email: dev@mapuma.com
