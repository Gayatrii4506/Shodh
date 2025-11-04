import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Landing = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 via-primary-700 to-accent-600 text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-20 left-10 w-72 h-72 bg-white/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent-500/20 rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <div className="mb-6">
            <span className="bg-white/20 text-white px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm">
              🔬 Research • Collaborate • Innovate
            </span>
          </div>
          <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
            Welcome to Shodh
          </h1>
          <p className="text-xl md:text-2xl mb-4 max-w-3xl mx-auto text-white/90 font-light">
            Where brilliant minds discover groundbreaking research ideas
          </p>
          <p className="text-lg mb-10 max-w-2xl mx-auto text-white/80">
            Connect with researchers, explore innovative projects, and build teams that change the world
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/projects"
              className="bg-white text-primary-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-50 transition-all transform hover:scale-105 shadow-xl"
            >
              🔍 Discover Research Ideas
            </Link>
            <Link
              to="/idea-finder"
              className="bg-white/10 text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/20 transition-all transform hover:scale-105 shadow-xl border border-white/30 backdrop-blur-sm"
            >
              💡 Generate Ideas
            </Link>
            <Link
              to="/teams"
              className="bg-accent-500 text-white px-8 py-4 rounded-xl font-semibold hover:bg-accent-600 transition-all transform hover:scale-105 shadow-xl"
            >
              👥 Join Research Teams
            </Link>
            {!isAuthenticated && (
              <Link
                to="/auth"
                className="bg-transparent text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/10 transition-all border-2 border-white/30 backdrop-blur-sm"
              >
                🚀 Start Your Journey
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How Shodh Works</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Your journey from idea to breakthrough research in three simple steps
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center group">
              <div className="bg-gradient-to-br from-primary-500 to-primary-600 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-xl">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Explore Research</h3>
              <p className="text-gray-600 leading-relaxed">
                Browse cutting-edge research ideas across multiple domains. Filter by field, complexity, and methodology to find your perfect match.
              </p>
            </div>
            <div className="text-center group">
              <div className="bg-gradient-to-br from-accent-500 to-accent-600 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-xl">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Build Teams</h3>
              <p className="text-gray-600 leading-relaxed">
                Connect with researchers who complement your expertise. Form interdisciplinary teams that bring diverse perspectives to complex problems.
              </p>
            </div>
            <div className="text-center group">
              <div className="bg-gradient-to-br from-green-500 to-green-600 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-xl">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Make Impact</h3>
              <p className="text-gray-600 leading-relaxed">
                Collaborate seamlessly with your team to conduct groundbreaking research that advances knowledge and creates real-world impact.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trending Research Preview */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Research Areas</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Explore the most exciting research opportunities across various domains
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Sample research cards */}
            {[
              { 
                title: "Quantum Machine Learning", 
                domain: "AI", 
                difficulty: "Advanced",
                description: "Exploring quantum algorithms for enhanced machine learning capabilities",
                icon: "🔬"
              },
              { 
                title: "Sustainable Energy Systems", 
                domain: "Engineering", 
                difficulty: "Intermediate",
                description: "Developing renewable energy solutions for urban environments",
                icon: "🌱"
              },
              { 
                title: "Biomedical Data Analysis", 
                domain: "Data Science", 
                difficulty: "Advanced",
                description: "Using AI to analyze genomic data for personalized medicine",
                icon: "🧬"
              },
              { 
                title: "Climate Change Modeling", 
                domain: "Environmental", 
                difficulty: "Intermediate",
                description: "Predictive models for climate impact assessment",
                icon: "🌍"
              },
              { 
                title: "Neural Interface Technology", 
                domain: "Neuroscience", 
                difficulty: "Advanced",
                description: "Brain-computer interfaces for assistive technologies",
                icon: "🧠"
              },
              { 
                title: "Social Network Analysis", 
                domain: "Social Science", 
                difficulty: "Beginner",
                description: "Understanding information spread in digital communities",
                icon: "📊"
              }
            ].map((project, index) => (
              <div key={index} className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-2 border border-gray-100">
                <div className="flex justify-between items-start mb-4">
                  <div className="text-3xl">{project.icon}</div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    project.difficulty === 'Beginner' ? 'bg-green-100 text-green-700' :
                    project.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {project.difficulty}
                  </span>
                </div>
                <span className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm font-medium">
                  {project.domain}
                </span>
                <h3 className="text-xl font-bold mb-3 mt-4 text-gray-900">{project.title}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {project.description}
                </p>
                <Link
                  to="/projects"
                  className="inline-flex items-center text-primary-600 hover:text-primary-700 font-semibold transition-colors"
                >
                  Explore Research
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              to="/projects"
              className="bg-gradient-to-r from-primary-600 to-primary-700 text-white px-8 py-4 rounded-xl hover:from-primary-700 hover:to-primary-800 transition-all transform hover:scale-105 font-semibold shadow-xl"
            >
              Explore All Research Areas
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-primary-600 p-2 rounded-lg">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold">Shodh</h3>
              </div>
              <p className="text-gray-300 mb-6 max-w-md leading-relaxed">
                Empowering researchers worldwide to discover, collaborate, and create breakthrough innovations that shape the future.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="bg-gray-700 p-2 rounded-lg hover:bg-gray-600 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                </a>
                <a href="#" className="bg-gray-700 p-2 rounded-lg hover:bg-gray-600 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
                <a href="#" className="bg-gray-700 p-2 rounded-lg hover:bg-gray-600 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.097.118.112.221.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.748-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24c6.624 0 11.99-5.367 11.99-11.987C24.007 5.367 18.641.001.012.001z"/>
                  </svg>
                </a>
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-6 text-lg">Research Areas</h4>
              <ul className="space-y-3 text-gray-300">
                <li><Link to="/projects" className="hover:text-white transition-colors">Artificial Intelligence</Link></li>
                <li><Link to="/projects" className="hover:text-white transition-colors">Data Science</Link></li>
                <li><Link to="/projects" className="hover:text-white transition-colors">Biotechnology</Link></li>
                <li><Link to="/projects" className="hover:text-white transition-colors">Environmental Science</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-6 text-lg">Platform</h4>
              <ul className="space-y-3 text-gray-300">
                <li><Link to="/projects" className="hover:text-white transition-colors">Discover Ideas</Link></li>
                <li><Link to="/teams" className="hover:text-white transition-colors">Find Teams</Link></li>
                <li><Link to="/auth" className="hover:text-white transition-colors">Join Community</Link></li>
                <li><Link to="/dashboard" className="hover:text-white transition-colors">Dashboard</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 mb-4 md:mb-0">
              &copy; 2024 Shodh. Advancing research through collaboration.
            </p>
            <div className="flex space-x-6 text-gray-400 text-sm">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;