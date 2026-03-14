# szakdoga

## Docker

**Első indítás (build + start):**

```bash
docker-compose up --build
```

**Csak indítás (ha már buildelve van):**

```bash
docker-compose up -d
```

## Elérhetőségek

| Szolgáltatás      | URL                   |
| ----------------- | --------------------- |
| Frontend (React)  | http://localhost:3000 |
| Backend (Laravel) | http://localhost:8000 |
| phpMyAdmin        | http://localhost:8080 |
| MySQL             | port 3306             |

Kill 3306 process:
Get-NetTCPConnection -LocalPort 3306 | Select-Object -ExpandProperty OwningProcess | ForEach-Object { Stop-Process -Id $\_ -Force }
