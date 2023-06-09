![image](https://user-images.githubusercontent.com/62758448/231750242-3e20d1ad-59c5-4f9d-8ef5-fe5efb88c993.png)

# Setup

### 1. Install dependencies

```
npm init -y
```
```
npm i @prisma/client cors dotenv express
```
```
npm i -D @types/cors @types/express nodemon prisma ts-node typescript
```

Add these scripts to package.json

```json
"scripts": {
  "dev": "nodemon index.ts",
  "build": "tsc -b",
  "start": "node dist/index.js"
},
```

### 2. Create tsconfig.json file

```json
{
  "compilerOptions": {
    "sourceMap": true,
    "outDir": "dist",
    "strict": true,
    "esModuleInterop": true,
    "typeRoots": ["./node_modules/@types"],
    "resolveJsonModule": true
  }
}
```

### 3. Create nodemon.json file

```json
{
  "watch": ["src"],
  "ext": ".ts,.js",
  "ignore": [],
  "exec": "ts-node --files index.ts"
}
```

### 4. Create .gitignore file

```
node_modules
dist
.env
```

### 5. Set up prisma

```
npx prisma init
```

Update schema.prisma file

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "mongodb"
  url      = env("DATABASE_URL")
}

model Task {
  id          String   @id @default(auto()) @map("_id") @db.ObjectId
  title       String
  description String
  updated_at  DateTime @updatedAt()
  created_at  DateTime @default(now())
}
```

Update .env file with database credentials

```
DATABASE_URL=""
```

Create src/lib/prisma.ts file

```ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default prisma;
```

### 6. Setup index.ts file

```ts
import cors from "cors";
import express from "express";
import * as dotenv from "dotenv";
import { taskRouter } from "./src/routers/taskRouter";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
```
