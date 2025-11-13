Amb powershell per registrar usuari

```shell
curl.exe -v -X POST http://localhost:8080/api/auth/register -H "Content-Type: application/json" -H "Accept: application/json" -d '{"username":"nomUsuari","password":"contrasenya123","email":"correu@exemple.com"}'^C
```

Per fer login
```shell
curl.exe -v -X POST http://localhost:8080/api/auth/login -H "Content-Type: application/json" -H "Accept: application/json" -d '{"username":"nomUsuari","password":"contrasenya123"}'
```
