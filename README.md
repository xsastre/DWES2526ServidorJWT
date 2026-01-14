<img src="https://docencia.xaviersastre.cat/Moduls/DWES/img/Spring_Boot_Documentation_Header_1200x200px_with_Xavier_Sastre_Mug_and_Logo_ajustat.png" alt="drawing"/>


[![Desenvolupat amb Spring-Boot](https://img.shields.io/badge/Desenvolupat%20amb-SpringBoot-green?&logo=springboot&logoColor=white)](https://github.com/xsastre)
[![per en](https://img.shields.io/badge/per%20en-xsastre-red)](https://github.com/xsastre)
[![Desenvolupat al des-2025](https://img.shields.io/badge/Desenvolupat%20al-des--2025-yellow)](https://github.com/xsastre)
[![Utilitzant](https://img.shields.io/badge/Utilitzant-PostgreSQL-316192?logo=postgresql&logoColor=white)](https://github.com/xsastre)
[![Utilitzant](https://img.shields.io/badge/Utilitzant-SQLite-07405E?style=flat&compact=true&logo=sqlite&logoColor=white)](https://github.com/xsastre)

# DWES2526ServidorJWT

Servidor d'autenticació basat en JWT (JSON Web Token) implementat amb Spring Boot i base de dades SQLite per defecte, amb suport opcional per a PostgreSQL remot.

## Descripció

Aquest projecte proporciona un servidor REST API complet per a l'autenticació d'usuaris utilitzant tokens JWT. Inclou funcionalitats de registre, login i manteniment d'usuaris (CRUD).

## Característiques

- ✅ Autenticació basada en JWT
- ✅ Base de dades SQLite per a emmagatzematge d'usuaris (per defecte) i suport per a PostgreSQL remot
- ✅ API REST per a gestió d'usuaris
- ✅ Endpoints protegits amb JWT (excepte login i register)
- ✅ Encriptació de contrasenyes amb BCrypt
- ✅ Validació de dades d'entrada
- ✅ Sessions sense estat (stateless)

## Tecnologies

- Spring Boot 3.1.5
- Spring Security
- Spring Data JPA
- JWT (JSON Web Tokens) amb jjwt 0.11.5
- SQLite 3.43.0
- PostgreSQL (instància remota)
- Maven
- Java 17

## Requisits

- Java 17 o superior
- Maven 3.6+

## Instal·lació i Execució

1. Clonar el repositori:
```bash
git clone https://github.com/xsastre/DWES2526ServidorJWT.git
cd DWES2526ServidorJWT
```

2. Compilar el projecte:
```bash
mvn clean compile
```

3. Executar l'aplicació:
```bash
mvn spring-boot:run
```

L'aplicació s'iniciarà al port 8080. La base de dades SQLite (`database.db`) es crearà automàticament al directori arrel del projecte. Si s'activa el perfil `postgres`, es connectarà a la instància configurada.

4. Per utilitzar PostgreSQL (perfil `postgres`), defineix les variables d'entorn necessàries i activa el perfil:
```bash
export POSTGRES_URL="jdbc:postgresql://<host>:5432/<database_name>"
export POSTGRES_USER="<usuari>"
export POSTGRES_PASSWORD="<contrasenya>"
export SPRING_PROFILES_ACTIVE=postgres
mvn spring-boot:run
```

## API Endpoints

### Autenticació (Públics - No requereixen token)

#### Registre d'usuari
```bash
POST /api/auth/register
Content-Type: application/json

{
  "username": "nomUsuari",
  "password": "contrasenya123",
  "email": "correu@example.com"
}
```
---

#### Exemple de com fer-ho amb `curl`:
```bash 
curl -X POST http://localhost:8080/api/auth/register
      -H "Content-Type: application/json"
      -d '{
           "username": "usuariTest",
           "password": "contrasenyaSegura",
           "email": "usuari@test.com"
         }'
```
---
**Resposta:**
```json
{
  "message": "User registered successfully"
}
```
---

#### Login
```bash
POST /api/auth/login
Content-Type: application/json

{
  "username": "nomUsuari",
  "password": "contrasenya123"
}
```

---

#### Exemple de com fer-ho amb `curl`:
curl -X POST http://localhost:8080/api/auth/login \
	 -H "Content-Type: application/json" \
	 -d '{
		  "username": "usuariTest",
		  "password": "contrasenyaSegura"
		 }'
```
---
**Resposta:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiJ9...",
  "type": "Bearer",
  "username": "nomUsuari",
  "email": "correu@example.com",
  "role": "USER"
}
```
---

### Gestió d'Usuaris (Protegits - Requereixen token JWT)

**IMPORTANT:** Tots els endpoints següents requereixen incloure el token JWT a la capçalera:
```
Authorization: Bearer <token>
```

#### Obtenir tots els usuaris
```bash
GET /api/users
Authorization: Bearer <token>
```
---

#### Exemple de com fer-ho amb `curl`:
curl -X GET http://localhost:8080/api/users \
     -H "Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1c3VhcmlUZXN0IiwiaWF0IjoxNzY4Mzg3MzkxLCJleHAiOjE3Njg0NzM3OTF9.gq6FxqH4nW4mmn-kh6yIzoyhVhCA25e-oLnvUs8KnVQ"
```

**Resposta:**
```json
[
  {
    "id": 1,
    "username": "nomUsuari",
    "email": "correu@example.com",
    "role": "USER",
    "enabled": true
  }
]
```
---

#### Obtenir usuari per ID
```bash
GET /api/users/{id}
Authorization: Bearer <token>
```
---

#### Exemple de com fer-ho amb `curl`:
```bash		 
curl -X GET http://localhost:8080/api/users/1 \
     -H "Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1c3VhcmlUZXN0IiwiaWF0IjoxNzY4Mzg3MzkxLCJleHAiOjE3Njg0NzM3OTF9.gq6FxqH4nW4mmn-kh6yIzoyhVhCA25e-oLnvUs8KnVQ"
```
---

#### Actualitzar usuari
```bash
PUT /api/users/{id}
Authorization: Bearer <token>
Content-Type: application/json

{
  "username": "nouNom",
  "email": "nouCorreu@example.com",
  "password": "novaContrasenya",
  "role": "ADMIN",
  "enabled": true
}
---

#### Exemple de com fer-ho amb `curl`:
```bash	 
curl -X PUT http://localhost:8080/api/users/1 \
     -H "Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1c3VhcmlUZXN0IiwiaWF0IjoxNzY4Mzg3MzkxLCJleHAiOjE3Njg0NzM3OTF9.gq6FxqH4nW4mmn-kh6yIzoyhVhCA25e-oLnvUs8KnVQ" \
     -H "Content-Type: application/json" \
     -d '{
           "username": "nouNom",
           "email": "nouCorreu@example.com",
           "password": "novaContrasenya",
           "role": "ADMIN",
           "enabled": true
         }'
```
Tots els camps són opcionals. Només s'actualitzaran els camps proporcionats.
---
#### Eliminar usuari
```bash
DELETE /api/users/{id}
Authorization: Bearer <token>
```
---

#### Exemple de com fer-ho amb `curl`:
```bash
// Primer cream un nou usuari per després eliminar-lo

curl -X POST http://localhost:8080/api/auth/register \
     -H "Content-Type: application/json" \
     -d '{
           "username": "pep",
           "password": "contrasenyaSuperSegura",
           "email": "usuari@test2.com"
         }'
		 
// Com que no ens dona l'id del nou usuari (*** Possible millora ***) obtindrem un nou llistat d'usuaris

curl -X GET http://localhost:8080/api/users \
     -H "Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1c3VhcmlUZXN0IiwiaWF0IjoxNzY4Mzg4MzM1LCJleHAiOjE3Njg0NzQ3MzV9.8PSWNBAqJGaJYYkVv7N4VBtG45t7Fy4pf09A_qQeifo"

// Ara que ja sabem l'id del nou usuari, ja el podrem esborrar
curl -X DELETE http://localhost:8080/api/users/2 \
     -H "Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1c3VhcmlUZXN0IiwiaWF0IjoxNzY4Mzg4MzM1LCJleHAiOjE3Njg0NzQ3MzV9.8PSWNBAqJGaJYYkVv7N4VBtG45t7Fy4pf09A_qQeifo"
```
---
**Resposta:**
```json
{
  "message": "User deleted successfully"
}
```

## Recopilem tots els exemples d'ús amb curl

### Registrar un nou usuari
```bash
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","password":"password123","email":"test@example.com"}'
```

### Fer login
```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","password":"password123"}'
```

### Obtenir tots els usuaris (amb token)
```bash
TOKEN="<el_teu_token_aquí>"
curl -X GET http://localhost:8080/api/users \
  -H "Authorization: Bearer $TOKEN"
```

### Actualitzar un usuari
```bash
TOKEN="<el_teu_token_aquí>"
curl -X PUT http://localhost:8080/api/users/1 \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"role":"ADMIN"}'
```

### Eliminar un usuari
```bash
TOKEN="<el_teu_token_aquí>"
curl -X DELETE http://localhost:8080/api/users/1 \
  -H "Authorization: Bearer $TOKEN"
```

## Configuració

El fitxer `src/main/resources/application.properties` conté la configuració de l'aplicació:

- **Port del servidor**: 8080
- **Base de dades**: SQLite (database.db) per defecte. Perfil addicional `postgres` al fitxer `src/main/resources/application-postgres.properties` amb les claus:
  - `POSTGRES_URL` (o `spring.datasource.url`)
  - `POSTGRES_USER` (o `spring.datasource.username`)
  - `POSTGRES_PASSWORD` (o `spring.datasource.password`; valor per defecte `CHANGE_ME_IN_PRODUCTION`, cal establir-ne un de real)
  - El perfil `postgres` utilitza per defecte `spring.jpa.hibernate.ddl-auto=validate`. Si necessites crear l'esquema automàticament al primer arrencada, defineix `POSTGRES_DDL_AUTO=update` i després torna a `validate` per a entorns de producció.
- **Secret JWT**: Configurable (per defecte inclòs)
- **Expiració del token**: 24 hores (86400000 ms)

## Seguretat

- Les contrasenyes s'encripten amb BCrypt abans de guardar-les
- Els tokens JWT expiren després de 24 hores
- Tots els endpoints (excepte /api/auth/**) requereixen autenticació JWT
- Les sessions són stateless (sense estat)

## Estructura del Projecte

```
src/
├── main/
│   ├── java/cat/xaviersastre/jwtserver/
│   │   ├── controller/         # Controllers REST
│   │   ├── dto/                # Data Transfer Objects
│   │   ├── model/              # Entitats JPA
│   │   ├── repository/         # Repositoris JPA
│   │   ├── security/           # Configuració de seguretat i JWT
│   │   ├── service/            # Lògica de negoci
│   │   └── JwtServerApplication.java
│   └── resources/
│       ├── application-postgres.properties
│       └── application.properties
└── test/
```

## Llicència

Aquest projecte es proporciona amb finalitats educatives.
