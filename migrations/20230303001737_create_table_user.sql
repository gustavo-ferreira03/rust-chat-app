CREATE TABLE "user" (
    user_id serial PRIMARY KEY,
    name VARCHAR(20) UNIQUE NOT NULL
);