# Help Center

⚠️ **Warning: This project is currently under development and not ready for production use. Use at your own risk.**

This is a Help Center application using Turbo for multi-project management, including a Strapi backend API, Next.js frontend, and shadcn/ui as the frontend UI library.

## Getting Started

Ensure you have Node.js (version >= 14.0.0) and pnpm (version 8.15.4) installed.

1. Clone the repository:
   ```
   git clone git@github.com:lynzz/help-center.git
   cd help-center
   ```

2. Install dependencies:
   ```
   pnpm install
   ```

3. Run the development server:
   - Run all projects:
     ```
     pnpm run dev
     ```
   - Run API only:
     ```
     pnpm run dev:api
     ```
   - Run Web frontend only:
     ```
     pnpm run dev:web
     ```

4. Build the project:
   ```
   pnpm run build
   ```

5. Run lint checks:
   ```
   pnpm run lint
   ```

## Project Structure

- `apps/`: Contains all applications
  - `api/`: Strapi backend API
  - `web/`: Next.js frontend
- `packages/`: Shared packages (if any)

## Tech Stack

- Turbo: For multi-project management
- Strapi: Backend API
- Next.js: Frontend framework
- shadcn/ui: Frontend UI library
- pnpm: Package manager

## Acknowledgements

- [shadcnui-boilerplate](https://github.com/TinsFox/shadcnui-boilerplate): A boilerplate built with shadcn/ui for rapid development of modern web applications.

## License

[Add your license information here]
