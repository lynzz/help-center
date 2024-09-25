# Help Center

⚠️ **Warning: This project is currently under development and not ready for production use. Use at your own risk.**

This is a Help Center application using Turbo for multi-project management, including a Strapi backend API and a React frontend with shadcn/ui and Vite.

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
   - Run Web frontend only (will run on port 3003):
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
  - `web/`: React frontend with Vite
- `packages/`: Shared packages (if any)

## Tech Stack

- Turbo: For multi-project management
- Strapi: Backend API
- React: Frontend library
- Next.js: React framework for the web frontend
- shadcn/ui: Frontend UI components
- Vite: Frontend build tool and development server for non-Next.js parts
- pnpm: Package manager

## Acknowledgements

- [next-shadcn-dashboard-starter](https://github.com/Kiranism/next-shadcn-dashboard-starter): Admin Dashboard Starter with Nextjs14 and shadcn ui.

## License

[Add your license information here]
