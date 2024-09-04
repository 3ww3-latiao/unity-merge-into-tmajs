# A koa server template for ESM

This project is an open-source template for building server-side applications using Koa, TypeScript, tsup for building, and integrated ESLint + Prettier for code formatting and linting. It is designed to provide a starting point for developers looking to create robust, scalable, and maintainable web services or APIs.

## Features

- **Koa Framework**: Utilizes Koa for handling HTTP requests with a minimalistic and flexible approach.
- **TypeScript Support**: Leverages TypeScript for strong typing and enhanced development experience.
- **tsup for Building**: Uses tsup for efficient and fast TypeScript compilation.
- **ESLint + Prettier**: Integrated ESLint and Prettier for consistent code formatting and linting, ensuring code quality and style consistency.
- **Advanced REST Architecture**: Features a polished RESTful architecture with efficient route management for streamlined API development.
- **zod-based DTO Validation**: Introduces zod for clear, concise DTO middleware, greatly simplifying data validation and structuring.

## Getting Started

### Prerequisites

- Node.js (Version recommended: 14.x or later)
- npm/yarn

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Siykt/nodejs-server-template.git
   ```

2. Install dependencies:

   ```bash
   cd nodejs-server-template
   npm install
   ```

   or if you prefer yarn,

   ```bash
   yarn
   ```

### Running the Server

To start the server in development mode, run:

```bash
npm run dev
```

or using yarn,

```bash
yarn dev
```

The server will reload automatically on file changes thanks to ts-node-dev.

### Building the Project

To compile TypeScript to JavaScript, run:

```bash
npm run build
```

or using yarn,

```bash
yarn build
```

The build output will be in the `dist` folder.

## Middlewares

### Restful Middleware

The `restful` middleware is a custom middleware that simplifies the process of defining RESTful routes. It provides a clean and concise way to define routes and their corresponding handlers.

```typescript
import { defineRouter } from '../lib/defineRouter.js';
import { restful } from '../middlewares/restful.js';

const apiRouter = defineRouter({
  prefix: '/api',
  health: true,
  middlewares: [restful], // Add the restful middleware
  routes: [],
});
```

### DTO Middleware

The `dto` middleware is a custom middleware that simplifies the process of defining DTOs (Data Transfer Objects) for request validation. It uses zod for schema validation and provides a clean and concise way to define DTOs.

```typescript
import { defineRouter } from '../lib/defineRouter.js';
import { dto } from '../middlewares/dto.js';
import { z } from 'zod';

const nameVerifySchema = z.object({
  name: z.string(),
});

export const nameRouter = defineRouter({
  prefix: '/name',
  health: true,
  routes: [],
});

nameRouter.post('/verify', dto(nameVerifySchema), async (ctx) => {
  const { name } = ctx.request.body as z.infer<typeof nameVerifySchema>;

  ctx.body = names.has(name);
});
```

### Authentication password middleware

The `authPassword` middleware is a custom middleware that simplifies the process of defining password authentication for routes. It provides a clean and concise way to define password authentication.

```typescript
import { defineRouter } from '../lib/defineRouter.js';
import { authPassword } from '../middlewares/authPassword.js';
import { ENV } from '../constants/env.js';

export const addressRouter = defineRouter({
  prefix: '/address',
  middlewares: [psdAuth(ENV.SERVER_AUTH_PASSWORD)], // Add the authPassword middleware
});
```

### Authentication Jwt middleware

The `authJwt` middleware is a custom middleware that simplifies the process of defining JWT authentication for routes. It provides a clean and concise way to define JWT authentication.

```typescript
import { defineRouter } from '../lib/defineRouter.js';
import { authJwt } from '../middlewares/authJwt.js';
import { redis } from '../lib/redis.js';
import { ENV } from '../constants/env.js';

export const addressRouter = defineRouter({
  prefix: '/address',
  middlewares: [authJwt(async (user) => Boolean(await redis.get(user.id)), ENV.JWT_SECRET)], // Add the authJwt middleware
});
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request or create an issue for any enhancements, bug fixes, or feature requests.

## License

This project is open-source and available under the [MIT License](LICENSE).
