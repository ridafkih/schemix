# Schemix

[![NPM](https://nodei.co/npm/schemix.png)](https://nodei.co/npm/schemix/)

Schemix let's you programmatically generate Prisma schemas.

As Prisma schemas are not inherently segmentable, Schemix acts as a library to aid in generating your Prisma schema in a molecularized fashion using TypeScript, then exporting to one classic `.prisma` file to be consumed by your application.

![Schemix](https://user-images.githubusercontent.com/9158485/167313146-e10be387-ea1f-41f3-b994-65f0fe6d9471.png)

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

Using this library, you'll create your Schema and models using TypeScript, then by running the `PrismaSchema#export` function, you can export it to a Prisma file.

```ts
// _schema.ts
import { createSchema } from "schemix";

export const PrismaSchema = createSchema({
  datasource: {
    provider: "postgresql",
    url: "env(DATABASE_URL)",
  },
  generator: {
    provider: "prisma-client-js",
  },
});

export const UserModel = PrismaSchema.createModel("User");
export const PostModel = PrismaSchema.createModel("Post");
export const PostTypeEnum = PrismaSchema.createEnum("PostType");

import "./models/Post.model";
import "./models/User.model";
import "./enums/PostType.enum";

PrismaSchema.export("./", "schema");
```

```ts
// models/User.model.ts

import { UserModel, PostModel, PostTypeEnum } from "../_schema";

UserModel
  .string("id", { id: true, default: { uuid: true } })
  .int("registrantNumber", { default: { autoincrement: true } })
  .boolean("isBanned", { default: false })
  .relation("posts", PostModel, { list: true })
  .raw('@@map("service_user")');
```

```ts
// models/Post.model.ts

import { UserModel, PostModel } from "../_schema";

PostModel
  .string("id", { id: true, default: { uuid: true } })
  .int("postNumber", { default: { autoincrement: true } })
  .string("content", { raw: "@database.VarChar(240)" })
  .boolean("isDeleted", { default: false })
  .enum("postType", PostTypeEnum, { default: "COMMENT" })
  .relation("author", UserModel, {
    optional: true,
    fields: ["authorId"],
    references: ["id"],
  })
  .string("authorId", { optional: true });
```

```ts
// enums/PostType.enum.ts

import { PostTypeEnum } from "../_schema";

PostTypeEnum
  .addValue("FEED", { map: "feed" })
  .addValue("COMMENT", {
    map: "comment",
  });
```

The aforementioned configuration would produce the following Prisma schema:

```prisma
// schema.prisma

datasource database {
  provider = "postgresql"
  url = "env(DATABASE_URL)"
}

generator client {
  provider = "prisma-client-js"
}

enum PostType {
  FEED     @map("feed")
  COMMENT  @map("comment")
}

model User {
  id               String   @id @default(uuid())
  registrantNumber Int      @default(autoincrement())
  isBanned         Boolean  @default(false)
  posts            Post[]
  @@map("service_user")
}

model Post {
  id         String  @id @default(uuid())
  postNumber Int     @default(autoincrement())
  content    String  @database.VarChar(240)
  isDeleted  Boolean @default(false)
  postType   PostType @default(COMMENT)
  author     User?   @relation(fields: [authorId], references: [id])
  authorId   String?
}
```
