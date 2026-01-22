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

## Compatibility Flags

For the application to run properly on Cloudflare Pages, you need to set the following compatibility flags in your Cloudflare Pages project settings:

1. Go to Cloudflare Dashboard → Workers & Pages → Your Project
2. Navigate to Settings → Environment Variables & Secrets
3. Under "Compatibility flags", add the following for both Production and Preview environments:
   - `nodejs_compat`

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
4. Add the environment variables and compatibility flags listed above

## Database Setup

This project uses a mock database approach for Cloudflare Pages compatibility. For production use:

### Option 1: Cloudflare D1 (Recommended for Cloudflare Pages)
1. Create a D1 database:
```bash
wrangler d1 create your-database-name
```

2. Update your API routes to use D1 instead of the mock database

### Option 2: External Database Provider
Use a database provider like:
- Neon (PostgreSQL)
- Supabase (PostgreSQL)
- PlanetScale (MySQL)

## Email Setup

The application uses an external service approach for email delivery to maintain compatibility with Edge Runtime. For production:

1. Set up an external email service (SendGrid, Mailgun, etc.)
2. Update the API routes to send form data to your external service
3. Process and send emails from the external service

## Important Notes

- The project uses API routes which require server-side capabilities
- For static export, you'll need to remove API routes or use external services
- Make sure your database connection is properly configured for the production environment
- The email functionality uses an external service approach for Edge Runtime compatibility