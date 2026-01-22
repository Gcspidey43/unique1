# Unique Visa Consultancy

A professional visa consultancy website built with Next.js, Tailwind CSS, shadcn/ui, and TypeScript.

## About

This project serves as a comprehensive visa consultancy platform allowing users to inquire about various visa types for different countries including Turkey, Germany, Lithuania, Czech Republic, Schengen countries, USA, UK, and Australia.

## Features

- Modern, responsive UI with dark mode support
- Comprehensive visa inquiry forms
- Lead management system
- Professional design with accessibility features
- Multi-country visa information
- Real-time form validation

## Tech Stack

- Next.js 16.1.1
- TypeScript
- Tailwind CSS
- shadcn/ui components
- Prisma ORM
- SQLite (for local development)
- Cloudflare Pages (deployment)

## Local Development

1. Clone the repository
2. Install dependencies:
   ```bash
   bun install
   # or
   npm install
   ```
3. Set up the database:
   ```bash
   npx prisma migrate dev
   ```
4. Run the development server:
   ```bash
   bun dev
   # or
   npm run dev
   ```
5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
DATABASE_URL="file:./db.sqlite" # For local SQLite database
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"

# Email configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
SMTP_FROM=your-email@gmail.com
NOTIFICATION_EMAIL=notifications@yourcompany.com
```

## Deployment to Cloudflare Pages

This project is configured for deployment on Cloudflare Pages. See [DEPLOY_TO_CLOUDFLARE.md](./DEPLOY_TO_CLOUDFLARE.md) for detailed instructions.

### Database Configuration for Cloudflare

For production deployment, you'll need to configure a database. Since Prisma doesn't directly support Cloudflare D1 yet, you have these options:

1. **Use an external database provider** (recommended for now):
   - Neon (PostgreSQL)
   - Supabase (PostgreSQL)
   - PlanetScale (MySQL)

2. **Migrate to Drizzle ORM** for native D1 support:
   - Better integration with Cloudflare ecosystem
   - Native D1 support

See the deployment guide for detailed instructions on setting up your database.

## Project Structure

```
src/
├── app/              # Next.js 13+ app router
├── components/       # Reusable React components
├── lib/              # Utility functions and database logic
├── hooks/            # Custom React hooks
└── styles/           # Global styles
```

## API Routes

The project includes API routes for:
- Lead management (`/api/leads`)
- Health check (`/api/route`)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License.
