# Shodh - Research & Collaboration Platform 🔬

A full-stack web platform where researchers can discover groundbreaking research ideas and connect with collaborators who have complementary expertise.

## 🛠 Tech Stack

- **Frontend**: React + Tailwind CSS
- **Backend**: Node.js + Express.js
- **Database**: MongoDB
- **Authentication**: JWT

## 🚀 Quick Start

### Prerequisites

Make sure you have installed:
- [Node.js](https://nodejs.org/) (v16 or higher)
- [MongoDB](https://www.mongodb.com/try/download/community) (or use MongoDB Atlas)
- [Git](https://git-scm.com/)

### Installation & Setup

1. **Clone and install dependencies**
```bash
# Install root dependencies
npm install

# Install all dependencies (root, server, client)
npm run install-all
```

2. **Set up environment variables**
```bash
# Copy the example env file
copy server\.env.example server\.env

# Edit server/.env with your settings:
# PORT=5000
# MONGODB_URI=mongodb://localhost:27017/project-finder
# JWT_SECRET=your_super_secret_jwt_key_here
# NODE_ENV=development
```

3. **Start MongoDB**
```bash
# If using local MongoDB, start the service
# Windows: Start MongoDB service from Services
# Or use MongoDB Compass to connect to local instance
```

4. **Seed sample data (optional)**
```bash
# Add sample research projects to the database
cd server
npm run seed
cd ..
```

5. **Run the application**
```bash
# Start both frontend and backend concurrently
npm run dev
```

This will start:
- Backend server on http://localhost:5000
- Frontend React app on http://localhost:3000

### Alternative: Run separately

```bash
# Terminal 1 - Backend
cd server
npm run dev

# Terminal 2 - Frontend  
cd client
npm start
```

## 📁 Project Structure

```
project-idea-finder/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── context/       # React context
│   │   └── utils/         # Utility functions
│   └── package.json
├── server/                # Express backend
│   ├── models/           # MongoDB models
│   ├── routes/           # API routes
│   ├── middleware/       # Custom middleware
│   └── package.json
└── package.json          # Root package.json
```

## 🌟 Features

- **🔐 User Authentication**: Secure registration and login with JWT
- **👤 Researcher Profiles**: Skills, research interests, and availability
- **🔍 Research Discovery**: Browse and filter research ideas by domain and complexity
- **👥 Team Formation**: Create research teams and find collaborators
- **🎯 Smart Matching**: AI-powered recommendations based on expertise
- **📱 Responsive Design**: Seamless experience across all devices
- **🎨 Modern UI**: Beautiful, intuitive interface with Shodh branding

## 🔧 Development

### Backend API Endpoints

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user
- `PUT /api/users/profile` - Update user profile
- `GET /api/projects` - Get all projects (with filters)
- `POST /api/projects` - Create new project
- `GET /api/teams` - Get all teams
- `POST /api/teams` - Create new team
- `POST /api/teams/:id/join` - Request to join team

### Database Collections

- **Users**: User profiles with skills and interests
- **Projects**: Project ideas with requirements
- **Teams**: Team information with members and roles

## 🚀 Deployment

### Frontend (Vercel)
```bash
cd client
npm run build
# Deploy build folder to Vercel
```

### Backend (Render/Railway)
```bash
# Set environment variables in your hosting platform
# Deploy server folder
```

### Database (MongoDB Atlas)
1. Create MongoDB Atlas account
2. Create cluster and get connection string
3. Update MONGODB_URI in environment variables

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📝 License

This project is licensed under the MIT License.