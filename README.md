# Node.js + Prisma + MySQL REST API

A modern, type-safe REST API built with Node.js, Express, Prisma ORM, and MySQL. This project provides a complete CRUD API with automatic migrations, connection pooling, and comprehensive error handling.

## 🚀 Features

- **Type-Safe Database Access** - Prisma ORM with auto-generated types
- **RESTful API Design** - Standard HTTP methods and status codes
- **Automatic Migrations** - Database schema version control with Prisma Migrate
- **Error Handling** - Comprehensive error handling with Prisma error codes
- **Connection Pooling** - Built-in connection management

##  Prerequisites

- Node.js (v14 or higher)
- MySQL (v5.7 or higher)
- npm or yarn

##  Installation

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd node-prisma-api
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**

Create a `.env` file in the root directory:
```env
DATABASE_URL="mysql://root:your_password@localhost:3306/test_db"
PORT=3000
```

4. **Initialize Prisma and create database**
```bash
# Create your MySQL database
mysql -u root -p
CREATE DATABASE test_db;
exit;

# Run Prisma migrations
npx prisma migrate dev --name init

# Generate Prisma Client
npx prisma generate
```

5. **Seed the database (optional)**
```bash
npx prisma db seed
```

##  Running the Application

**Development mode (with auto-restart):**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

The server will start at `http://localhost:3000`

##  API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/users` | Get all users |
| GET | `/api/users/:id` | Get user by ID |
| POST | `/api/users` | Create new user |
| PUT | `/api/users/:id` | Update user |
| DELETE | `/api/users/:id` | Delete user |

##  API Usage Examples

### Get All Users
```bash
curl http://localhost:3000/api/users
```

### Get User by ID
```bash
curl http://localhost:3000/api/users/1
```

### Create New User
```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"name":"Alice Johnson","email":"alice@example.com"}'
```

### Update User
```bash
curl -X PUT http://localhost:3000/api/users/1 \
  -H "Content-Type: application/json" \
  -d '{"name":"John Updated","email":"john.updated@example.com"}'
```

### Delete User
```bash
curl -X DELETE http://localhost:3000/api/users/1
```

##  Project Structure

```
node-prisma-api/
├── .env                  # Environment variables
├── .gitignore           # Git ignore file
├── server.js            # Express server setup
├── package.json         # Project dependencies
├── prisma/
│   ├── schema.prisma    # Database schema
│   ├── seed.js          # Database seeding script
│   └── migrations/      # Migration files
└── routes/
    └── users.js         # User routes and handlers
```

##  Prisma Commands

| Command | Description |
|---------|-------------|
| `npx prisma migrate dev` | Create and apply new migration |
| `npx prisma migrate deploy` | Apply migrations in production |
| `npx prisma generate` | Generate Prisma Client |

##  Common Prisma Error Codes

- `P2002` - Unique constraint violation (duplicate email)
- `P2025` - Record not found
- `P1001` - Can't reach database server
- `P1003` - Database does not exist

##  Deployment

1. **Update production environment variables**
2. **Run migrations:**
```bash
npx prisma migrate deploy
```
3. **Start the server:**
```bash
npm start
```

##  Dependencies

- **express** - Web framework
- **@prisma/client** - Prisma Client for database access
- **nodemon** - Development auto-restart

# Node.js Backend with MySQL (Docker Setup)

This guide explains how to build and run the Node.js backend using Docker and connect it to a MySQL database container with Prisma migrations.

## Prerequisites

- Docker and Docker Compose installed
- Prisma CLI available in your project (`npx prisma`)
- A valid Dockerfile in your project root

## 1. Build the Docker Image

Build the Docker image from the projects Dockerfile:

```bash
docker build -t my-app .
```

## 2. Create a Docker Network

Create a Docker network for communication between containers:

```bash
docker network create backend
```

## 3. Run the MySQL Container

Start a MySQL container with environment variables for root password and database name:

```bash
docker run --name sql --network backend -d   -p 3306:3306   -e MYSQL_ROOT_PASSWORD=jawad   -e MYSQL_DATABASE=test_db   mysql
```

## 4. Run the Node.js Application

Start your backend container and connect it to the same network:

```bash
docker run --name nodebackend -d   --network backend   -p 3000:3000   -e DATABASE_URL="mysql://root:jawad@sql:3306/test_db"   my-app
```

## 5. Run Prisma Migrations

Access the Node.js container shell:

```bash
docker exec -it nodebackend sh
```

Then run Prisma migration command to initialize your database schema:

```bash
npx prisma migrate dev --name init
```

Exit the container after the migration completes:

```bash
exit
```

## 6. Access the Application

Once both containers are running:
- Backend is available at: `http://localhost:3000`
- MySQL is accessible on port: `3306`

## 7. Optional Commands

Stop containers:

```bash
docker stop nodebackend sql
```

Remove containers and network:

```bash
docker rm nodebackend sql
docker network rm backend
```
