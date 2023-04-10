# Schemix Example

Welcome to Schemix.

This example project demonstrates having multiple directories for storing prisma files. This is the schema it generated. 

You can specify additional paths to check via the `additionalPaths` key in your `createSchema({})` block.

### Notes:
- `additionalPaths` will not be used if there was no `basePath` value passed in.
- Values of `additionalPaths` should be considered relative to the `basePath` value.

```prisma
datasource database {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

enum Status {
  PENDING
  LIVE
  DELETED
  REMOVED
}

enum Category {
  ROMANCE
  SCIFI
  FANTASY
  HISTORICAL
}

model User {
  id       Int    @id @default(autoincrement())
  email    String
  fullName String
}

model Author {
  id        Int    @id @default(autoincrement())
  email     String
  firstName String
  LastName  String
}

model Post {
  id            Int      @id @default(autoincrement())
  initializedAt DateTime @default(now())
  editedAt      DateTime @updatedAt
  status        Status
  text          String
}

model Book {
  id                        Int      @id @default(autoincrement())
  otherTimestampAt          DateTime @default(now())
  someOtherOtherTimestampAt DateTime @updatedAt
  category                  Category
  text                      String
}

model Reader {
  id            Int    @id @default(autoincrement())
  firstName     String
  LastName      String
  numBooks_read Int
}

```
