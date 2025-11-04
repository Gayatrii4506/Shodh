import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const Teams = () => {
  const [teams, setTeams] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [createLoading, setCreateLoading] = useState(false);
  const [formData, setFormData] = useState({
    teamName: '',
    project: '',
    description: '',
    maxMembers: 5,
    rolesNeeded: [{ role: '', skills: [] }]
  });
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    fetchTeams();
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await axios.get('/api/projects');
      console.log('Fetched projects:', response.data);
      setProjects(response.data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  const fetchTeams = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/teams');
      setTeams(response.data);
    } catch (error) {
      console.error('Error fetching teams:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleJoinTeam = async (teamId) => {
    if (!isAuthenticated) {
      alert('Please login to join teams');
      return;
    }

    try {
      await axios.post(`/api/teams/${teamId}/join`, {
        message: 'I would like to join this research team!'
      });
      alert('Join request sent successfully!');
    } catch (error) {
      console.error('Error joining team:', error);
      alert('Failed to send join request');
    }
  };

  const handleCreateTeam = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      alert('Please login to create teams');
      return;
    }

    setCreateLoading(true);
    try {
      const teamData = {
        ...formData,
        rolesNeeded: formData.rolesNeeded.filter(role => role.role.trim() !== '')
      };
      
      await axios.post('/api/teams', teamData);
      
      // Reset form and close modal
      setFormData({
        teamName: '',
        project: '',
        description: '',
        maxMembers: 5,
        rolesNeeded: [{ role: '', skills: [] }]
      });
      setShowCreateForm(false);
      
      // Refresh teams list
      fetchTeams();
      
      alert('Team created successfully!');
    } catch (error) {
      console.error('Error creating team:', error);
      alert('Failed to create team: ' + (error.response?.data?.message || 'Unknown error'));
    } finally {
      setCreateLoading(false);
    }
  };

  const handleFormChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const addRole = () => {
    setFormData(prev => ({
      ...prev,
      rolesNeeded: [...prev.rolesNeeded, { role: '', skills: [] }]
    }));
  };

  const removeRole = (index) => {
    setFormData(prev => ({
      ...prev,
      rolesNeeded: prev.rolesNeeded.filter((_, i) => i !== index)
    }));
  };

  const updateRole = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      rolesNeeded: prev.rolesNeeded.map((role, i) => 
        i === index ? { ...role, [field]: value } : role
      )
    }));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Open': return 'bg-green-100 text-green-700 border-green-200';
      case 'In Progress': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Completed': return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'Closed': return 'bg-gray-100 text-gray-600 border-gray-200';
      default: return 'bg-gray-100 text-gray-600 border-gray-200';
    }
  };

  const getDomainIcon = (domain) => {
    const icons = {
      'AI': '🤖',
      'Web': '🌐',
      'App': '📱',
      'IoT': '🔗',
      'Cloud': '☁️',
      'Data Science': '📊',
      'Blockchain': '⛓️',
      'Game Dev': '🎮'
    };
    return icons[domain] || '💡';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">Research Teams</h1>
              <p className="text-gray-600 text-lg">Join collaborative research teams or start your own</p>
            </div>
            {isAuthenticated && (
              <button
                onClick={() => setShowCreateForm(true)}
                className="bg-gradient-to-r from-accent-500 to-accent-600 text-white px-6 py-3 rounded-xl hover:from-accent-600 hover:to-accent-700 transition-all transform hover:scale-105 font-semibold shadow-lg"
              >
                + Create Team
              </button>
            )}
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-16">
            <div className="text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-accent-600 mx-auto mb-4"></div>
              <p className="text-gray-600 font-medium">Loading research teams...</p>
            </div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teams.length === 0 ? (
              <div className="col-span-full text-center py-16">
                <div className="text-6xl mb-4">👥</div>
                <p className="text-gray-500 text-xl mb-2">No research teams yet</p>
                <p className="text-gray-400 mb-6">Be the first to create a collaborative research team!</p>
                {isAuthenticated && (
                  <button
                    onClick={() => setShowCreateForm(true)}
                    className="bg-gradient-to-r from-accent-500 to-accent-600 text-white px-6 py-3 rounded-xl hover:from-accent-600 hover:to-accent-700 transition-all transform hover:scale-105 font-semibold shadow-lg"
                  >
                    Create First Team
                  </button>
                )}
              </div>
            ) : (
              teams.map(team => (
                <div key={team._id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-2 p-8 border border-gray-100">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-gray-900 flex-1 pr-4">{team.teamName}</h3>
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold border ${getStatusColor(team.status)}`}>
                      {team.status}
                    </span>
                  </div>
                  
                  {team.project && (
                    <div className="mb-6 p-4 bg-gray-50 rounded-xl">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="text-lg">{getDomainIcon(team.project.domain)}</span>
                        <span className="bg-primary-100 text-primary-700 px-2 py-1 rounded-lg text-sm font-semibold">
                          {team.project.domain}
                        </span>
                      </div>
                      <p className="font-semibold text-gray-900">{team.project.title}</p>
                    </div>
                  )}
                  
                  <p className="text-gray-600 mb-6 leading-relaxed">{team.description}</p>
                  
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-3">
                      <p className="text-sm font-semibold text-gray-700">Team Members</p>
                      <span className="text-sm text-gray-500">
                        {team.members?.length || 0}/{team.maxMembers || 5}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {team.members?.slice(0, 4).map(member => (
                        <div key={member._id} className="flex items-center space-x-2 bg-gray-100 px-3 py-1 rounded-lg">
                          <div className="w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-semibold">
                              {member.user?.name?.charAt(0)?.toUpperCase() || 'M'}
                            </span>
                          </div>
                          <span className="text-sm font-medium text-gray-700">
                            {member.user?.name || 'Member'}
                          </span>
                        </div>
                      ))}
                      {team.members?.length > 4 && (
                        <span className="text-gray-500 text-sm font-medium px-3 py-1">
                          +{team.members.length - 4} more
                        </span>
                      )}
                    </div>
                  </div>
                  
                  {team.rolesNeeded && team.rolesNeeded.filter(role => !role.filled).length > 0 && (
                    <div className="mb-6">
                      <p className="text-sm font-semibold text-gray-700 mb-3">Open Positions:</p>
                      <div className="flex flex-wrap gap-2">
                        {team.rolesNeeded.filter(role => !role.filled).slice(0, 3).map((role, index) => (
                          <span key={index} className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-lg text-sm font-semibold border border-yellow-200">
                            {role.role}
                          </span>
                        ))}
                        {team.rolesNeeded.filter(role => !role.filled).length > 3 && (
                          <span className="text-gray-500 text-sm font-medium">
                            +{team.rolesNeeded.filter(role => !role.filled).length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                  
                  <div className="flex justify-between items-center">
                    <button className="flex items-center space-x-2 text-primary-600 hover:text-primary-700 font-semibold text-sm transition-colors">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      <span>View Details</span>
                    </button>
                    <button 
                      onClick={() => handleJoinTeam(team._id)}
                      className="bg-gradient-to-r from-accent-500 to-accent-600 text-white px-6 py-2 rounded-xl hover:from-accent-600 hover:to-accent-700 transition-all transform hover:scale-105 font-semibold shadow-lg"
                    >
                      Join Team
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Create Team Modal */}
        {showCreateForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-8">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Create Research Team</h2>
                  <button
                    onClick={() => setShowCreateForm(false)}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <form onSubmit={handleCreateTeam} className="space-y-6">
                  {/* Team Name */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Team Name *
                    </label>
                    <input
                      type="text"
                      value={formData.teamName}
                      onChange={(e) => handleFormChange('teamName', e.target.value)}
                      placeholder="Enter your team name"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-accent-500 transition-all"
                      required
                    />
                  </div>

                  {/* Project Selection */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Research Project *
                    </label>
                    <select
                      value={formData.project}
                      onChange={(e) => handleFormChange('project', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-accent-500 transition-all"
                      required
                    >
                      <option value="">Select a research project</option>
                      {projects.length === 0 ? (
                        <option disabled>Loading projects...</option>
                      ) : (
                        projects.map(project => (
                          <option key={project._id} value={project._id}>
                            {project.title} ({project.domain})
                          </option>
                        ))
                      )}
                    </select>
                    {projects.length === 0 && (
                      <div className="mt-2">
                        <p className="text-sm text-gray-500 mb-2">
                          No research projects available. You need to create a research project first.
                        </p>
                        <a 
                          href="/projects" 
                          className="text-sm text-primary-600 hover:text-primary-700 font-semibold"
                        >
                          → Go to Research Ideas page to create a project
                        </a>
                      </div>
                    )}
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Team Description *
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => handleFormChange('description', e.target.value)}
                      placeholder="Describe your team's goals, approach, and what you're looking for in team members..."
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-accent-500 transition-all resize-none"
                      required
                    />
                  </div>

                  {/* Max Members */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Maximum Team Size
                    </label>
                    <select
                      value={formData.maxMembers}
                      onChange={(e) => handleFormChange('maxMembers', parseInt(e.target.value))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-accent-500 transition-all"
                    >
                      {[3, 4, 5, 6, 7, 8].map(num => (
                        <option key={num} value={num}>{num} members</option>
                      ))}
                    </select>
                  </div>

                  {/* Roles Needed */}
                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <label className="block text-sm font-semibold text-gray-700">
                        Roles Needed
                      </label>
                      <button
                        type="button"
                        onClick={addRole}
                        className="text-accent-600 hover:text-accent-700 font-semibold text-sm transition-colors"
                      >
                        + Add Role
                      </button>
                    </div>
                    <div className="space-y-3">
                      {formData.rolesNeeded.map((role, index) => (
                        <div key={index} className="flex gap-3 items-start">
                          <input
                            type="text"
                            value={role.role}
                            onChange={(e) => updateRole(index, 'role', e.target.value)}
                            placeholder="Role title (e.g., Data Scientist, Frontend Developer)"
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-accent-500 transition-all"
                          />
                          {formData.rolesNeeded.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeRole(index)}
                              className="text-red-500 hover:text-red-700 transition-colors p-2"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Form Actions */}
                  <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
                    <button
                      type="button"
                      onClick={() => setShowCreateForm(false)}
                      className="px-6 py-3 text-gray-600 hover:text-gray-800 font-semibold transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={createLoading}
                      className="bg-gradient-to-r from-accent-500 to-accent-600 text-white px-8 py-3 rounded-xl hover:from-accent-600 hover:to-accent-700 transition-all transform hover:scale-105 font-semibold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {createLoading ? (
                        <div className="flex items-center space-x-2">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                          <span>Creating...</span>
                        </div>
                      ) : (
                        'Create Team'
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Teams;