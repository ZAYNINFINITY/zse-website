# ZSE Store - Full-Stack E-Commerce Platform

A complete, production-ready e-commerce website for Zain Sanitary & Electric Store, built with Next.js, Express, MongoDB, and Stripe.

## 🚀 Features

- **Dynamic Product Management**: Full CRUD operations for products with categories, search, and filtering
- **Shopping Cart**: Add, remove, and update quantities with persistent storage
- **User Authentication**: JWT-based authentication with signup, login, and profile management
- **Order Management**: Complete order tracking from creation to delivery
- **Payment Integration**: Stripe payment processing with secure checkout
- **Admin Panel**: Full admin interface for managing products and orders
- **SEO Optimized**: Meta tags, sitemap, and clean URLs
- **Mobile Responsive**: Fully responsive design for all devices
- **Error Handling**: Comprehensive error boundaries and loading states

## 📁 Project Structure

```
zse-website/
├── backend/
│   ├── config/
│   │   └── db.js              # MongoDB connection
│   ├── middleware/
│   │   └── auth.js            # JWT authentication middleware
│   ├── models/
│   │   ├── User.js            # User schema
│   │   ├── Product.js         # Product schema
│   │   └── Order.js           # Order schema
│   ├── routes/
│   │   ├── auth.js            # Authentication routes
│   │   ├── products.js        # Product routes
│   │   ├── orders.js          # Order routes
│   │   └── checkout.js        # Stripe checkout routes
│   ├── scripts/
│   │   ├── seedProducts.js    # Seed sample products
│   │   └── createAdmin.js     # Create admin user
│   ├── utils/
│   │   └── generateToken.js  # JWT token generation
│   ├── server.js              # Express server
│   └── package.json
│
├── frontend/
│   ├── app/
│   │   ├── layout.js          # Root layout
│   │   ├── page.js            # Home page
│   │   ├── products/
│   │   │   ├── page.js        # Products listing
│   │   │   └── [id]/page.js   # Product detail
│   │   ├── cart/page.js       # Shopping cart
│   │   ├── checkout/page.js   # Checkout
│   │   ├── login/page.js      # Login/Register
│   │   ├── profile/page.js    # User profile
│   │   ├── orders/
│   │   │   ├── page.js        # Orders list
│   │   │   └── [id]/page.js   # Order detail
│   │   ├── admin/page.js      # Admin panel
│   │   ├── contact/page.js    # Contact page
│   │   ├── sitemap.js         # SEO sitemap
│   │   └── metadata.js        # SEO metadata
│   ├── components/
│   │   ├── Header.js          # Navigation header
│   │   ├── Footer.js          # Footer
│   │   ├── ProductCard.js     # Product card component
│   │   ├── LoadingSpinner.js  # Loading component
│   │   └── ErrorBoundary.js   # Error boundary
│   ├── context/
│   │   ├── AuthContext.js     # Authentication context
│   │   └── CartContext.js     # Cart context
│   ├── lib/
│   │   ├── api.js             # API client
│   │   └── auth.js            # Auth utilities
│   └── package.json
│
└── README.md
```

## 🛠️ Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **React 18** - UI library
- **Tailwind CSS** - Styling
- **Axios** - HTTP client
- **Stripe.js** - Payment processing
- **React Toastify** - Notifications
- **js-cookie** - Cookie management

### Backend
- **Node.js** - Runtime
- **Express** - Web framework
- **MongoDB** - Database (MongoDB Atlas)
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **Stripe** - Payment processing
- **express-validator** - Input validation

## 📦 Installation

### Prerequisites
- Node.js 18+ and npm
- MongoDB Atlas account (or local MongoDB)
- Stripe account

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/zse-store?retryWrites=true&w=majority
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRE=7d
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
FRONTEND_URL=http://localhost:3000
ADMIN_EMAIL=admin@zse.com
ADMIN_PASSWORD=admin123
```

4. Seed database (optional):
```bash
node scripts/seedProducts.js
node scripts/createAdmin.js
```

5. Start server:
```bash
npm run dev
```

Backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env.local` file:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

4. Start development server:
```bash
npm run dev
```

Frontend will run on `http://localhost:3000`

## 🚢 Deployment

### Backend Deployment (Render/Vercel/Heroku)

#### Render
1. Connect your GitHub repository
2. Set build command: `npm install`
3. Set start command: `node server.js`
4. Add all environment variables from `.env`
5. Deploy

#### Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel` in backend directory
3. Add environment variables in Vercel dashboard
4. Deploy

#### Heroku
1. Install Heroku CLI
2. Run:
```bash
heroku create zse-backend
heroku config:set MONGODB_URI=...
heroku config:set JWT_SECRET=...
# Add all other env vars
git push heroku main
```

