# Security Considerations

## Known Vulnerabilities

### Angular 17.x Vulnerabilities

**Important**: Angular version 17.3.12 has known security vulnerabilities that do NOT have patches available in the 17.x or 18.x branches. The vulnerabilities are:

1. **XSRF Token Leakage via Protocol-Relative URLs**
   - Affected versions: Angular 17.x, 18.x
   - Patched in: Angular 19.2.16+, 20.3.14+, 21.0.1+
   - Severity: Medium
   - **Mitigation in this project**: We use relative URLs (not protocol-relative URLs) and proxy configuration

2. **XSS Vulnerability via Unsanitized SVG Script Attributes**
   - Affected versions: Angular ≤ 18.2.14
   - Patched in: Angular 19.2.18+, 20.3.16+, 21.0.7+
   - Severity: High
   - **Mitigation in this project**: We don't use SVG with dynamic content or user-controlled attributes

3. **Stored XSS Vulnerability via SVG Animation, SVG URL and MathML Attributes**
   - Affected versions: Angular ≤ 18.2.14
   - Patched in: Angular 19.2.17+, 20.3.15+, 21.0.2+
   - Severity: High
   - **Mitigation in this project**: We don't use SVG animations or MathML with user-controlled content

## Recommendations

### For Educational Use (Current Setup)
This project is intended for **educational purposes only** and uses Angular 17.x. The vulnerabilities mentioned above are **NOT exploitable** in our current implementation because:

1. We don't use protocol-relative URLs
2. We don't render user-controlled SVG content
3. We don't use SVG animations or MathML
4. All user input is displayed as text (not rendered as HTML)

### For Production Use
If you plan to use this code in a production environment, you should:

1. **Upgrade to Angular 19.2.18+ or higher** to get all security patches
2. **Run security audits regularly**:
   ```bash
   npm audit
   npm audit fix
   ```
3. **Keep dependencies updated**:
   ```bash
   npm update
   ```
4. **Enable Content Security Policy (CSP)** headers on your server
5. **Implement rate limiting** on authentication endpoints
6. **Use HTTPS** in production
7. **Rotate JWT secrets** regularly
8. **Implement proper session management** (token expiration, refresh tokens)

## Upgrade Path

To upgrade to a secure Angular version:

```bash
cd client-angular

# Upgrade to Angular 19 (requires Node 18.19+)
npm install -g @angular/cli@19
ng update @angular/core@19 @angular/cli@19

# Or upgrade to Angular 20 (requires Node 20.17+)
npm install -g @angular/cli@20
ng update @angular/core@20 @angular/cli@20
```

## Security Best Practices Implemented

Despite the Angular version vulnerabilities, this project implements several security best practices:

✅ **JWT Token Security**
- Tokens stored in localStorage (consider httpOnly cookies for production)
- Token included via HTTP interceptor
- Token expiration (24 hours)

✅ **Input Validation**
- Form validation on client-side
- Server-side validation with Spring Boot
- Email format validation
- Password minimum length requirements

✅ **Authentication & Authorization**
- Route guards protecting authenticated pages
- JWT verification on server-side
- BCrypt password hashing (server)

✅ **CORS Protection**
- Configured proxy in development
- CORS headers on server

✅ **No XSS Vectors**
- No innerHTML usage
- No dynamic SVG rendering
- No user-controlled HTML rendering
- Angular's built-in sanitization active

## Reporting Security Issues

This is an educational project. For real-world applications, always:
1. Have a security disclosure policy
2. Monitor security advisories
3. Keep dependencies updated
4. Perform regular security audits
5. Use automated security scanning tools

## References

- [Angular Security Guide](https://angular.io/guide/security)
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Angular Security Advisories](https://github.com/angular/angular/security/advisories)
