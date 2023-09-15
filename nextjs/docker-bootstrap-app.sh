#!/bin/sh
# ENVIRONEMTN from docker-compose.yaml doesn't get through to subprocesses
# Need to explicit pass DATABASE_URL here, otherwise migration doesn't work
# Run migrations
DATABASE_URL="postgres://postgres:postgres@db:5432/appdb?sslmode=disable" npx prisma migrate deploy
# start app
DATABASE_URL="postgres://postgres:postgres@db:5432/workler?sslmode=disable" node server.js