# Chembio Lifesciences Website

A modern website built with Next.js 14, React 18, and Tailwind CSS to showcase Chembio Lifesciences' products and services.

## Tech Stack

- **Frontend**: Next.js 14 with React 18
- **UI Components**: Shadcn UI library
- **Styling**: Tailwind CSS
- **Database**: Neon PostgreSQL with Drizzle ORM
- **Authentication**: Clerk
- **Form Validation**: Zod

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up environment variables:
   Create a `.env.local` file in the root directory with the following variables:
   ```
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   CLERK_SECRET_KEY=your_clerk_secret_key
   DATABASE_URL=your_neon_postgres_url
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Project Structure

```
src/
├── app/             # Next.js 14 app directory
├── components/      # Reusable UI components
├── lib/            # Utility functions and configurations
└── styles/         # Global styles and Tailwind configurations
```

## Features

- Modern and responsive design
- Server-side rendering with Next.js
- Secure authentication with Clerk
- Product management system
- Contact form with validation
- Admin dashboard for CRUD operations

## Development Guidelines

1. Follow the TypeScript strict mode guidelines
2. Use Tailwind CSS for styling
3. Implement proper error handling
4. Write clean, maintainable code
5. Follow Next.js best practices

## License

This project is private and confidential.
