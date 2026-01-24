# Deployment Guide

Complete step-by-step guide for deploying ZSE Store to production.

## Table of Contents
1. [Backend Deployment](#backend-deployment)
2. [Frontend Deployment](#frontend-deployment)
3. [Environment Variables](#environment-variables)
4. [Post-Deployment Checklist](#post-deployment-checklist)

## Backend Deployment

### Option 1: Render (Recommended)

1. **Create Account**: Sign up at [render.com](https://render.com)

2. **Create New Web Service**:
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Select the repository

3. **Configure Service**:
   - **Name**: `zse-backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
   - **Root Directory**: `backend`

4. **Add Environment Variables** (see Environment Variables section)

5. **Deploy**: Click "Create Web Service"

6. **Get Backend URL**: Note your service URL (e.g., `https://zse-backend.onrender.com`)

### Option 2: Vercel

1. **Install Vercel CLI**:
```bash
npm i -g vercel
```

2. **Deploy**:
```bash
cd backend
vercel
```

3. **Add Environment Variables** in Vercel dashboard

4. **Update Start Command**: In Vercel dashboard, set start command to `node server.js`

### Option 3: Heroku

1. **Install Heroku CLI**:
```bash
# macOS
brew tap heroku/brew && brew install heroku

# Windows
# Download from https://devcenter.heroku.com/articles/heroku-cli
```

2. **Login**:
```bash
heroku login
```

3. **Create App**:
```bash
cd backend
heroku create zse-backend
```

4. **Set Environment Variables**:
```bash
heroku config:set MONGODB_URI=your_mongodb_uri
heroku config:set JWT_SECRET=your_jwt_secret
heroku config:set STRIPE_SECRET_KEY=your_stripe_secret
# ... add all other variables
```

5. **Deploy**:
```bash
git push heroku main
```

## Frontend Deployment

### Netlify (Recommended)

1. **Create Account**: Sign up at [netlify.com](https://netlify.com)

2. **New Site from Git**:
   - Click "Add new site" → "Import an existing project"
   - Connect to GitHub
   - Select your repository

3. **Build Settings**:
   - **Base directory**: `frontend`
   - **Build command**: `npm install && npm run build`
   - **Publish directory**: `frontend/.next`

4. **Environment Variables**:
   - `NEXT_PUBLIC_API_URL`: Your backend URL (e.g., `https://zse-backend.onrender.com/api`)
   - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`: Your Stripe publishable key
   - `NEXT_PUBLIC_SITE_URL`: Your frontend URL (e.g., `https://zsestore.netlify.app`)

5. **Deploy**: Click "Deploy site"

6. **Custom Domain** (Optional):
   - Go to Site settings → Domain management
   - Add your custom domain

### Vercel (Alternative)

1. **Install Vercel CLI**:
```bash
npm i -g vercel
```

2. **Deploy**:
```bash
cd frontend
vercel
```

3. **Add Environment Variables** in Vercel dashboard

## Environment Variables

### Backend Environment Variables

Create these in your hosting platform's environment variables section:

```env
# Server
PORT=5000
NODE_ENV=production

# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/zse-store?retryWrites=true&w=majority

# JWT
JWT_SECRET=your-super-secret-jwt-key-minimum-32-characters
JWT_EXPIRE=7d

# Stripe
STRIPE_SECRET_KEY=sk_live_your_stripe_secret_key
STRIPE_PUBLISHABLE_KEY=pk_live_your_stripe_publishable_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret

# CORS
FRONTEND_URL=https://zsestore.netlify.app

# Admin
ADMIN_EMAIL=admin@zse.com
ADMIN_PASSWORD=your_secure_admin_password
```

### Frontend Environment Variables

```env
NEXT_PUBLIC_API_URL=https://zse-backend.onrender.com/api
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_your_stripe_publishable_key
NEXT_PUBLIC_SITE_URL=https://zsestore.netlify.app
```

## Stripe Webhook Setup

1. **Create Webhook**:
   - Go to Stripe Dashboard → Developers → Webhooks
   - Click "Add endpoint"
   - Enter your backend webhook URL: `https://your-backend-url.com/api/checkout/webhook`
   - Select events: `payment_intent.succeeded`
   - Copy the webhook signing secret

2. **Add to Backend**:
   - Set `STRIPE_WEBHOOK_SECRET` in your backend environment variables

## MongoDB Atlas Setup

1. **Create Cluster**:
   - Sign up at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
   - Create a free cluster

2. **Database Access**:
   - Create a database user
   - Note username and password

3. **Network Access**:
   - Add IP address: `0.0.0.0/0` (allow all IPs for production)
   - Or add specific IPs for security

4. **Get Connection String**:
   - Click "Connect" → "Connect your application"
   - Copy connection string
   - Replace `<password>` with your database password
   - Use this as `MONGODB_URI`

## Post-Deployment Checklist

### Backend
- [ ] Backend is accessible at your URL
- [ ] Health check endpoint works: `GET /api/health`
- [ ] MongoDB connection is successful
- [ ] Admin user created (run `createAdmin.js` script)
- [ ] Stripe webhook is configured
- [ ] CORS allows frontend domain
- [ ] Environment variables are set correctly

### Frontend
- [ ] Frontend is accessible at your URL
- [ ] API calls work (check browser console)
- [ ] Stripe payment form loads
- [ ] Images load correctly
- [ ] All pages are accessible
- [ ] Mobile responsive design works
- [ ] SEO meta tags are present

### Testing
- [ ] User registration works
- [ ] User login works
- [ ] Products load from database
- [ ] Add to cart works
- [ ] Checkout flow completes
- [ ] Payment processing works
- [ ] Order creation works
- [ ] Admin panel accessible
- [ ] Admin can create/edit products

### Security
- [ ] JWT_SECRET is strong and unique
- [ ] Admin password is changed from default
- [ ] MongoDB user has limited permissions
- [ ] Stripe keys are production keys (not test)
- [ ] HTTPS is enabled
- [ ] CORS is configured correctly

## Troubleshooting

### Backend won't start
- Check environment variables are set
- Verify MongoDB connection string
- Check server logs for errors
- Ensure PORT is not already in use

### Frontend build fails
- Check Node.js version (18+)
- Verify all dependencies are installed
- Check for TypeScript errors
- Verify environment variables are set

### API calls fail
- Verify `NEXT_PUBLIC_API_URL` is correct
- Check CORS settings in backend
- Verify backend is running
- Check browser console for errors

### Stripe not working
- Verify Stripe keys are correct
- Check webhook is configured
- Ensure using production keys in production
- Check Stripe dashboard for errors

### Images not loading
- Verify image paths are correct
- Check images exist in `public` folder
- Verify Next.js image configuration
- Check network tab for 404 errors

## Support

If you encounter issues:
1. Check server logs
2. Check browser console
3. Verify all environment variables
4. Test API endpoints directly
5. Check hosting platform status

---

**Last Updated**: 2024


