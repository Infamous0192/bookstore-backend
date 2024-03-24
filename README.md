## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ yarn install
```

```bash
$ cp .env.example .env # Linux only
```

## Database Configuration

Configure the database first at ```.env``` file.

```bash
$ yarn migration:run
```

```bash
$ yarn seed:run
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```
