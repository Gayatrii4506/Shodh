import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [savedProjects, setSavedProjects] = useState(new Set());
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showTeamForm, setShowTeamForm] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [createLoading, setCreateLoading] = useState(false);
  const [projectFormData, setProjectFormData] = useState({
    title: '',
    description: '',
    domain: '',
    difficulty: '',
    skillsRequired: [],
    estimatedDuration: '',
    tags: []
  });
  const [teamFormData, setTeamFormData] = useState({
    teamName: '',
    description: '',
    maxMembers: 5,
    rolesNeeded: [{ role: '', skills: [] }]
  });
  const [filters, setFilters] = useState({
    domain: '',
    difficulty: '',
    search: ''
  });

  const { isAuthenticated } = useAuth();
  const domains = ['Web', 'AI', 'App', 'IoT', 'Cloud', 'Data Science', 'Blockchain', 'Game Dev'];
  const difficulties = ['Beginner', 'Intermediate', 'Advanced'];

  useEffect(() => {
    fetchProjects();
  }, [filters]);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (filters.domain) params.append('domain', filters.domain);
      if (filters.difficulty) params.append('difficulty', filters.difficulty);
      if (filters.search) params.append('search', filters.search);

      const response = await axios.get(`/api/projects?${params}`);
      setProjects(response.data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSaveProject = async (projectId) => {
    if (!isAuthenticated) {
      alert('Please login to save projects');
      return;
    }

    try {
      await axios.post(`/api/projects/${projectId}/save`);
      if (savedProjects.has(projectId)) {
        setSavedProjects(prev => {
          const newSet = new Set(prev);
          newSet.delete(projectId);
          return newSet;
        });
      } else {
        setSavedProjects(prev => new Set(prev).add(projectId));
      }
    } catch (error) {
      console.error('Error saving project:', error);
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-700 border-green-200';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'Advanced': return 'bg-red-100 text-red-700 border-red-200';
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

  const handleStartTeam = (project) => {
    if (!isAuthenticated) {
      alert('Please login to create teams');
      return;
    }
    setSelectedProject(project);
    setTeamFormData({
      teamName: `${project.title} Research Team`,
      description: `Join us to work on ${project.title}. We're looking for passionate researchers to collaborate on this ${project.domain} project.`,
      maxMembers: 5,
      rolesNeeded: [{ role: '', skills: [] }]
    });
    setShowTeamForm(true);
  };

  const handleCreateTeam = async (e) => {
    e.preventDefault();
    setCreateLoading(true);
    
    try {
      const teamData = {
        ...teamFormData,
        project: selectedProject._id,
        rolesNeeded: teamFormData.rolesNeeded.filter(role => role.role.trim() !== '')
      };
      
      await axios.post('/api/teams', teamData);
      
      // Reset form and close modal
      setTeamFormData({
        teamName: '',
        description: '',
        maxMembers: 5,
        rolesNeeded: [{ role: '', skills: [] }]
      });
      setShowTeamForm(false);
      setSelectedProject(null);
      
      alert('Team created successfully! You can now manage it from the Teams page.');
    } catch (error) {
      console.error('Error creating team:', error);
      alert('Failed to create team: ' + (error.response?.data?.message || 'Unknown error'));
    } finally {
      setCreateLoading(false);
    }
  };

  const handleTeamFormChange = (field, value) => {
    setTeamFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const addRole = () => {
    setTeamFormData(prev => ({
      ...prev,
      rolesNeeded: [...prev.rolesNeeded, { role: '', skills: [] }]
    }));
  };

  const removeRole = (index) => {
    setTeamFormData(prev => ({
      ...prev,
      rolesNeeded: prev.rolesNeeded.filter((_, i) => i !== index)
    }));
  };

  const updateRole = (index, field, value) => {
    setTeamFormData(prev => ({
      ...prev,
      rolesNeeded: prev.rolesNeeded.map((role, i) => 
        i === index ? { ...role, [field]: value } : role
      )
    }));
  };

  const handleCreateProject = async (e) => {
    e.preventDefault();
    setCreateLoading(true);
    
    try {
      const projectData = {
        ...projectFormData,
        skillsRequired: projectFormData.skillsRequired.filter(skill => skill.trim() !== ''),
        tags: projectFormData.tags.filter(tag => tag.trim() !== '')
      };
      
      await axios.post('/api/projects', projectData);
      
      // Reset form and close modal
      setProjectFormData({
        title: '',
        description: '',
        domain: '',
        difficulty: '',
        skillsRequired: [],
        estimatedDuration: '',
        tags: []
      });
      setShowCreateForm(false);
      
      // Refresh projects list
      fetchProjects();
      
      alert('Research project created successfully!');
    } catch (error) {
      console.error('Error creating project:', error);
      alert('Failed to create project: ' + (error.response?.data?.message || 'Unknown error'));
    } finally {
      setCreateLoading(false);
    }
  };

  const handleProjectFormChange = (field, value) => {
    setProjectFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const addSkill = () => {
    setProjectFormData(prev => ({
      ...prev,
      skillsRequired: [...prev.skillsRequired, '']
    }));
  };

  const removeSkill = (index) => {
    setProjectFormData(prev => ({
      ...prev,
      skillsRequired: prev.skillsRequired.filter((_, i) => i !== index)
    }));
  };

  const updateSkill = (index, value) => {
    setProjectFormData(prev => ({
      ...prev,
      skillsRequired: prev.skillsRequired.map((skill, i) => 
        i === index ? value : skill
      )
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">Research Ideas</h1>
              <p className="text-gray-600 text-lg">Discover groundbreaking research opportunities</p>
            </div>
            {isAuthenticated && (
              <button
                onClick={() => setShowCreateForm(true)}
                className="bg-gradient-to-r from-primary-600 to-primary-700 text-white px-6 py-3 rounded-xl hover:from-primary-700 hover:to-primary-800 transition-all transform hover:scale-105 font-semibold shadow-lg"
              >
                + Propose Research
              </button>
            )}
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white p-6 rounded-2xl shadow-lg mb-8 border border-gray-200">
          <div className="grid md:grid-cols-4 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                🔍 Search Research
              </label>
              <input
                type="text"
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
                placeholder="Search by title, description..."
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                🏷️ Research Domain
              </label>
              <select
                value={filters.domain}
                onChange={(e) => handleFilterChange('domain', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
              >
                <option value="">All Domains</option>
                {domains.map(domain => (
                  <option key={domain} value={domain}>{getDomainIcon(domain)} {domain}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                📊 Complexity Level
              </label>
              <select
                value={filters.difficulty}
                onChange={(e) => handleFilterChange('difficulty', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
              >
                <option value="">All Levels</option>
                {difficulties.map(difficulty => (
                  <option key={difficulty} value={difficulty}>{difficulty}</option>
                ))}
              </select>
            </div>
            <div className="flex items-end">
              <button
                onClick={() => setFilters({ domain: '', difficulty: '', search: '' })}
                className="w-full bg-gradient-to-r from-gray-500 to-gray-600 text-white py-3 px-4 rounded-xl hover:from-gray-600 hover:to-gray-700 transition-all transform hover:scale-105 font-semibold"
              >
                Clear All
              </button>
            </div>
          </div>
        </div>

        {/* Projects Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-16">
            <div className="text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-primary-600 mx-auto mb-4"></div>
              <p className="text-gray-600 font-medium">Loading research ideas...</p>
            </div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.length === 0 ? (
              <div className="col-span-full text-center py-16">
                <div className="text-6xl mb-4">🔬</div>
                <p className="text-gray-500 text-xl mb-2">No research ideas found</p>
                <p className="text-gray-400 mb-6">
                  {filters.search || filters.domain || filters.difficulty 
                    ? 'Try adjusting your search criteria' 
                    : 'Be the first to propose a groundbreaking research idea!'
                  }
                </p>
                {isAuthenticated && !filters.search && !filters.domain && !filters.difficulty && (
                  <button
                    onClick={() => setShowCreateForm(true)}
                    className="bg-gradient-to-r from-primary-600 to-primary-700 text-white px-6 py-3 rounded-xl hover:from-primary-700 hover:to-primary-800 transition-all transform hover:scale-105 font-semibold shadow-lg"
                  >
                    Propose First Research Idea
                  </button>
                )}
              </div>
            ) : (
              projects.map(project => (
                <div key={project._id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-2 p-8 border border-gray-100">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl">{getDomainIcon(project.domain)}</span>
                      <span className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm font-semibold">
                        {project.domain}
                      </span>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold border ${getDifficultyColor(project.difficulty)}`}>
                      {project.difficulty}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-3 text-gray-900 leading-tight">{project.title}</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed line-clamp-3">{project.description}</p>
                  
                  {project.skillsRequired && project.skillsRequired.length > 0 && (
                    <div className="mb-6">
                      <p className="text-sm font-semibold text-gray-700 mb-3">Required Skills:</p>
                      <div className="flex flex-wrap gap-2">
                        {project.skillsRequired.slice(0, 3).map(skill => (
                          <span key={skill} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-lg text-sm font-medium">
                            {skill}
                          </span>
                        ))}
                        {project.skillsRequired.length > 3 && (
                          <span className="text-gray-500 text-sm font-medium">+{project.skillsRequired.length - 3} more</span>
                        )}
                      </div>
                    </div>
                  )}

                  {project.estimatedDuration && (
                    <div className="mb-6">
                      <div className="flex items-center text-sm text-gray-600">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Duration: {project.estimatedDuration}
                      </div>
                    </div>
                  )}
                  
                  <div className="flex justify-between items-center">
                    <button 
                      onClick={() => handleSaveProject(project._id)}
                      className={`flex items-center space-x-2 font-semibold text-sm transition-colors ${
                        savedProjects.has(project._id) 
                          ? 'text-accent-600 hover:text-accent-700' 
                          : 'text-gray-600 hover:text-accent-600'
                      }`}
                    >
                      <svg className="w-4 h-4" fill={savedProjects.has(project._id) ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                      <span>{savedProjects.has(project._id) ? 'Saved' : 'Save'}</span>
                    </button>
                    <button 
                      onClick={() => handleStartTeam(project)}
                      className="bg-gradient-to-r from-primary-600 to-primary-700 text-white px-6 py-2 rounded-xl hover:from-primary-700 hover:to-primary-800 transition-all transform hover:scale-105 font-semibold shadow-lg"
                    >
                      Start Team
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Create Project Modal */}
        {showCreateForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-8">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Propose Research Idea</h2>
                  <button
                    onClick={() => setShowCreateForm(false)}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <form onSubmit={handleCreateProject} className="space-y-6">
                  {/* Title */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Research Title *
                    </label>
                    <input
                      type="text"
                      value={projectFormData.title}
                      onChange={(e) => handleProjectFormChange('title', e.target.value)}
                      placeholder="Enter your research idea title"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
                      required
                    />
                  </div>

                  {/* Domain and Difficulty */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Research Domain *
                      </label>
                      <select
                        value={projectFormData.domain}
                        onChange={(e) => handleProjectFormChange('domain', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
                        required
                      >
                        <option value="">Select domain</option>
                        {domains.map(domain => (
                          <option key={domain} value={domain}>{domain}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Complexity Level *
                      </label>
                      <select
                        value={projectFormData.difficulty}
                        onChange={(e) => handleProjectFormChange('difficulty', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
                        required
                      >
                        <option value="">Select level</option>
                        {difficulties.map(difficulty => (
                          <option key={difficulty} value={difficulty}>{difficulty}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Research Description *
                    </label>
                    <textarea
                      value={projectFormData.description}
                      onChange={(e) => handleProjectFormChange('description', e.target.value)}
                      placeholder="Describe your research idea, objectives, methodology, and expected outcomes..."
                      rows={5}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all resize-none"
                      required
                    />
                  </div>

                  {/* Estimated Duration */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Estimated Duration
                    </label>
                    <input
                      type="text"
                      value={projectFormData.estimatedDuration}
                      onChange={(e) => handleProjectFormChange('estimatedDuration', e.target.value)}
                      placeholder="e.g., 6-8 months, 1 year"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
                    />
                  </div>

                  {/* Skills Required */}
                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <label className="block text-sm font-semibold text-gray-700">
                        Skills Required
                      </label>
                      <button
                        type="button"
                        onClick={addSkill}
                        className="text-primary-600 hover:text-primary-700 font-semibold text-sm transition-colors"
                      >
                        + Add Skill
                      </button>
                    </div>
                    <div className="space-y-3">
                      {projectFormData.skillsRequired.map((skill, index) => (
                        <div key={index} className="flex gap-3 items-start">
                          <input
                            type="text"
                            value={skill}
                            onChange={(e) => updateSkill(index, e.target.value)}
                            placeholder="e.g., Python, Machine Learning, Statistics"
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
                          />
                          <button
                            type="button"
                            onClick={() => removeSkill(index)}
                            className="text-red-500 hover:text-red-700 transition-colors p-2"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      ))}
                      {projectFormData.skillsRequired.length === 0 && (
                        <button
                          type="button"
                          onClick={addSkill}
                          className="w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-xl text-gray-500 hover:border-primary-300 hover:text-primary-600 transition-colors"
                        >
                          + Add first skill requirement
                        </button>
                      )}
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
                      className="bg-gradient-to-r from-primary-600 to-primary-700 text-white px-8 py-3 rounded-xl hover:from-primary-700 hover:to-primary-800 transition-all transform hover:scale-105 font-semibold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {createLoading ? (
                        <div className="flex items-center space-x-2">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                          <span>Creating...</span>
                        </div>
                      ) : (
                        'Propose Research'
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Create Team Modal */}
        {showTeamForm && selectedProject && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-8">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Create Team for Research</h2>
                    <p className="text-gray-600 mt-1">{selectedProject.title}</p>
                  </div>
                  <button
                    onClick={() => {
                      setShowTeamForm(false);
                      setSelectedProject(null);
                    }}
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
                      value={teamFormData.teamName}
                      onChange={(e) => handleTeamFormChange('teamName', e.target.value)}
                      placeholder="Enter your team name"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
                      required
                    />
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Team Description *
                    </label>
                    <textarea
                      value={teamFormData.description}
                      onChange={(e) => handleTeamFormChange('description', e.target.value)}
                      placeholder="Describe your team's goals, approach, and what you're looking for in team members..."
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all resize-none"
                      required
                    />
                  </div>

                  {/* Max Members */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Maximum Team Size
                    </label>
                    <select
                      value={teamFormData.maxMembers}
                      onChange={(e) => handleTeamFormChange('maxMembers', parseInt(e.target.value))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
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
                        className="text-primary-600 hover:text-primary-700 font-semibold text-sm transition-colors"
                      >
                        + Add Role
                      </button>
                    </div>
                    <div className="space-y-3">
                      {teamFormData.rolesNeeded.map((role, index) => (
                        <div key={index} className="flex gap-3 items-start">
                          <input
                            type="text"
                            value={role.role}
                            onChange={(e) => updateRole(index, 'role', e.target.value)}
                            placeholder="Role title (e.g., Data Scientist, Frontend Developer)"
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
                          />
                          {teamFormData.rolesNeeded.length > 1 && (
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
                      onClick={() => {
                        setShowTeamForm(false);
                        setSelectedProject(null);
                      }}
                      className="px-6 py-3 text-gray-600 hover:text-gray-800 font-semibold transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={createLoading}
                      className="bg-gradient-to-r from-primary-600 to-primary-700 text-white px-8 py-3 rounded-xl hover:from-primary-700 hover:to-primary-800 transition-all transform hover:scale-105 font-semibold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
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

export default Projects;