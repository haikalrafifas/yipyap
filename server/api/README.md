# Chat App REST API

A serverless logger service for REST API CRUD actions. It is highly integrated with [Vercel](https://vercel.com).

## Installation

1. Install `nodejs` `LTS` version on your machine.
2. Clone this repository.
3. Use this command to install dependencies:
   ```
   npm install
   ```
4. Install `postgresql` on your machine.
5. Use this command to initialize a new database cluster:
   ```
   initdb -D /path/to/cluster
   ```
6. Use this command to start the database server:
   ```
   pg_ctl start -D /path/to/cluster
   ```
7. Copy `.env.example` into `.env` and change the value of `POSTGRES_URL`
8. Run the program:
   ```
   npm start
   ```
9. Use this command if Vercel is not set up:
   ```
   vercel login
   ```
10. Use this command to stop the database server:
    ```
    pg_ctl stop -D /path/to/cluster
    ```

## API Specification

### Get All Units
```
GET /api/units
```
```json
{
   "message": "Successfully get all units!",
   "data": [
      {
         "device_id": "string",
         "name": "string",
      },
      ...
   ],
}
```

### Get Unit by ID
```
GET /api/units/:device_id
```
```json
{
   "message": "Successfully get a unit!",
   "data": {
      "device_id": "string",
      "name": "string",
      "status": {
         "is_online": "boolean",
         "is_switch_on": "boolean",
         "is_difflock_on": "boolean",
         "is_error": "boolean",
         "updated_at": "timestamp",
      },
      "errors": [
         {
            "message": "string",
            "is_switch_on": "boolean",
            "is_difflock_on": "boolean",
            "timestamp": "timestamp",
         },
         ...
      ],
   },
}
```

### Get Unit Messages
```
GET /api/units/:device_id/messages
```
```json
{
   "message": "Successfully get unit messages!",
   "data": [
      {
         "message": "string",
         "is_switch_on": "boolean",
         "is_difflock_on": "boolean",
         "timestamp": "timestamp",
      },
      ...
   ],
}
```

### Add a Unit
```
POST /api/units
{
   "device_id": "string",
   "name": "string",
}
```
```json
{
  "message": "string",
  "data": {
    "device_id": "string",
    "name": "string",
    "created_at": "timestamp",
    "updated_at": "timestamp",
  }
}
```

### Update a Unit State
```
POST /api/units/:device_id
{
   "name": "string",
   "status": {
      "is_switch_on": "boolean",
      "is_difflock_on": "boolean",
   },
   "error": {
      "message": "string",
      "timestamp": "timestamp",
   },
}
```
```json
{

}
```

### Edit a Unit
```
POST /api/units/:device_id/edit
{
   "name": "string",
}
```
```json
{

}
```
