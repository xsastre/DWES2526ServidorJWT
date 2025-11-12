# DWES2526ServidorJWT

Servidor d'autenticació basat en JWT (JSON Web Token) implementat amb Spring Boot i base de dades SQLite.

## Descripció

Aquest projecte proporciona un servidor REST API complet per a l'autenticació d'usuaris utilitzant tokens JWT. Inclou funcionalitats de registre, login i manteniment d'usuaris (CRUD).

## Característiques

- ✅ Autenticació basada en JWT
- ✅ Base de dades SQLite per a emmagatzematge d'usuaris
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

L'aplicació s'iniciarà al port 8080. La base de dades SQLite (`database.db`) es crearà automàticament al directori arrel del projecte.

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

**Resposta:**
```json
{
  "message": "User registered successfully"
}
```

#### Login
```bash
POST /api/auth/login
Content-Type: application/json

{
  "username": "nomUsuari",
  "password": "contrasenya123"
}
```

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

#### Obtenir usuari per ID
```bash
GET /api/users/{id}
Authorization: Bearer <token>
```

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
```

Tots els camps són opcionals. Només s'actualitzaran els camps proporcionats.

#### Eliminar usuari
```bash
DELETE /api/users/{id}
Authorization: Bearer <token>
```

**Resposta:**
```json
{
  "message": "User deleted successfully"
}
```

## Exemples d'ús amb curl

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
- **Base de dades**: SQLite (database.db)
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
│   ├── java/cat/institutmvm/jwtserver/
│   │   ├── controller/         # Controllers REST
│   │   ├── dto/                # Data Transfer Objects
│   │   ├── model/              # Entitats JPA
│   │   ├── repository/         # Repositoris JPA
│   │   ├── security/           # Configuració de seguretat i JWT
│   │   ├── service/            # Lògica de negoci
│   │   └── JwtServerApplication.java
│   └── resources/
│       └── application.properties
└── test/
```

## Llicència

Aquest projecte es proporciona amb finalitats educatives.