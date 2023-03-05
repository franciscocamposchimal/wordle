## Description

*This is a game to try to guess the hidden word
*This repository works with nodeJs +18.10 and PostgresQl database and NestJs framework

## Installation

```bash
$ yarn install
```

## Environment Variables

Clone the env.copy file and remove the word "copy", then add your own values.

## Running the app

```bash
# run migrations
$ yarn migration:run

# seeder database
$ yarn seed:run

# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Enpoints

All Endpoints are protected by header "Authorization", example: { "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." }
Default user:
email: wordlw@gmail.com
all passwords: Password123

```bash
# login
# METHOD: POST
http://localhost:3030/v1/auth/login
body: {
    "email": "wordlw@gmail.com",
    "password": "Password123"
}

# Game init or new game
# METHOD: Get
http://localhost:3030/v1/game/init

# Attempt guess word
# METHOD: Post
http://localhost:3030/v1/game/init
body: { "userWord": "goleá" }

# Get statistics of user logged
# METHOD: Get
http://localhost:3030/v1/players/me

# Get statistics of first top 10 users
# METHOD: Get
http://localhost:3030/v1/players/top

# Get statistics of first top 10 words
# METHOD: Get
http://localhost:3030/v1/players/top-words
```
