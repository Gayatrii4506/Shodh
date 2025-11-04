import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const IdeaFinder = () => {
  const [selectedDomains, setSelectedDomains] = useState([]);
  const [selectedDifficulty, setSelectedDifficulty] = useState('');
  const [interests, setInterests] = useState('');
  const [generatedIdeas, setGeneratedIdeas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [curatedIdeas, setCuratedIdeas] = useState([]);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const domains = ['AI', 'Web', 'App', 'IoT', 'Cloud', 'Data Science', 'Blockchain', 'Game Dev', 'Biotechnology', 'Environmental Science', 'Neuroscience', 'Robotics'];
  const difficulties = ['Beginner', 'Intermediate', 'Advanced'];

  // Curated research ideas database
  const ideaDatabase = {
    'AI': [
      {
        title: 'Emotion Recognition in Virtual Reality',
        description: 'Develop AI models to detect and respond to user emotions in VR environments for enhanced immersive experiences.',
        difficulty: 'Advanced',
        skills: ['Machine Learning', 'Computer Vision', 'VR Development', 'Python'],
        duration: '8-10 months'
      },
      {
        title: 'AI-Powered Code Review Assistant',
        description: 'Create an intelligent system that automatically reviews code for bugs, security issues, and optimization opportunities.',
        difficulty: 'Intermediate',
        skills: ['NLP', 'Static Analysis', 'Python', 'Machine Learning'],
        duration: '6-8 months'
      },
      {
        title: 'Personalized Learning Path Generator',
        description: 'Build an AI system that creates customized learning curricula based on individual learning styles and goals.',
        difficulty: 'Intermediate',
        skills: ['Machine Learning', 'Educational Technology', 'Data Analysis'],
        duration: '5-7 months'
      }
    ],
    'Data Science': [
      {
        title: 'Urban Traffic Pattern Analysis',
        description: 'Analyze city traffic data to predict congestion patterns and optimize traffic light timing for reduced emissions.',
        difficulty: 'Intermediate',
        skills: ['Data Analysis', 'Python', 'GIS', 'Statistics'],
        duration: '4-6 months'
      },
      {
        title: 'Social Media Sentiment Impact on Stock Prices',
        description: 'Investigate the correlation between social media sentiment and stock market movements using big data analytics.',
        difficulty: 'Advanced',
        skills: ['NLP', 'Financial Analysis', 'Big Data', 'Python', 'Statistics'],
        duration: '6-9 months'
      }
    ],
    'Biotechnology': [
      {
        title: 'Protein Folding Prediction Using Deep Learning',
        description: 'Develop neural networks to predict protein structures for drug discovery and disease research.',
        difficulty: 'Advanced',
        skills: ['Bioinformatics', 'Deep Learning', 'Molecular Biology', 'Python'],
        duration: '10-12 months'
      },
      {
        title: 'Microbiome Analysis for Personalized Nutrition',
        description: 'Study gut microbiome data to provide personalized dietary recommendations for optimal health.',
        difficulty: 'Intermediate',
        skills: ['Bioinformatics', 'Statistics', 'Nutrition Science', 'R'],
        duration: '6-8 months'
      }
    ],
    'Environmental Science': [
      {
        title: 'Plastic Waste Detection in Oceans Using Satellite Imagery',
        description: 'Use computer vision and satellite data to track and quantify ocean plastic pollution globally.',
        difficulty: 'Advanced',
        skills: ['Remote Sensing', 'Computer Vision', 'Environmental Science', 'Python'],
        duration: '8-10 months'
      },
      {
        title: 'Carbon Footprint Tracker for Smart Cities',
        description: 'Develop IoT-based systems to monitor and reduce carbon emissions in urban environments.',
        difficulty: 'Intermediate',
        skills: ['IoT', 'Environmental Monitoring', 'Data Analysis', 'Sustainability'],
        duration: '6-8 months'
      }
    ],
    'Blockchain': [
      {
        title: 'Decentralized Academic Credential Verification',
        description: 'Create a blockchain system for secure, tamper-proof academic credential verification.',
        difficulty: 'Intermediate',
        skills: ['Blockchain', 'Smart Contracts', 'Cryptography', 'Web Development'],
        duration: '5-7 months'
      }
    ],
    'Robotics': [
      {
        title: 'Autonomous Disaster Response Robots',
        description: 'Design robots that can navigate disaster zones autonomously to assist in search and rescue operations.',
        difficulty: 'Advanced',
        skills: ['Robotics', 'Computer Vision', 'Path Planning', 'Embedded Systems'],
        duration: '12-15 months'
      }
    ]
  };

  const handleDomainToggle = (domain) => {
    setSelectedDomains(prev => 
      prev.includes(domain) 
        ? prev.filter(d => d !== domain)
        : [...prev, domain]
    );
  };

  const generateIdeas = () => {
    setLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      let ideas = [];
      
      // Get ideas from selected domains
      selectedDomains.forEach(domain => {
        if (ideaDatabase[domain]) {
          ideas = [...ideas, ...ideaDatabase[domain]];
        }
      });
      
      // Filter by difficulty if selected
      if (selectedDifficulty) {
        ideas = ideas.filter(idea => idea.difficulty === selectedDifficulty);
      }
      
      // If no domains selected, show random ideas
      if (selectedDomains.length === 0) {
        const allIdeas = Object.values(ideaDatabase).flat();
        ideas = allIdeas.sort(() => 0.5 - Math.random()).slice(0, 6);
      }
      
      // Shuffle and limit results
      const shuffledIdeas = ideas.sort(() => 0.5 - Math.random()).slice(0, 8);
      
      setGeneratedIdeas(shuffledIdeas);
      setLoading(false);
    }, 1500);
  };

  const generateAIIdeas = () => {
    setLoading(true);
    
    // Simulate AI-generated ideas based on interests
    setTimeout(() => {
      const aiGeneratedIdeas = [
        {
          title: `Smart ${interests || 'Healthcare'} Monitoring System`,
          description: `Develop an intelligent monitoring system for ${interests || 'healthcare'} using IoT sensors and machine learning to predict and prevent issues before they occur.`,
          difficulty: selectedDifficulty || 'Intermediate',
          skills: ['IoT', 'Machine Learning', 'Data Analysis', 'Mobile Development'],
          duration: '6-8 months',
          isAIGenerated: true
        },
        {
          title: `${interests || 'Education'} Analytics Platform`,
          description: `Create a comprehensive analytics platform for ${interests || 'education'} that uses big data to provide insights and improve outcomes.`,
          difficulty: selectedDifficulty || 'Intermediate',
          skills: ['Data Science', 'Web Development', 'Statistics', 'Visualization'],
          duration: '5-7 months',
          isAIGenerated: true
        },
        {
          title: `Blockchain-based ${interests || 'Supply Chain'} Solution`,
          description: `Build a transparent and secure ${interests || 'supply chain'} management system using blockchain technology for enhanced traceability.`,
          difficulty: selectedDifficulty || 'Advanced',
          skills: ['Blockchain', 'Smart Contracts', 'Web3', 'Cryptography'],
          duration: '7-9 months',
          isAIGenerated: true
        }
      ];
      
      setGeneratedIdeas(aiGeneratedIdeas);
      setLoading(false);
    }, 2000);
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-700 border-green-200';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'Advanced': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-600 border-gray-200';
    }
  };

  const createProjectFromIdea = async (idea) => {
    if (!isAuthenticated) {
      alert('Please login to create projects');
      navigate('/auth');
      return;
    }

    try {
      const projectData = {
        title: idea.title,
        description: idea.description,
        domain: selectedDomains.length > 0 ? selectedDomains[0] : 'AI', // Use first selected domain or default to AI
        difficulty: idea.difficulty,
        skillsRequired: idea.skills,
        estimatedDuration: idea.duration,
        tags: idea.isAIGenerated ? ['ai-generated'] : ['curated']
      };

      await axios.post('/api/projects', projectData);
      alert('Project created successfully! You can now view it in the Research Ideas page.');
      navigate('/projects');
    } catch (error) {
      console.error('Error creating project:', error);
      alert('Failed to create project: ' + (error.response?.data?.message || 'Unknown error'));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            🔍 Research Idea Finder
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover your next breakthrough research project with our intelligent idea generator
          </p>
        </div>

        {/* Idea Generator Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Generate Research Ideas</h2>
          
          {/* Domain Selection */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Select Research Domains (choose multiple)
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {domains.map(domain => (
                <button
                  key={domain}
                  onClick={() => handleDomainToggle(domain)}
                  className={`p-3 rounded-xl border-2 transition-all font-medium ${
                    selectedDomains.includes(domain)
                      ? 'border-primary-500 bg-primary-50 text-primary-700'
                      : 'border-gray-200 bg-white text-gray-600 hover:border-primary-300'
                  }`}
                >
                  {domain}
                </button>
              ))}
            </div>
          </div>

          {/* Difficulty Selection */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Preferred Complexity Level
            </label>
            <div className="flex gap-3">
              {difficulties.map(difficulty => (
                <button
                  key={difficulty}
                  onClick={() => setSelectedDifficulty(difficulty === selectedDifficulty ? '' : difficulty)}
                  className={`px-6 py-3 rounded-xl border-2 transition-all font-medium ${
                    selectedDifficulty === difficulty
                      ? 'border-accent-500 bg-accent-50 text-accent-700'
                      : 'border-gray-200 bg-white text-gray-600 hover:border-accent-300'
                  }`}
                >
                  {difficulty}
                </button>
              ))}
            </div>
          </div>

          {/* Interests Input */}
          <div className="mb-8">
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Your Interests & Keywords (for AI-generated ideas)
            </label>
            <input
              type="text"
              value={interests}
              onChange={(e) => setInterests(e.target.value)}
              placeholder="e.g., healthcare, education, sustainability, gaming..."
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
            />
          </div>

          {/* Generate Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={generateIdeas}
              disabled={loading}
              className="flex-1 bg-gradient-to-r from-primary-600 to-primary-700 text-white px-8 py-4 rounded-xl hover:from-primary-700 hover:to-primary-800 transition-all transform hover:scale-105 font-semibold shadow-lg disabled:opacity-50"
            >
              {loading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Generating Ideas...</span>
                </div>
              ) : (
                '🎯 Find Curated Ideas'
              )}
            </button>
            <button
              onClick={generateAIIdeas}
              disabled={loading}
              className="flex-1 bg-gradient-to-r from-accent-500 to-accent-600 text-white px-8 py-4 rounded-xl hover:from-accent-600 hover:to-accent-700 transition-all transform hover:scale-105 font-semibold shadow-lg disabled:opacity-50"
            >
              {loading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>AI Generating...</span>
                </div>
              ) : (
                '🤖 AI Generate Ideas'
              )}
            </button>
          </div>
        </div>

        {/* Generated Ideas */}
        {generatedIdeas.length > 0 && (
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              💡 Generated Research Ideas
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {generatedIdeas.map((idea, index) => (
                <div key={index} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-2 p-8 border border-gray-100">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center space-x-2">
                      {idea.isAIGenerated && (
                        <span className="bg-accent-100 text-accent-700 px-2 py-1 rounded-lg text-xs font-semibold">
                          AI Generated
                        </span>
                      )}
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold border ${getDifficultyColor(idea.difficulty)}`}>
                      {idea.difficulty}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-3 text-gray-900 leading-tight">{idea.title}</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">{idea.description}</p>
                  
                  <div className="mb-6">
                    <p className="text-sm font-semibold text-gray-700 mb-3">Required Skills:</p>
                    <div className="flex flex-wrap gap-2">
                      {idea.skills.map(skill => (
                        <span key={skill} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-lg text-sm font-medium">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mb-6">
                    <div className="flex items-center text-sm text-gray-600">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Duration: {idea.duration}
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <button className="flex items-center space-x-2 text-primary-600 hover:text-primary-700 font-semibold text-sm transition-colors">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                      <span>Save Idea</span>
                    </button>
                    <button 
                      onClick={() => createProjectFromIdea(idea)}
                      className="bg-gradient-to-r from-primary-600 to-primary-700 text-white px-6 py-2 rounded-xl hover:from-primary-700 hover:to-primary-800 transition-all transform hover:scale-105 font-semibold shadow-lg"
                    >
                      Create Project
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Call to Action */}
        {generatedIdeas.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-6">🚀</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Ready to Discover Your Next Big Idea?</h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Use our intelligent idea generator to find research projects that match your interests and expertise level.
            </p>
            <button
              onClick={generateIdeas}
              className="bg-gradient-to-r from-primary-600 to-primary-700 text-white px-8 py-4 rounded-xl hover:from-primary-700 hover:to-primary-800 transition-all transform hover:scale-105 font-semibold shadow-lg"
            >
              Generate Ideas Now
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default IdeaFinder;