### Frontend Deployment (Netlify)

1. Connect your GitHub repository to Netlify
2. Set build command: `cd frontend && npm install && npm run build`
3. Set publish directory: `frontend/.next`
4. Add environment variables:
   - `NEXT_PUBLIC_API_URL` - Your backend URL
   - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` - Stripe publishable key
   - `NEXT_PUBLIC_SITE_URL` - Your frontend URL
5. Deploy

### Environment Variables Checklist

#### Backend (.env)
- [ ] `PORT` - Server port (default: 5000)
- [ ] `NODE_ENV` - Environment (development/production)
- [ ] `MONGODB_URI` - MongoDB Atlas connection string
- [ ] `JWT_SECRET` - Secret key for JWT tokens
- [ ] `JWT_EXPIRE` - JWT expiration (default: 7d)
- [ ] `STRIPE_SECRET_KEY` - Stripe secret key
- [ ] `STRIPE_PUBLISHABLE_KEY` - Stripe publishable key
- [ ] `STRIPE_WEBHOOK_SECRET` - Stripe webhook secret
- [ ] `FRONTEND_URL` - Frontend URL for CORS
- [ ] `ADMIN_EMAIL` - Admin user email
- [ ] `ADMIN_PASSWORD` - Admin user password

#### Frontend (.env.local)
- [ ] `NEXT_PUBLIC_API_URL` - Backend API URL
- [ ] `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` - Stripe publishable key
- [ ] `NEXT_PUBLIC_SITE_URL` - Frontend URL for SEO

## 🔐 Default Admin Credentials

After running `createAdmin.js`:
- Email: `admin@zse.com` (or your `ADMIN_EMAIL`)
- Password: `admin123` (or your `ADMIN_PASSWORD`)

**⚠️ Change these in production!**

## 📝 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/profile` - Update user profile

### Products
- `GET /api/products` - Get all products (with filters)
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (Admin)
- `PUT /api/products/:id` - Update product (Admin)
- `DELETE /api/products/:id` - Delete product (Admin)
- `GET /api/products/categories/list` - Get all categories

### Orders
- `POST /api/orders` - Create new order
- `GET /api/orders/myorders` - Get user orders
- `GET /api/orders/:id` - Get single order
- `PUT /api/orders/:id/pay` - Update order payment
- `GET /api/orders` - Get all orders (Admin)
- `PUT /api/orders/:id/deliver` - Update order delivery (Admin)

### Checkout
- `POST /api/checkout/create-payment-intent` - Create Stripe payment intent
- `POST /api/checkout/webhook` - Stripe webhook handler

## ✅ Frontend Verification Checklist

### Pages & Navigation
- [x] Home page loads with featured products
- [x] Products listing page with filters
- [x] Product detail page
- [x] Shopping cart page
- [x] Checkout page with Stripe integration
- [x] Login/Register page
- [x] User profile page
- [x] Orders list page
- [x] Order detail page
- [x] Admin panel
- [x] Contact page
- [x] All navigation links work
- [x] Mobile menu works correctly

### Functionality
- [x] User registration and login
- [x] JWT authentication persists
- [x] Add products to cart
- [x] Update cart quantities
- [x] Remove items from cart
- [x] Cart totals calculate correctly
- [x] Checkout flow completes
- [x] Order creation and tracking
- [x] Admin can create/edit/delete products
- [x] Admin can view all orders
- [x] Search functionality
- [x] Category filtering
- [x] Product sorting

### UI/UX
- [x] Responsive design (mobile, tablet, desktop)
- [x] Loading states on all async operations
- [x] Error handling and messages
- [x] Toast notifications
- [x] Consistent styling
- [x] Accessible forms and buttons
- [x] Proper image alt attributes

### SEO
- [x] Meta tags on all pages
- [x] Sitemap generated
- [x] Robots.txt configured
- [x] Clean URLs
- [x] Proper heading structure

## 🐛 Troubleshooting

### Backend Issues
- **MongoDB connection fails**: Check your `MONGODB_URI` and network access in MongoDB Atlas
- **JWT errors**: Ensure `JWT_SECRET` is set and consistent
- **Stripe errors**: Verify your Stripe keys are correct and in test mode

### Frontend Issues
- **API calls fail**: Check `NEXT_PUBLIC_API_URL` matches your backend URL
- **Stripe not loading**: Verify `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` is set
- **Images not loading**: Ensure image paths are correct and images exist in `public` folder

## 📄 License

This project is for personal/educational use.

## 🤝 Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## 📧 Support

For support, email info@zse.com or visit the contact page.

---

**Built with ❤️ for ZSE Store**
