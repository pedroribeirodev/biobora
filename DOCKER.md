# Docker Setup for BioBora

This project uses Docker Compose to run a PostgreSQL database locally, eliminating the need to install PostgreSQL on your machine.

## Prerequisites

- [Docker](https://docs.docker.com/get-docker/) installed on your machine
- [Docker Compose](https://docs.docker.com/compose/install/) (usually included with Docker Desktop)

## Quick Start

1. **Start the database:**
   ```bash
   npm run docker:up
   ```

2. **Run database migrations:**
   ```bash
   npm run db:migrate
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

## Docker Commands

### Start PostgreSQL
```bash
npm run docker:up
# or
docker-compose up -d
```

### Stop PostgreSQL
```bash
npm run docker:down
# or
docker-compose down
```

### View logs
```bash
npm run docker:logs
# or
docker-compose logs -f postgres
```

### Reset database (WARNING: deletes all data)
```bash
npm run docker:reset
# or
docker-compose down -v
docker-compose up -d
```

## Database Access

### Connection Details
- **Host:** localhost
- **Port:** 5432
- **Database:** biobora
- **User:** biobora
- **Password:** biobora123

### Using Prisma Studio
```bash
npm run db:studio
```

### Direct PostgreSQL Access
```bash
docker exec -it biobora-postgres psql -U biobora -d biobora
```

## Environment Variables

The database configuration is managed through environment variables in your `.env` file:

```env
DATABASE_URL="postgresql://biobora:biobora123@localhost:5432/biobora?schema=public"
POSTGRES_USER="biobora"
POSTGRES_PASSWORD="biobora123"
POSTGRES_DB="biobora"
```

You can customize these values in your `.env` file if needed.

## Troubleshooting

### Port 5432 already in use
If you have PostgreSQL installed locally and running, you'll need to either:
1. Stop your local PostgreSQL service, or
2. Change the port mapping in `docker-compose.yml`:
   ```yaml
   ports:
     - "5433:5432"  # Use port 5433 on host
   ```
   Then update your DATABASE_URL to use port 5433.

### Container won't start
Check the logs:
```bash
docker-compose logs postgres
```

### Permission issues
On Linux, you might need to run Docker commands with `sudo` or add your user to the docker group:
```bash
sudo usermod -aG docker $USER
```
Then log out and back in.

### Reset everything
If you need a completely fresh start:
```bash
docker-compose down -v  # Delete volumes
docker-compose up -d    # Start fresh
npm run db:migrate      # Re-run migrations
```
