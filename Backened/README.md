# User API Documentation

## Register User Endpoint

### `POST /users/register`

Register a new user in the system.

### Request Body

```json
{
  "fullname": {
    "firstname": "string (required)",
    "lastname": "string (optional)"
  },
  "email": "string (required)",
  "password": "string (required)"
}
```

### Validation Rules
- `fullname.firstname`: Minimum 3 characters (required)
- `fullname.lastname`: Minimum 3 characters (optional)
- `email`: Valid email format (required)
- `password`: Minimum 6 characters (required)

### Success Response

**Code**: 201 Created

```json
{
  "token": "JWT_TOKEN_STRING",
  "user": {
    "_id": "USER_ID",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com"
  }
}
```

### Error Response

**Code**: 400 Bad Request

```json
{
  "errors": [
    {
      "msg": "Error message",
      "param": "field_name",
      "location": "body"
    }
  ]
}
```

### Example Request

```bash
curl -X POST http://localhost:3000/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "password": "password123"
  }'
```

## Login User Endpoint

### `POST /users/login`

Authenticate a user and receive an access token.

### Request Body

```json
{
  "email": "string (required)",
  "password": "string (required)"
}
```

### Validation Rules
- `email`: Valid email format (required)
- `password`: Minimum 6 characters (required)

### Success Response

**Code**: 200 OK

```json
{
  "token": "JWT_TOKEN_STRING",
  "user": {
    "_id": "USER_ID",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com"
  }
}
```

### Error Response

**Code**: 401 Unauthorized

```json
{
  "message": "Invalid email or password"
}
```

### Example Request

```bash
curl -X POST http://localhost:3000/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john.doe@example.com",
    "password": "password123"
  }'
```

# Captain API Documentation

## Register Captain Endpoint

### `POST /captains/register`

Register a new captain in the system.

### Request Body

```json
{
  "fullname": {
    "firstname": "string", // required, min 3 characters
    "lastname": "string"   // optional
  },
  "email": "string",       // required, valid email format
  "password": "string",    // required, min 6 characters
  "vehicle": {
    "color": "string",     // required, min 3 characters
    "plate": "string",     // required, min 3 characters
    "capacity": "number",  // required, min 1
    "vehicleType": "string" // required, must be one of: car, motorcycle, auto
  }
}
```

### Success Response

**Code**: 201 Created

```json
{
  "token": "JWT_TOKEN_STRING",
  "captain": {
    "_id": "CAPTAIN_ID",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "vehicle": {
      "color": "black",
      "plate": "ABC123",
      "capacity": 4,
      "vehicleType": "car"
    }
  }
}
```

## Login Captain Endpoint

### `POST /captains/login`

Authenticate a captain and receive an access token.

### Request Body

```json
{
  "email": "string",    // required, valid email format
  "password": "string"  // required, min 6 characters
}
```

### Success Response

**Code**: 200 OK

```json
{
  "token": "JWT_TOKEN_STRING",
  "captain": {
    "_id": "CAPTAIN_ID",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "vehicle": {
      "color": "black",
      "plate": "ABC123",
      "capacity": 4,
      "vehicleType": "car"
    }
  }
}
```

## Get Captain Profile

### `GET /captains/profile`

Get the profile of the authenticated captain.

### Headers
```json
{
  "Authorization": "Bearer JWT_TOKEN_STRING"  // required
}
```

### Success Response

**Code**: 200 OK

```json
{
  "captain": {
    "_id": "CAPTAIN_ID",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "vehicle": {
      "color": "black",
      "plate": "ABC123",
      "capacity": 4,
      "vehicleType": "car"
    }
  }
}
```

## Logout Captain

### `GET /captains/logout`

Logout the currently authenticated captain.

### Headers
```json
{
  "Authorization": "Bearer JWT_TOKEN_STRING"  // required
}
```

### Success Response

**Code**: 200 OK

```json
{
  "message": "Logout successfully"
}
```
