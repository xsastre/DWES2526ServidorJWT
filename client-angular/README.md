# Client Angular per JWT Server

Aquest és el client Angular que interactua amb el servidor JWT implementat amb Spring Boot.

## Característiques

- ✅ Pantalla de login i registre
- ✅ Gestió completa d'usuaris (CRUD)
- ✅ Autenticació amb JWT
- ✅ Guards per protegir rutes
- ✅ Interceptor HTTP per afegir el token JWT
- ✅ Interfície responsive i moderna

## Requisits

- Node.js 18 o superior
- npm 9 o superior
- Servidor Spring Boot JWT executant-se al port 8080

## Instal·lació

1. Navegar al directori del client:
```bash
cd client-angular
```

2. Instal·lar les dependències:
```bash
npm install
```

## Execució

### Desenvolupament

1. Assegura't que el servidor Spring Boot està executant-se al port 8080:
```bash
# Des del directori arrel del projecte
mvn spring-boot:run
```

2. En un altre terminal, executa el client Angular:
```bash
cd client-angular
npm start
```

L'aplicació s'obrirà automàticament al navegador a `http://localhost:4200`

## Funcionalitats

### Pantalla de Login
- Permet als usuaris iniciar sessió amb nom d'usuari i contrasenya
- Enllaç per anar a la pantalla de registre
- Validació de formularis
- Gestió d'errors

### Pantalla de Registre
- Permet als nous usuaris registrar-se
- Validació de camps (nom d'usuari mínim 3 caràcters, email vàlid, contrasenya mínim 6 caràcters)
- Confirmació de contrasenya
- Redirecció automàtica al login després del registre exitós

### Pantalla de Gestió d'Usuaris
- Llistat de tots els usuaris registrats
- Informació detallada: ID, nom d'usuari, email, rol, estat (actiu/inactiu)
- Botó per editar usuaris (modal amb formulari)
- Botó per eliminar usuaris (amb confirmació)
- Botó per tancar sessió
- Només accessible amb autenticació JWT

### Funcions d'Edició
- Modal per editar usuaris existents
- Permet actualitzar: nom d'usuari, email, contrasenya, rol, estat
- Tots els camps són opcionals
- Validació en temps real

## Estructura del Projecte

```
client-angular/
├── src/
│   ├── app/
│   │   ├── components/          # Components de la UI
│   │   │   ├── login/           # Component de login
│   │   │   ├── register/        # Component de registre
│   │   │   └── users/           # Component de gestió d'usuaris
│   │   ├── guards/              # Guards de rutes
│   │   │   └── auth.guard.ts    # Guard d'autenticació
│   │   ├── interceptors/        # Interceptors HTTP
│   │   │   └── auth.interceptor.ts  # Interceptor JWT
│   │   ├── models/              # Models/Interfícies TypeScript
│   │   │   └── user.model.ts    # Models d'usuari i DTOs
│   │   ├── services/            # Serveis
│   │   │   ├── auth.service.ts  # Servei d'autenticació
│   │   │   └── user.service.ts  # Servei d'usuaris
│   │   ├── app.component.*      # Component arrel
│   │   ├── app.config.ts        # Configuració de l'aplicació
│   │   └── app.routes.ts        # Configuració de rutes
│   ├── styles.css               # Estils globals
│   └── index.html               # Pàgina HTML principal
├── proxy.conf.json              # Configuració del proxy per CORS
├── angular.json                 # Configuració d'Angular CLI
└── package.json                 # Dependències del projecte
```

## API Endpoints Utilitzats

El client Angular fa servir els següents endpoints de l'API:

### Autenticació (públics)
- `POST /api/auth/login` - Iniciar sessió
- `POST /api/auth/register` - Registrar nou usuari

### Gestió d'Usuaris (protegits amb JWT)
- `GET /api/users` - Obtenir tots els usuaris
- `GET /api/users/{id}` - Obtenir usuari per ID
- `PUT /api/users/{id}` - Actualitzar usuari
- `DELETE /api/users/{id}` - Eliminar usuari

## Configuració del Proxy

El fitxer `proxy.conf.json` està configurat per redirigir les peticions `/api` al servidor Spring Boot (`http://localhost:8080`), evitant problemes de CORS durant el desenvolupament.

## Tecnologies Utilitzades

- Angular 17
- TypeScript
- RxJS
- Angular Router
- Angular Forms
- Angular HTTP Client

## Build per Producció

Per compilar l'aplicació per producció:

```bash
npm run build
```

Els fitxers compilats es generaran al directori `dist/client-angular` i es podran desplegar en qualsevol servidor web.

## Notes

- El token JWT s'emmagatzema al `localStorage` del navegador
- Les rutes protegides redirigeixen automàticament al login si no hi ha autenticació
- Tots els formularis tenen validació en temps real
- Les contrasenyes mai es mostren en text pla
