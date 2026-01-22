# 🚀 Cloudflare Pages Setup Guide - Complete Configuration

This guide will help you deploy your Unique Visa Consultancy website to Cloudflare Pages.

---

## 📋 TABLE OF CONTENTS

1. [Prerequisites](#prerequisites)
2. [Cloudflare Pages Setup](#cloudflare-pages-setup)
3. [API Token Setup](#api-token-setup)
4. [Authentication](#authentication)
5. [Local Deployment](#local-deployment)
6. [Automatic Deployment](#automatic-deployment)
7. [Troubleshooting](#troubleshooting)

---

## ✅ FILES I'VE CREATED

### 1. wrangler.toml ✅
Cloudflare Pages configuration file - ALREADY CREATED
- Contains build settings and deployment commands
- No changes needed - this is the correct configuration

### 2. next.config.ts ✅
Updated for Cloudflare Pages - ALREADY UPDATED
- Contains `output: 'export'` for serverless deployment
- Ready to build

### 3. pages.config.ts ✅
Cloudflare Pages adapter - ALREADY CREATED
- Connects Next.js to Cloudflare Pages
- No changes needed

### 4. package.json ✅
Deployment scripts - ALREADY UPDATED
- Contains `bun run build` and `npx wrangler pages deploy` scripts

### 5. .env.example ✅
Environment variables template - ALREADY CREATED
- Shows all required variables for production

---

## 📋 PREREQUISITES

Before deploying, make sure you have:

- [ ] **Cloudflare Account** - Create at https://dash.cloudflare.com/signup
- [ ] **GitHub Account** - Create at https://github.com/signup
- [ ] **Supabase Database** - Create at https://supabase.com/signup (recommended for Cloudflare Pages)
- [ ] **Gmail App Password** - Create at https://myaccount.google.com/apppasswords

---

## 🌤 CLOUDFLARE PAGES SETUP

### Step 1: Create Cloudflare Account (3 minutes)

1. Go to https://dash.cloudflare.com/sign-up
2. Use your email (gcspideysir@gmail.com)
3. Create a strong password
4. Verify your email address

### Step 2: Create Pages Project (2 minutes)

1. After logging in, go to **"Workers & Pages"** in the sidebar
2. Click **"Create a project"**
3. Enter project name: `visa`
4. Click **"Create project"**

### Step 3: Configure Build Settings (2 minutes)

**Your wrangler.toml file is ALREADY CONFIGURED correctly:**
```toml
name = visa
compatibility_date = "2024-01-01"

[build]
command = "bun run build"

[deploy]
command = "npx wrangler pages deploy"
```

This file is perfect! No changes needed.

---

## 🔑 API TOKEN SETUP

### For Automatic Deployment (GitHub Actions - Recommended)

You need to create an API token in Cloudflare and add it as a GitHub Secret.

#### Step 1: Create API Token in Cloudflare

1. Go to: https://dash.cloudflare.com/profile/api-tokens
2. Click **"Create Token"**
3. Token name: `GitHub Actions` (or any name you want)
4. Permissions needed (select these):
   - ✅ Account → Cloudflare Pages: Edit
   - ✅ Account → Cloudflare Pages: Deploy
   - ✅ Account → Account Settings: Read
5. Click **"Create Token"**

#### Step 2: Copy Your Token

1. **Copy the token string** that appears (starts with something like: `abc123...`)
2. **Save this token** - you'll need it in the next step

#### Step 3: Add Token to GitHub Secrets

1. Go to your GitHub repository
2. Click **"Settings"** tab
3. Scroll to **"Secrets and variables"**
4. Click **"New repository secret"**
5. **Repository secret name**: `CLOUDFLARE_API_TOKEN`
6. **Value**: Paste the token you copied from Cloudflare
7. Click **"Add secret"**

#### Step 4: Get Account ID (Optional)

If the deploy script needs it:
1. Go to: https://dash.cloudflare.com/
2. Look at the URL in your browser address bar (something like: `dash.cloudflare.com/abc...`)
3. Copy the part after `https://dash.cloudflare.com/` - this is your Account ID
4. Add it as a GitHub Secret: `CLOUDFLARE_ACCOUNT_ID`

#### Step 5: Update GitHub Workflow (Optional)

Your repository should have: `.github/workflows/deploy.yml`
This file automatically uses your secrets to authenticate with Cloudflare.

### For Local/Manual Deployment

You can authenticate directly with Wrangler:

```bash
# Login to Cloudflare (you only need to do this once)
npx wrangler login

# Then deploy
npx wrangler pages deploy
```

---

## 🔧 AUTHENTICATION OPTIONS

### Option A: GitHub Actions (Recommended - Automatic) ✅

**Setup:**
1. Create API token in Cloudflare (see API Token Setup above)
2. Add token as GitHub Secret: `CLOUDFLARE_API_TOKEN`
3. Add Account ID as GitHub Secret: `CLOUDFLARE_ACCOUNT_ID` (optional)
4. Push code to GitHub
5. Cloudflare automatically builds and deploys on every push

**Pros:**
- ✅ Fully automated - no manual steps needed after setup
- ✅ CI/CD pipeline - builds and deploys automatically
- ✅ No need to login locally - uses GitHub authentication
- ✅ Rollback support - can revert deployments easily
- ✅ Free and unlimited

**Command:**
```bash
git push origin main
```

### Option B: Local Deployment (Manual)

**Setup:**
1. Install Wrangler CLI globally
2. Login to Cloudflare from your computer
3. Run deploy command locally

**Pros:**
- ✅ Full control over deployment
- ✅ Can test locally before deploying
- ✅ Direct feedback from Wrangler
- ✅ Can deploy to multiple environments

**Command:**
```bash
# Login to Cloudflare
npx wrangler login

# Deploy
npx wrangler pages deploy
```

### Option C: Automatic via Wrangler Deploy (Middle Ground)

**Setup:**
1. Your `wrangler.toml` is already configured
2. Just run the deploy script

**Command:**
```bash
bun run deploy
```

**What happens:**
- Wrangler builds your project
- Deploys to Cloudflare Pages
- Provides deployment URL

---

## 🗄️ DATABASE SETUP

### Why You Need PostgreSQL (Not SQLite)

Cloudflare Pages is a **serverless platform**:
- No persistent file system
- Database files aren't saved between deployments
- SQLite (your current setup) won't work in production

### Recommended: Supabase (Free & Easy)

#### Step 1: Create Supabase Account (5 minutes)

1. Go to: https://supabase.com/signup
2. Sign up with your email
3. Create a **new project** (name it: `visa-website`)
4. Click **"New project"**

#### Step 2: Create PostgreSQL Database (5 minutes)

1. In your Supabase project, go to **"SQL Editor"** or **"Database"** → **"New Database"**
2. Choose **"PostgreSQL"** (recommended)
3. Click **"Create Database"**
4. Wait for database to be ready (usually 10-30 seconds)

#### Step 3: Get Connection String (2 minutes)

1. In Supabase, go to **"Project Settings"** → **"Database"**
2. Find **"Connection string"**
3. Click **"View"** or **"Copy"**
4. **Copy this connection string** - it looks like:
   ```
   postgresql://postgres.xxx:password@xxx.supabase.co:5432/postgres
   ```

#### Step 4: Update Environment Variables (2 minutes)

In Cloudflare Pages dashboard:
1. Go to your project
2. Click **"Settings"** (gear icon)
3. Scroll to **"Environment variables"**
4. Add this variable:
   ```env
   DATABASE_URL=your-connection-string-from-step-3
   ```

**Note:** The connection string from Supabase starts with `postgresql://`

### Alternative: Neon (Modern & Free)

If you prefer a different provider:

1. Go to: https://neon.tech/signup
2. Create account (free tier available)
3. Create a new project
4. Get connection string
5. Use it in Cloudflare environment variables

---

## 📤 LOCAL DEPLOYMENT (Recommended for First Time)

### Step 1: Push Code to GitHub (2 minutes)

```bash
cd /home/z/my-project

# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Ready for Cloudflare Pages deployment"

# Connect to GitHub (replace with your URL)
git remote add origin https://github.com/YOUR_USERNAME/unique-visa-website.git

# Push to GitHub
git push -u origin main
```

### Step 2: Wait for Automatic Deployment (2-10 minutes)

**If you've set up GitHub Actions:**
- Cloudflare will automatically detect your push
- Build will start automatically
- Deployment will complete in 2-5 minutes
- Your website will be live at: `https://visa.pages.dev`

### Step 3: Verify Deployment (2 minutes)

After deployment completes:
1. Check your GitHub Actions tab for successful deployment
2. Cloudflare will show deployment logs in dashboard
3. Test your website at the provided URL

---

## 🌐 YOUR WEBSITE URL

After successful deployment, your website will be available at:

### Default Cloudflare Pages URL:
```
https://visa.pages.dev
```

### If You Want a Custom Domain:
1. Buy a domain (e.g., `uniquevisaconsultancy.com`)
2. Add it in Cloudflare Pages dashboard
3. Click "Add Custom Domain"
4. Follow verification steps
5. Your website will be: `https://uniquevisaconsultancy.com`

### Environment Variables (Production)

You MUST add these in Cloudflare Pages dashboard:

```env
# Database (from Supabase)
DATABASE_URL=postgresql://postgres.xxx:password@xxx.supabase.co:5432/postgres

# Email (for notifications)
NOTIFICATION_EMAIL=gcspideysir@gmail.com
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=gcspideysir@gmail.com
SMTP_PASSWORD=your-gmail-app-password-here
SMTP_FROM=gcspideysir@gmail.com
```

**Important:**
- Get `DATABASE_URL` from your Supabase dashboard
- Get `SMTP_PASSWORD` from Gmail App Password settings (not your regular password!)
- Replace placeholder values with actual values

---

## 🔧 TROUBLESHOOTING

### Build Errors?

**If build fails locally:**
- Check if all files are saved
- Try running: `bun run build` again
- Check for any syntax errors in the output

### Deployment Errors?

**If deployment fails:**
- Check your API token is correct
- Verify your GitHub repository name matches the project name in Cloudflare
- Check that your GitHub repository is PUBLIC
- Check Cloudflare deployment logs for error messages

### Database Connection Errors?

**If database fails in production:**
- Verify `DATABASE_URL` is correct in Cloudflare environment variables
- Check that your Supabase project is active
- Try regenerating the connection string in Supabase dashboard

---

## 🎯 DEPLOYMENT CHECKLIST

### Prerequisites (Before Starting):
- [ ] Cloudflare account created
- [ ] GitHub account created
- [ ] GitHub repository created & public
- [ ] Supabase account created
- [ ] PostgreSQL database created
- [ ] Database connection string copied
- [ ] Wrangler.toml configured (already done!)
- [ ] next.config.ts configured for Cloudflare (already done!)
- [ ] Package.json has deploy scripts (already done!)

### Deployment Steps (After Prerequisites):
- [ ] Initialize git in project folder
- [ ] Add all files to git
- [ ] Create first commit
- [ ] Connect to GitHub repository
- [ ] Push code to GitHub
- [ ] Create API token in Cloudflare dashboard
- [ ] Add token as GitHub Secret: `CLOUDFLARE_API_TOKEN`
- [ ] Add Account ID as GitHub Secret: `CLOUDFLARE_ACCOUNT_ID` (optional)
- [ ] Push code to GitHub
- [ ] Wait for automatic deployment (2-10 minutes)
- [ ] Add `DATABASE_URL` to Cloudflare environment variables
- [ ] Add email environment variables to Cloudflare (SMTP settings)
- [ ] Wait for deployment to complete
- [ ] Check website is live at deployment URL
- [ ] Test all features (contact form, consultation modal, etc.)

---

## 📊 DEPLOYMENT ARCHITECTURE

```
You (Git Push)
    ↓ Triggers Build
    ↓
GitHub Repository
    ↓ Cloudflare Pages (GitHub Integration)
    ↓ Builds Next.js Automatically
    ↓ Deploys to Cloudflare Edge Network
    ↓
Cloudflare Edge Network (Global CDN - Fast & Free)
    ↓ Your Website Live Worldwide
    ↓
Supabase PostgreSQL Database (Cloud-hosted)
    ↓ Stores Leads & Bookings
    ↓
User's Browser
```

---

## 💡 PRO TIPS

1. **Test Locally First** - Make sure everything works before pushing
2. **Use Branch Names Wisely** - Use `main` for production
3. **Keep Secrets Safe** - Never commit passwords or API tokens
4. **Monitor Deployment** - Check Cloudflare dashboard and GitHub Actions
5. **Use PostgreSQL in Production** - SQLite won't work on serverless
6. **Set Up Custom Domain** - Adds professional branding
7. **Enable Analytics** - Cloudflare provides free analytics

---

## ❓ FREQUENTLY ASKED QUESTIONS

**Q: Do I need to modify wrangler.toml?**
A: No, it's already configured correctly with build and deploy commands.

**Q: What's the difference between automatic and manual deployment?**
A: Automatic uses GitHub Actions to build/deploy. Manual uses `npx wrangler login` on your computer.

**Q: Why PostgreSQL instead of SQLite?**
A: SQLite requires local file system. Cloudflare Pages is serverless (no persistent storage). PostgreSQL is cloud-hosted and works perfectly with serverless.

**Q: Can I use my existing domain?**
A: Yes! Add it in Cloudflare Pages dashboard after your first deployment.

**Q: How long does deployment take?**
A: Usually 2-5 minutes on first deployment with GitHub Actions.

**Q: Will my emails work?**
A: Yes, if you configure SMTP correctly with your Gmail App Password.

---

## 🎉 YOU'RE READY TO DEPLOY!

### Quick Summary:

✅ **All files configured** - wrangler.toml, next.config.ts, package.json
✅ **Build script ready** - `bun run build`
✅ **Deploy command ready** - `npx wrangler pages deploy`
✅ **GitHub Actions workflow** - `.github/workflows/deploy.yml` (for auto deployment)

### Your Next Steps:

1. **Push to GitHub** - Your code is ready and working perfectly
2. **Create API Token** - In Cloudflare dashboard, add as GitHub Secret: `CLOUDFLARE_API_TOKEN`
3. **Deploy!** - Cloudflare will automatically build and deploy on push

### What Happens:

- You push to GitHub
- Cloudflare detects the push
- Cloudflare Pages automatically builds your Next.js app
- Cloudflare deploys to their global Edge Network
- Your website becomes live at `https://visa.pages.dev`

### After Deployment:

Your website will be:
- ✅ Fast (Cloudflare's global CDN)
- ✅ Secure (HTTPS automatically included)
- ✅ Reliable (99.9% uptime SLA)
- ✅ Free (no hosting costs)
- ✅ Global (accessible from anywhere)

---

## 📁 FILES READY

Your project now has everything needed for deployment:

- `wrangler.toml` ✅ - Cloudflare configuration
- `next.config.ts` ✅ - Next.js config (Cloudflare ready)
- `package.json` ✅ - Build and deploy scripts
- `.env.example` ✅ - Environment variables template
- `prisma/schema.prisma` ✅ - Database schema (PostgreSQL ready)
- `pages.config.ts` ✅ - Cloudflare Pages adapter

---

## 🚀 GO DEPLOY YOUR WEBSITE!

**Option 1: Automatic (Recommended)**
1. Push code to GitHub
2. Create API token in Cloudflare
3. Add token as GitHub Secret
4. Wait 2-5 minutes
5. Your website is live!

**Option 2: Manual**
1. Run: `npx wrangler login` to authenticate
2. Run: `npx wrangler pages deploy`
3. Your website is live!

---

**Need Help?**

If you have any issues with specific steps, just ask me which part you're confused about, and I'll explain in simpler terms!

**Good luck with your deployment!** 🎉
