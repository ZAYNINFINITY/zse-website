# Local Setup Instructions

Quick start guide for running ZSE Store locally.

## Prerequisites

- Node.js 18+ installed
- npm or yarn
- MongoDB Atlas account (free tier works)
- Stripe account (test mode is fine for development)

## Step 1: Clone Repository

```bash
git clone <your-repo-url>
cd zse-website
```

## Step 2: Backend Setup

1. **Navigate to backend**:
```bash
cd backend
```

2. **Install dependencies**:
```bash
npm install
```

3. **Create `.env` file**:
```bash
cp .env.example .env
```

4. **Edit `.env` with your values**:
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/zse-store?retryWrites=true&w=majority
JWT_SECRET=your-super-secret-jwt-key-change-this
JWT_EXPIRE=7d
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
FRONTEND_URL=http://localhost:3000
ADMIN_EMAIL=admin@zse.com
ADMIN_PASSWORD=admin123
```

5. **Seed database** (optional):
```bash
node scripts/seedProducts.js
node scripts/createAdmin.js
```

6. **Start backend**:
```bash
npm run dev
```

Backend should be running on `http://localhost:5000`

## Step 3: Frontend Setup

1. **Open new terminal and navigate to frontend**:
```bash
cd frontend
```

2. **Install dependencies**:
```bash
npm install
```

3. **Create `.env.local` file**:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

4. **Start frontend**:
```bash
npm run dev
```

Frontend should be running on `http://localhost:3000`

## Step 4: Copy Assets

Copy your existing assets to the frontend public folder:

```bash
# From project root
cp -r assets frontend/public/assets
```

## Step 5: Verify Setup

1. **Backend Health Check**:
   - Visit: `http://localhost:5000/api/health`
   - Should return: `{"success":true,"message":"Server is running"}`

2. **Frontend**:
   - Visit: `http://localhost:3000`
   - Should see the homepage

3. **Test Login**:
   - Go to `/login`
   - Register a new account or use admin credentials
   - Admin: `admin@zse.com` / `admin123`

## Common Issues

### MongoDB Connection Error
- Verify your MongoDB Atlas connection string
- Check network access in MongoDB Atlas (add `0.0.0.0/0` for development)
- Ensure username and password are correct

### Port Already in Use
- Backend: Change `PORT` in `.env`
- Frontend: Use `npm run dev -- -p 3001` for different port

### Stripe Errors
- Use test keys from Stripe dashboard
- Ensure keys start with `sk_test_` and `pk_test_`

### Images Not Loading
- Ensure assets are in `frontend/public/assets`
- Check image paths in product data

## Next Steps

- Create products via admin panel
- Test checkout flow
- Customize styling
- Add more products

---

**Happy Coding! 🚀**


