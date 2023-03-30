# Schemix Example

Welcome to Schemix.

When run, this example project generates the following Prisma schema. Feel free to check out, or just explore in order to gain a better grasp of how to use the project.

```prisma
datasource database {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

generator prismaThirdPartyGenerator {
  provider               = "prisma-includes-generator"
  seperateRelationFields = true
}

enum Status {
  PENDING
  LIVE
  DELETED
  REMOVED
}

model Post {
  id        String   @id @default(uuid()) @database.Uuid
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  status    Status
  text      String
  author    User     @relation(fields: [authorId], references: [email])
  authorId  String
}

model User {
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
  posts           Post[]
  auth            Auth?
  friends         User[]   @relation(name: "friends")
  friendRelations User[]   @relation(name: "friends")
  email           String
  fullName        String

  @@id([email])
}

model Auth {
  id     String @id @default(uuid()) @database.Uuid
  hash   String
  salt   String
  user   User   @relation(fields: [userId], references: [email])
  userId String
}

```
