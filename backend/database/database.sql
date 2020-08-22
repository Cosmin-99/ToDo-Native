CREATE DATABASE todo-mobile;

CREATE TABLE todo (
    "id" BIGSERIAL NOT NULL PRIMARY KEY,
    "titlu" VARCHAR(100),
    "responsabil" VARCHAR(100),
    "status" VARCHAR(100),
    "dataFinalizare" DATE,
    "termenFinalizare" DATE,
);