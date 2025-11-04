# 🔬 Shodh - Research & Collaboration Platform

> **Shodh** (Sanskrit: शोध, meaning "research") is a modern full-stack web platform that empowers researchers to discover groundbreaking project ideas, form collaborative teams, and advance scientific innovation together.

[![React](https://img.shields.io/badge/React-18.2.0-blue.svg)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-Latest-green.svg)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Latest-brightgreen.svg)](https://mongodb.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.3.6-38B2AC.svg)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## 🌟 **Features**

### 🔍 **Research Discovery**
- **Intelligent Idea Finder** - AI-powered research idea generation
- **Curated Project Database** - Hand-picked, high-quality research opportunities
- **Advanced Filtering** - Search by domain, difficulty, skills, and keywords
- **Personalized Recommendations** - Smart matching based on user expertise

### 👥 **Team Collaboration**
- **Team Formation** - Create and join research teams seamlessly
- **Skill-based Matching** - Find collaborators with complementary expertise
- **Role Management** - Define and fill specific team roles
- **Join Requests** - Streamlined team joining process

### 👤 **Researcher Profiles**
- **Comprehensive Profiles** - Skills, interests, availability, and social links
- **Portfolio Integration** - GitHub and LinkedIn connectivity
- **Research Tracking** - Saved projects and team memberships
- **Availability Status** - Real-time collaboration availability

### 🎯 **Smart Features**
- **Project Creation** - Propose new research ideas with detailed specifications
- **Recommendation Engine** - ML-powered project and team suggestions
- **Responsive Design** - Seamless experience across all devices
- **Modern UI/UX** - Beautiful, intuitive interface with smooth animations

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

## 📸 **Screenshots**

### Landing Page
![Landing Page](https://via.placeholder.com/800x400/0ea5e9/ffffff?text=Shodh+Landing+Page)

### Research Ideas Discovery
![Research Ideas](https://via.placeholder.com/800x400/d946ef/ffffff?text=Research+Ideas+Discovery)

### Team Formation
![Team Formation](https://via.placeholder.com/800x400/0ea5e9/ffffff?text=Team+Formation)

## 🔧 **Development**

### **API Endpoints**

#### Authentication
- `POST /api/auth/register` - User registration with validation
- `POST /api/auth/login` - User authentication with JWT
- `GET /api/auth/me` - Get current authenticated user

#### Users
- `PUT /api/users/profile` - Update user profile and preferences
- `GET /api/users` - Get users with filtering options
- `GET /api/users/recommendations/projects` - Get personalized project recommendations

#### Projects
- `GET /api/projects` - Get projects with advanced filtering and search
- `POST /api/projects` - Create new research project (authenticated)
- `GET /api/projects/:id` - Get detailed project information
- `POST /api/projects/:id/save` - Save/unsave project to user profile

#### Teams
- `GET /api/teams` - Get teams with filtering options
- `POST /api/teams` - Create new research team (authenticated)
- `POST /api/teams/:id/join` - Request to join team
- `POST /api/teams/:id/requests/:requestId/:action` - Accept/reject join requests

### **Database Schema**

#### Users Collection
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  skills: [String],
  interests: [String],
  availability: Boolean,
  github: String,
  linkedin: String,
  savedProjects: [ObjectId],
  teams: [ObjectId]
}
```

#### Projects Collection
```javascript
{
  title: String,
  description: String,
  domain: String (enum),
  difficulty: String (enum),
  skillsRequired: [String],
  estimatedDuration: String,
  tags: [String],
  createdBy: ObjectId
}
```

#### Teams Collection
```javascript
{
  teamName: String,
  project: ObjectId,
  description: String,
  members: [{user: ObjectId, role: String}],
  rolesNeeded: [{role: String, skills: [String]}],
  maxMembers: Number,
  status: String,
  joinRequests: [{user: ObjectId, message: String}]
}
```

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

## 🤝 **Contributing**

We welcome contributions to Shodh! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Commit your changes** (`git commit -m 'Add amazing feature'`)
4. **Push to the branch** (`git push origin feature/amazing-feature`)
5. **Open a Pull Request**

### **Development Guidelines**
- Follow the existing code style and conventions
- Write clear, descriptive commit messages
- Add comments for complex logic
- Test your changes thoroughly
- Update documentation as needed

## 🐛 **Bug Reports & Feature Requests**

Found a bug or have a feature idea? Please open an issue on GitHub with:
- Clear description of the issue/feature
- Steps to reproduce (for bugs)
- Expected vs actual behavior
- Screenshots if applicable

## 📄 **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 **Acknowledgments**

- **React Team** - For the amazing React framework
- **Tailwind CSS** - For the utility-first CSS framework
- **MongoDB** - For the flexible NoSQL database
- **Express.js** - For the fast, minimalist web framework
- **Open Source Community** - For inspiration and resources

## 📞 **Contact**

- **Project Repository**: [GitHub](https://github.com/yourusername/shodh)
- **Issues**: [GitHub Issues](https://github.com/yourusername/shodh/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/shodh/discussions)

---

<div align="center">
  <strong>Built with ❤️ for the research community</strong>
  <br>
  <em>Empowering researchers to collaborate and innovate together</em>
</div>