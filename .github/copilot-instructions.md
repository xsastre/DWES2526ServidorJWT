# GitHub Copilot Instructions for DWES2526ServidorJWT

## Project Overview
This is a JWT-based authentication server built with Spring Boot 3.1.5, providing REST API endpoints for user authentication and management. The project supports both SQLite (default) and PostgreSQL databases.

## Technology Stack
- **Framework**: Spring Boot 3.1.5
- **Java Version**: 17
- **Build Tool**: Maven
- **Database**: SQLite (default), PostgreSQL (optional profile)
- **Security**: Spring Security with JWT (jjwt 0.11.5)
- **ORM**: Spring Data JPA with Hibernate
- **Utilities**: Lombok, Jakarta Validation

## Project Structure
```
src/main/java/cat/xaviersastre/jwtserver/
├── controller/         # REST controllers for API endpoints
├── dto/               # Data Transfer Objects for requests/responses
├── model/             # JPA entities (database models)
├── repository/        # Spring Data JPA repositories
├── security/          # Security configuration, JWT utilities, filters
├── service/           # Business logic services
└── JwtServerApplication.java  # Main application class
```

## Coding Standards and Conventions

### General Guidelines
- **Language**: Code comments and messages can be in Catalan, Spanish, or English
- **Package Structure**: Follow the existing package organization under `cat.xaviersastre.jwtserver`
- **Naming**: Use clear, descriptive names following Java conventions (camelCase for variables/methods, PascalCase for classes)

### Lombok Usage
- **Always use Lombok annotations** to reduce boilerplate code:
  - `@Data` for DTOs and simple POJOs (generates getters, setters, toString, equals, hashCode)
  - `@NoArgsConstructor` and `@AllArgsConstructor` for entity constructors
  - `@RequiredArgsConstructor` for controllers and services (constructor injection)
- **Note**: Even when `@Data` is present, explicit getters and setters may exist for clarity (as seen in User.java)

### Dependency Injection
- **Always use constructor injection** with `@RequiredArgsConstructor` (Lombok)
- Mark all dependencies as `final`
- Example:
```java
@Service
@RequiredArgsConstructor
public class MyService {
    private final MyRepository myRepository;
    private final MyOtherService myOtherService;
}
```

### Validation
- Use Jakarta Validation annotations for input validation:
  - `@NotBlank` for required string fields
  - `@Email` for email validation
  - `@Size` for length constraints
  - `@Valid` in controller methods to trigger validation
- Always include meaningful validation messages

### Entity Patterns
- Use `@Entity` with `@Table(name = "table_name")`
- Include `@PrePersist` and `@PreUpdate` for automatic timestamp management
- Default values should be set directly in field declarations
- Example:
```java
@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    
    @Column(nullable = false)
    private String role = "USER";
    
    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
}
```

### Controller Patterns
- Use `@RestController` and `@RequestMapping` for base path
- Return `ResponseEntity<T>` for proper HTTP status control
- Handle exceptions with try-catch blocks, returning appropriate HTTP status codes
- Use `@Valid` for request body validation
- Example:
```java
@RestController
@RequestMapping("/api/resource")
@RequiredArgsConstructor
public class ResourceController {
    @PostMapping
    public ResponseEntity<Response> create(@Valid @RequestBody Request request) {
        try {
            Response response = service.create(request);
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(new ErrorResponse(e.getMessage()));
        }
    }
}
```

### Service Layer
- Business logic belongs in `@Service` classes
- Services should throw `RuntimeException` (or custom exceptions) for business rule violations
- Use repository methods for database operations

### Security Practices
- **JWT Authentication**: All endpoints except `/api/auth/**` require JWT token
- **Password Encryption**: Always use `PasswordEncoder` (BCrypt) for password handling
- **Stateless Sessions**: `SessionCreationPolicy.STATELESS` is enforced
- **CSRF Disabled**: API is stateless, CSRF protection is disabled
- Never log or expose sensitive information (passwords, tokens in plaintext)

### DTOs (Data Transfer Objects)
- Separate DTOs for requests and responses
- Request DTOs should include validation annotations
- Response DTOs should not expose sensitive fields (e.g., passwords)
- Use clear naming: `*Request`, `*Response`, `*DTO`

## Database Configuration

### Default (SQLite)
- Database file: `database.db` in project root
- Auto-creates schema with `spring.jpa.hibernate.ddl-auto=update`
- No credentials needed

### PostgreSQL Profile
- Activate with environment variable: `SPRING_PROFILES_ACTIVE=postgres`
- Required environment variables:
  - `POSTGRES_URL` (or `spring.datasource.url`)
  - `POSTGRES_USER` (or `spring.datasource.username`)
  - `POSTGRES_PASSWORD` (required, app won't start without it)
- Uses `spring.jpa.hibernate.ddl-auto=validate` (schema must exist)
- Configuration in `src/main/resources/application-postgres.properties`

## Build and Run Commands

### Build
```bash
mvn clean compile
```

### Run (SQLite)
```bash
mvn spring-boot:run
```

### Run (PostgreSQL)
```bash
export POSTGRES_URL="jdbc:postgresql://host:5432/dbname"
export POSTGRES_USER="username"
export POSTGRES_PASSWORD="password"
export SPRING_PROFILES_ACTIVE=postgres
mvn spring-boot:run
```

### Test
```bash
mvn test
```

## API Design Patterns

### Public Endpoints (No Authentication)
- `/api/auth/register` - User registration
- `/api/auth/login` - User login (returns JWT token)

### Protected Endpoints (Require JWT)
- `/api/users` - User management CRUD operations
- Header required: `Authorization: Bearer <token>`

### Response Patterns
- Success responses: `ResponseEntity.ok(data)`
- Error responses: `ResponseEntity.badRequest().body(errorMessage)`
- Use consistent DTO classes: `MessageResponse`, `JwtResponse`, `UserResponse`

## Common Patterns to Follow

1. **Never expose User passwords** in responses - use DTOs that exclude sensitive fields
2. **Always validate input** using Jakarta Validation annotations
3. **Use constructor injection** with Lombok's `@RequiredArgsConstructor`
4. **Follow RESTful conventions** for endpoint naming and HTTP methods
5. **Handle exceptions gracefully** in controllers with appropriate HTTP status codes
6. **Use meaningful commit messages** in Catalan, Spanish, or English
7. **Keep configuration in properties files** - use environment variables for secrets
8. **Follow package organization** - controllers, services, repositories, DTOs, models, security

## Security Reminders
- JWT secret is configured in `application.properties` (should be externalized in production)
- Token expiration: 24 hours (86400000 ms)
- Always encode passwords with BCryptPasswordEncoder before saving
- Validate JWT tokens on all protected endpoints using JwtAuthenticationFilter

## Testing Guidelines
- Use Spring Boot Test dependencies
- Include Spring Security Test for authentication testing
- Test both positive and negative scenarios
- Mock external dependencies when appropriate

## Important Notes
- The application uses **Java 17** - ensure compatibility when adding new features
- Lombok must be configured in the IDE for development
- Database file (`database.db`) is gitignored - don't commit it
- The project is educational, maintain clear and understandable code
