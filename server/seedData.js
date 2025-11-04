const mongoose = require('mongoose');
const Project = require('./models/Project');
require('dotenv').config();

const sampleProjects = [
  {
    title: "Quantum Machine Learning Algorithms",
    description: "Develop quantum algorithms that can enhance machine learning capabilities, focusing on quantum neural networks and their applications in pattern recognition and optimization problems.",
    domain: "AI",
    difficulty: "Advanced",
    skillsRequired: ["Python", "Quantum Computing", "Machine Learning", "Linear Algebra", "TensorFlow"],
    estimatedDuration: "6-8 months",
    tags: ["quantum", "ml", "algorithms", "research"]
  },
  {
    title: "Sustainable Urban Energy Management System",
    description: "Create an IoT-based system for monitoring and optimizing energy consumption in smart cities, integrating renewable energy sources and predictive analytics.",
    domain: "IoT",
    difficulty: "Intermediate",
    skillsRequired: ["IoT", "Python", "Data Analysis", "Arduino", "Cloud Computing"],
    estimatedDuration: "4-6 months",
    tags: ["sustainability", "smart-city", "energy", "iot"]
  },
  {
    title: "Personalized Medicine through Genomic Analysis",
    description: "Develop AI models to analyze genomic data for personalized treatment recommendations, focusing on cancer research and drug response prediction.",
    domain: "Data Science",
    difficulty: "Advanced",
    skillsRequired: ["Bioinformatics", "Python", "R", "Machine Learning", "Statistics"],
    estimatedDuration: "8-12 months",
    tags: ["genomics", "healthcare", "ai", "personalized-medicine"]
  },
  {
    title: "Climate Change Impact Prediction Model",
    description: "Build predictive models to assess climate change impacts on agricultural productivity using satellite data and weather patterns.",
    domain: "Data Science",
    difficulty: "Intermediate",
    skillsRequired: ["Python", "GIS", "Machine Learning", "Statistics", "Remote Sensing"],
    estimatedDuration: "5-7 months",
    tags: ["climate", "agriculture", "prediction", "satellite-data"]
  },
  {
    title: "Brain-Computer Interface for Assistive Technology",
    description: "Develop a non-invasive BCI system to help paralyzed patients control devices using brain signals, focusing on signal processing and machine learning.",
    domain: "AI",
    difficulty: "Advanced",
    skillsRequired: ["Signal Processing", "Python", "Machine Learning", "Neuroscience", "Hardware"],
    estimatedDuration: "10-12 months",
    tags: ["bci", "assistive-tech", "neuroscience", "signal-processing"]
  },
  {
    title: "Blockchain-based Supply Chain Transparency",
    description: "Create a blockchain solution for tracking products from origin to consumer, ensuring transparency and authenticity in supply chains.",
    domain: "Blockchain",
    difficulty: "Intermediate",
    skillsRequired: ["Blockchain", "Solidity", "Web3", "JavaScript", "Smart Contracts"],
    estimatedDuration: "4-5 months",
    tags: ["blockchain", "supply-chain", "transparency", "smart-contracts"]
  },
  {
    title: "Social Media Misinformation Detection",
    description: "Develop NLP models to automatically detect and classify misinformation on social media platforms using deep learning techniques.",
    domain: "AI",
    difficulty: "Intermediate",
    skillsRequired: ["NLP", "Python", "Deep Learning", "TensorFlow", "Data Mining"],
    estimatedDuration: "4-6 months",
    tags: ["nlp", "misinformation", "social-media", "deep-learning"]
  },
  {
    title: "Augmented Reality for Educational Content",
    description: "Build an AR application that enhances learning experiences by overlaying interactive 3D models and information in educational settings.",
    domain: "App",
    difficulty: "Intermediate",
    skillsRequired: ["Unity", "C#", "AR Development", "3D Modeling", "Mobile Development"],
    estimatedDuration: "5-6 months",
    tags: ["ar", "education", "mobile", "3d-modeling"]
  },
  {
    title: "Microplastic Detection in Water Systems",
    description: "Develop computer vision algorithms to detect and quantify microplastics in water samples using microscopy images and deep learning.",
    domain: "AI",
    difficulty: "Advanced",
    skillsRequired: ["Computer Vision", "Python", "Deep Learning", "Image Processing", "Environmental Science"],
    estimatedDuration: "6-8 months",
    tags: ["computer-vision", "environmental", "microplastics", "deep-learning"]
  },
  {
    title: "Decentralized Social Network Platform",
    description: "Create a decentralized social media platform that gives users control over their data while maintaining social connectivity and content sharing.",
    domain: "Web",
    difficulty: "Advanced",
    skillsRequired: ["Blockchain", "React", "Node.js", "IPFS", "Cryptography"],
    estimatedDuration: "8-10 months",
    tags: ["decentralized", "social-media", "blockchain", "privacy"]
  }
];

async function seedProjects() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/project-finder');
    console.log('Connected to MongoDB');

    // Clear existing projects
    await Project.deleteMany({});
    console.log('Cleared existing projects');

    // Insert sample projects
    const projects = await Project.insertMany(sampleProjects);
    console.log(`Inserted ${projects.length} sample projects`);

    console.log('Sample projects seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  seedProjects();
}

module.exports = { sampleProjects, seedProjects };