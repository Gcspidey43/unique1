# Deploy to Cloudflare Pages

This project is configured for deployment on Cloudflare Pages. Follow these steps to deploy:

## Prerequisites

1. Install Wrangler CLI:
```bash
npm install -g wrangler
```

2. Log in to Cloudflare:
```bash
wrangler login
```

## Environment Variables

Set these environment variables in your Cloudflare Pages project:

### Required Variables
- `DATABASE_URL` - Database connection string (for SQLite: `file:./db.sqlite` or for PostgreSQL: `postgresql://username:password@host:port/database`)
- `SMTP_HOST` - SMTP server host (e.g., smtp.gmail.com)
- `SMTP_PORT` - SMTP server port (e.g., 587)
- `SMTP_USER` - SMTP username
- `SMTP_PASSWORD` - SMTP password or app password
- `SMTP_FROM` - Email address to send from
- `NOTIFICATION_EMAIL` - Email address to receive notifications

### Optional Variables
- `SMTP_SECURE` - Set to "true" for SSL connections
- `NEXT_PUBLIC_SITE_URL` - Your deployed site URL

## Deployment

### Option 1: Using Wrangler
```bash
# Build the project
npm run build

# Deploy to Cloudflare Pages
wrangler pages deploy
```

### Option 2: Using Git Integration (Recommended)
1. Push your code to a Git repository
2. Connect your repository to Cloudflare Pages
3. Set the build configuration:
   - Build command: `npm run build`
   - Build output directory: `.vercel/output/static` (or `out` depending on your next.config.js)
   - Environment: `Next.js`
4. Add the environment variables listed above

## Database Setup

This project uses Prisma ORM. For Cloudflare Pages, you have several options:

### Option 1: Cloudflare D1 (Recommended for Cloudflare Pages)
1. Create a D1 database:
```bash
wrangler d1 create your-database-name
```

2. Update your schema.prisma to use PostgreSQL or MySQL if you're using a different provider

### Option 2: External Database Provider
Use a database provider like:
- Neon (PostgreSQL)
- Supabase (PostgreSQL)
- PlanetScale (MySQL)

## Important Notes

- The project uses API routes which require server-side capabilities
- For static export, you'll need to remove API routes or use external services
- Make sure your database connection is properly configured for the production environment
- The email functionality requires proper SMTP configuration