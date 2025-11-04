import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-8">
          <div className="bg-gradient-to-r from-primary-600 to-accent-600 rounded-2xl p-8 text-white">
            <h1 className="text-4xl font-bold mb-2">
              Welcome back, {user?.name}! 🔬
            </h1>
            <p className="text-white/90 text-lg">Ready to advance your research journey today?</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Quick Stats */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center">
              <div className="bg-primary-100 p-3 rounded-full">
                <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900">{user?.savedProjects?.length || 0}</p>
                <p className="text-gray-600">Saved Projects</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center">
              <div className="bg-green-100 p-3 rounded-full">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900">{user?.teams?.length || 0}</p>
                <p className="text-gray-600">Teams Joined</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center">
              <div className="bg-yellow-100 p-3 rounded-full">
                <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900">{user?.skills?.length || 0}</p>
                <p className="text-gray-600">Skills Listed</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Profile Summary */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Profile Summary</h2>
              <Link
                to="/profile"
                className="text-primary-600 hover:text-primary-700 text-sm font-medium"
              >
                Edit Profile
              </Link>
            </div>
            
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">Availability</p>
                <p className={`font-medium ${user?.availability ? 'text-green-600' : 'text-red-600'}`}>
                  {user?.availability ? 'Looking for team' : 'Not available'}
                </p>
              </div>
              
              {user?.skills && user.skills.length > 0 && (
                <div>
                  <p className="text-sm text-gray-500 mb-2">Skills</p>
                  <div className="flex flex-wrap gap-1">
                    {user.skills.slice(0, 5).map(skill => (
                      <span key={skill} className="bg-primary-100 text-primary-600 px-2 py-1 rounded text-sm">
                        {skill}
                      </span>
                    ))}
                    {user.skills.length > 5 && (
                      <span className="text-gray-500 text-sm">+{user.skills.length - 5} more</span>
                    )}
                  </div>
                </div>
              )}
              
              {user?.interests && user.interests.length > 0 && (
                <div>
                  <p className="text-sm text-gray-500 mb-2">Interests</p>
                  <div className="flex flex-wrap gap-1">
                    {user.interests.map(interest => (
                      <span key={interest} className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-sm">
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
            
            <div className="space-y-3">
              <Link
                to="/idea-finder"
                className="block w-full bg-gradient-to-r from-accent-500 to-accent-600 text-white text-center py-3 rounded-lg hover:from-accent-600 hover:to-accent-700 transition-all font-semibold"
              >
                💡 Generate Research Ideas
              </Link>
              
              <Link
                to="/projects"
                className="block w-full bg-primary-600 text-white text-center py-3 rounded-lg hover:bg-primary-700 transition-colors"
              >
                Browse Project Ideas
              </Link>
              
              <Link
                to="/teams"
                className="block w-full bg-green-600 text-white text-center py-3 rounded-lg hover:bg-green-700 transition-colors"
              >
                Find Teams to Join
              </Link>
              
              <Link
                to="/teams"
                className="block w-full bg-gray-600 text-white text-center py-3 rounded-lg hover:bg-gray-700 transition-colors"
              >
                Create New Team
              </Link>
            </div>
          </div>
        </div>

        {/* Recommendations Section */}
        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Recommended for You</h2>
          <p className="text-gray-600">
            Based on your skills and interests, we'll show personalized project and team recommendations here.
          </p>
          <div className="mt-4">
            <Link
              to="/projects"
              className="text-primary-600 hover:text-primary-700 font-medium"
            >
              Explore Projects →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;