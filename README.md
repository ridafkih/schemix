# Schemix

Schemix let's you programmatically generate Prisma schemas, the main intention behind this library was to allow you to segment/molecularize schemas.

With this, you will be able to develop your schema in a consumable, molecularized fashion, while maintaining the capabilities that the entire Prisma toolkit provides.

## Installation

Simply install the library using your favourite package manager.

### Yarn

```bash
yarn add -D schemix
```

### NPM

```bash
npm i -D schemix
```

## Usage

Using this library, you'll create your Schema and models using TypeScript, then by running the `PrismaSchema#export` function, you can export it to a Prisma file. The following code will follow the proceeding output.

```ts
import { createSchema } from "schemix";

export const schema = createSchema({
  datasource: {
    provider: "postgresql",
    url: "env(DATABASE_URL)",
  },
  generator: {
    provider: "prisma-client-js",
  },
});

export const UserSchema = schema.createModel("User");
export const TweetSchema = schema.createModel("Tweet");

UserSchema.string("id", { id: true, default: { uuid: true } })
  .string("name", { optional: true })
  .string("uuid", { default: { uuid: true } })
  .relation("tweets", TweetSchema, { list: true });

TweetSchema.int("id", { id: true, default: { autoincrement: true } })
  .string("content", { raw: "@database.VarChar(255)" })
  .relation("author", UserSchema, { fields: ["authorId"], references: ["id"] })
  .string("authorId")
  .boolean("private", { default: false });

schema.export("./", "schema");
```

...˝

```prisma
datasource database {
  provider = "postgresql"
  url = "env(DATABASE_URL)"
}

generator client {
  provider = "prisma-client-js"
}

model User {
  id     String  @id @default(uuid())
  name   String?
  uuid   String  @default(uuid())
  tweets Tweet[]
}

model Tweet {
  id       Int     @id @default(autoincrement())
  content  String  @database.VarChar(255)
  author   User    @relation(fields: [authorId], references: [id])
  authorId String
  private  Boolean @default(false)
}
```
