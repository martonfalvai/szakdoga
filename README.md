# MAPUMA - Ingatlan Webalkalmazás

## Rövid Leírás

A MAPUMA egy modern webalkalmazás, amely lehetővé teszi a hosszú és rövid távú ingatlan kiadást. Az alkalmazás egyetlen felületen kapcsolja össze a tulajdonosokat és bérlőket, megkönnyítve a kommunikációt és az értékeléseket.

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

| Név                            | Szerepkör                    |
| ------------------------------ | ---------------------------- |
| **Márki András**               | Frontend fejlesztés          |
| **Urbanics Pál**               | Backend + Adatbázis          |
| **Martonfalvai Manassé Antal** | Backend + Adatbázis tervezés |

---

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

### Tesztfelhasználók

```
User:
Email: user@example.com
Jelszó: user123

Admin:
Email: admin@example.com
Jelszó: admin123
```
