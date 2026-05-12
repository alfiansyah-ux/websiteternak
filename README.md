# AdnanFarm - Smart Farm Management

A full-stack web application for managing livestock operations digitally with production tracking and marketplace connectivity.

## Tech Stack

- **Frontend**: React + Vite, Tailwind CSS
- **Backend**: Node.js + Express
- **Database**: SQLite (development) / PostgreSQL (production)
- **Authentication**: JWT

## Project Structure

```
├── frontend/          # React frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── hooks/
│   │   ├── utils/
│   │   └── assets/
│   ├── public/
│   └── package.json
├── backend/           # Node.js backend
│   ├── src/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── utils/
│   │   └── index.js
│   ├── prisma/
│   └── package.json
└── package.json       # Root package.json
```

## Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd adnanfarm
   ```

2. **Install dependencies**
   ```bash
   npm run install:all
   ```

3. **Database Setup**
   - For development (SQLite): Database is automatically created
   - For production (PostgreSQL): Update `backend/.env` with your database credentials
   - Run database migrations:
     ```bash
     npm run db:migrate
     ```

4. **Start development servers**
   ```bash
   npm run dev
   ```

   This will start both frontend (http://localhost:3000) and backend (http://localhost:5000)

## Available Scripts

- `npm run dev` - Start both frontend and backend in development mode
- `npm run build` - Build the frontend for production
- `npm run start` - Start the backend server
- `npm run db:generate` - Generate Prisma client
- `npm run db:migrate` - Run database migrations
- `npm run db:studio` - Open Prisma Studio

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user

### Users
- `GET /api/users/profile` - Get current user profile (authenticated)
- `GET /api/users/all` - Get all users (admin only)

## Environment Variables

### Backend (.env)
```
PORT=5000
DATABASE_URL="file:./dev.db"  # SQLite for development
JWT_SECRET=your_super_secret_jwt_key_here
NODE_ENV=development
```

### Frontend (.env)
```
VITE_API_BASE_URL=http://localhost:5000/api
```

## Authentication Features

### User Registration
- Email validation
- Password hashing with bcrypt
- Role-based registration (Customer, Farmer)
- Duplicate email prevention

### User Login
- JWT token generation
- Password verification
- Token-based authentication

### Role-Based Access Control
- **ADMIN**: Full system access, user management
- **FARMER**: Livestock management, production tracking, financial management
- **CUSTOMER**: Product marketplace, order management

### Protected Routes
- Frontend routes protected with React Router
- Backend routes protected with JWT middleware
- Automatic token refresh and logout on expiration

## Database Schema

The application uses Prisma ORM with the following main entities:

- **Users**: Authentication and role management
- **Livestock**: Animal tracking and health records
- **Production**: Milk and livestock production logging
- **Expenses**: Financial expense tracking
- **Products**: Marketplace products
- **Orders**: Customer order management
- **Notifications**: User notifications

## Features (Planned)

- User authentication and authorization
- Livestock management
- Production tracking
- Expense management
- Product marketplace
- AI-powered insights
- Real-time notifications

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## License

ISC