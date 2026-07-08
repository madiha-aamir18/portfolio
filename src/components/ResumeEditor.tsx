import React, { useState } from 'react';
import { CVData, ExperienceItem, EducationItem, ProjectItem, SkillCategory } from '../types';
import { Plus, Trash2, ArrowUp, ArrowDown, ChevronDown, ChevronUp, Link as LinkIcon, PlusCircle, Sparkles } from 'lucide-react';

interface ResumeEditorProps {
  data: CVData;
  onChange: (data: CVData) => void;
}

export default function ResumeEditor({ data, onChange }: ResumeEditorProps) {
  const [activeTab, setActiveTab] = useState<'personal' | 'experience' | 'education' | 'projects' | 'skills' | 'certifications'>('personal');

  // Personal Info handlers
  const handlePersonalChange = (field: keyof CVData['personal'], value: string) => {
    onChange({
      ...data,
      personal: {
        ...data.personal,
        [field]: value
      }
    });
  };

  // EXPERIENCE Handlers
  const handleAddExperience = () => {
    const newItem: ExperienceItem = {
      id: `exp-${Date.now()}`,
      role: '',
      company: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      bullets: ['Describe a core achievement or responsibility...']
    };
    onChange({
      ...data,
      experience: [newItem, ...data.experience]
    });
  };

  const handleUpdateExperience = (id: string, updated: ExperienceItem) => {
    onChange({
      ...data,
      experience: data.experience.map(item => item.id === id ? updated : item)
    });
  };

  const handleRemoveExperience = (id: string) => {
    onChange({
      ...data,
      experience: data.experience.filter(item => item.id !== id)
    });
  };

  // EDUCATION Handlers
  const handleAddEducation = () => {
    const newItem: EducationItem = {
      id: `edu-${Date.now()}`,
      degree: '',
      institution: '',
      location: '',
      startDate: '',
      endDate: '',
      details: ''
    };
    onChange({
      ...data,
      education: [...data.education, newItem]
    });
  };

  const handleUpdateEducation = (id: string, updated: EducationItem) => {
    onChange({
      ...data,
      education: data.education.map(item => item.id === id ? updated : item)
    });
  };

  const handleRemoveEducation = (id: string) => {
    onChange({
      ...data,
      education: data.education.filter(item => item.id !== id)
    });
  };

  // PROJECTS Handlers
  const handleAddProject = () => {
    const newItem: ProjectItem = {
      id: `proj-${Date.now()}`,
      title: '',
      role: '',
      description: '',
      technologies: [],
      link: ''
    };
    onChange({
      ...data,
      projects: [...data.projects, newItem]
    });
  };

  const handleUpdateProject = (id: string, updated: ProjectItem) => {
    onChange({
      ...data,
      projects: data.projects.map(item => item.id === id ? updated : item)
    });
  };

  const handleRemoveProject = (id: string) => {
    onChange({
      ...data,
      projects: data.projects.filter(item => item.id !== id)
    });
  };

  // SKILLS Handlers
  const handleAddSkillCategory = () => {
    const newItem: SkillCategory = {
      id: `skills-${Date.now()}`,
      categoryName: 'New Skill Group',
      skills: []
    };
    onChange({
      ...data,
      skills: [...data.skills, newItem]
    });
  };

  const handleUpdateSkillCategory = (id: string, updated: SkillCategory) => {
    onChange({
      ...data,
      skills: data.skills.map(item => item.id === id ? updated : item)
    });
  };

  const handleRemoveSkillCategory = (id: string) => {
    onChange({
      ...data,
      skills: data.skills.filter(item => item.id !== id)
    });
  };

  // CERTIFICATIONS Handlers
  const handleAddCertification = () => {
    const newList = [...(data.certifications || []), 'New Certification Title'];
    onChange({
      ...data,
      certifications: newList
    });
  };

  const handleUpdateCertification = (index: number, value: string) => {
    const newList = [...(data.certifications || [])];
    newList[index] = value;
    onChange({
      ...data,
      certifications: newList
    });
  };

  const handleRemoveCertification = (index: number) => {
    const newList = (data.certifications || []).filter((_, idx) => idx !== index);
    onChange({
      ...data,
      certifications: newList
    });
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col h-full">
      {/* Tab Select Header */}
      <div className="flex border-b border-gray-100 overflow-x-auto scrollbar-none bg-gray-50/50">
        {(['personal', 'experience', 'skills', 'projects', 'education', 'certifications'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 min-w-[85px] py-3.5 text-xs font-bold uppercase tracking-wider border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === tab
                ? 'border-indigo-600 text-indigo-600 bg-white'
                : 'border-transparent text-gray-500 hover:text-gray-800'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Editor Main Content Area */}
      <div className="p-5 flex-1 overflow-y-auto">
        
        {/* 1. PERSONAL INFORMATION TAB */}
        {activeTab === 'personal' && (
          <div className="space-y-4 animate-fadeIn">
            <h3 className="text-sm font-bold text-gray-800 border-b border-gray-100 pb-2">Personal Identifiers</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest">Full Name</label>
                <input
                  type="text"
                  value={data.personal.fullName}
                  onChange={(e) => handlePersonalChange('fullName', e.target.value)}
                  placeholder="Alex Rivera"
                  className="w-full text-xs border border-gray-200 rounded-lg p-2.5 focus:ring-1 focus:ring-indigo-500 focus:outline-hidden"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest">Professional Title</label>
                <input
                  type="text"
                  value={data.personal.title}
                  onChange={(e) => handlePersonalChange('title', e.target.value)}
                  placeholder="Senior Full-Stack Engineer"
                  className="w-full text-xs border border-gray-200 rounded-lg p-2.5 focus:ring-1 focus:ring-indigo-500 focus:outline-hidden"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest">Email Address</label>
                <input
                  type="email"
                  value={data.personal.email}
                  onChange={(e) => handlePersonalChange('email', e.target.value)}
                  placeholder="alex.rivera@devmail.com"
                  className="w-full text-xs border border-gray-200 rounded-lg p-2.5 focus:ring-1 focus:ring-indigo-500 focus:outline-hidden"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest">Phone Number</label>
                <input
                  type="text"
                  value={data.personal.phone}
                  onChange={(e) => handlePersonalChange('phone', e.target.value)}
                  placeholder="+1 (555) 019-2834"
                  className="w-full text-xs border border-gray-200 rounded-lg p-2.5 focus:ring-1 focus:ring-indigo-500 focus:outline-hidden"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest">Location / City</label>
                <input
                  type="text"
                  value={data.personal.location}
                  onChange={(e) => handlePersonalChange('location', e.target.value)}
                  placeholder="San Francisco, CA"
                  className="w-full text-xs border border-gray-200 rounded-lg p-2.5 focus:ring-1 focus:ring-indigo-500 focus:outline-hidden"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest">Personal Website</label>
                <input
                  type="text"
                  value={data.personal.website}
                  onChange={(e) => handlePersonalChange('website', e.target.value)}
                  placeholder="https://alexrivera.dev"
                  className="w-full text-xs border border-gray-200 rounded-lg p-2.5 focus:ring-1 focus:ring-indigo-500 focus:outline-hidden"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest">GitHub Username</label>
                <input
                  type="text"
                  value={data.personal.github}
                  onChange={(e) => handlePersonalChange('github', e.target.value)}
                  placeholder="github.com/alexrivera"
                  className="w-full text-xs border border-gray-200 rounded-lg p-2.5 focus:ring-1 focus:ring-indigo-500 focus:outline-hidden"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest">LinkedIn Username</label>
                <input
                  type="text"
                  value={data.personal.linkedin}
                  onChange={(e) => handlePersonalChange('linkedin', e.target.value)}
                  placeholder="linkedin.com/in/alexrivera-dev"
                  className="w-full text-xs border border-gray-200 rounded-lg p-2.5 focus:ring-1 focus:ring-indigo-500 focus:outline-hidden"
                />
              </div>
            </div>

            <div className="space-y-1.5 pt-2">
              <div className="flex justify-between items-center">
                <label className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest">Profile Statement / Summary</label>
                <span className="text-[10px] text-indigo-500 font-semibold flex items-center gap-0.5">
                  <Sparkles size={11} /> Optimize on Co-Pilot Tab
                </span>
              </div>
              <textarea
                rows={4}
                value={data.personal.summary}
                onChange={(e) => handlePersonalChange('summary', e.target.value)}
                placeholder="Results-driven professional with..."
                className="w-full text-xs border border-gray-200 rounded-lg p-2.5 focus:ring-1 focus:ring-indigo-500 focus:outline-hidden leading-relaxed"
              />
            </div>
          </div>
        )}

        {/* 2. EXPERIENCE TAB */}
        {activeTab === 'experience' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex justify-between items-center border-b border-gray-100 pb-2">
              <h3 className="text-sm font-bold text-gray-800">Work Experience History</h3>
              <button
                onClick={handleAddExperience}
                className="bg-indigo-50 hover:bg-indigo-100 text-indigo-600 border border-indigo-200/50 text-[10px] font-bold px-2.5 py-1.5 rounded-lg flex items-center gap-1 transition-all cursor-pointer"
              >
                <Plus size={12} /> Add Experience
              </button>
            </div>

            {data.experience.length === 0 ? (
              <div className="text-center py-8 text-gray-400 text-xs">
                No work history entries. Click "Add Experience" to start.
              </div>
            ) : (
              <div className="space-y-6">
                {data.experience.map((exp, expIdx) => (
                  <div key={exp.id} className="p-4 border border-gray-100 bg-gray-50/30 rounded-xl space-y-4 relative">
                    <button
                      onClick={() => handleRemoveExperience(exp.id)}
                      className="absolute top-3 right-3 text-gray-400 hover:text-red-500 transition-colors p-1 rounded-md hover:bg-red-50 cursor-pointer"
                      title="Delete Entry"
                    >
                      <Trash2 size={14} />
                    </button>

                    <div className="text-xs font-extrabold text-indigo-600 uppercase tracking-wider">
                      Position #{data.experience.length - expIdx}
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-gray-500">Role / Job Title</label>
                        <input
                          type="text"
                          value={exp.role}
                          onChange={(e) => handleUpdateExperience(exp.id, { ...exp, role: e.target.value })}
                          placeholder="e.g. Senior Software Developer"
                          className="w-full text-xs border border-gray-200 rounded-lg p-2 bg-white focus:outline-hidden"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-gray-500">Company Name</label>
                        <input
                          type="text"
                          value={exp.company}
                          onChange={(e) => handleUpdateExperience(exp.id, { ...exp, company: e.target.value })}
                          placeholder="e.g. Google"
                          className="w-full text-xs border border-gray-200 rounded-lg p-2 bg-white focus:outline-hidden"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-gray-500">Location</label>
                        <input
                          type="text"
                          value={exp.location}
                          onChange={(e) => handleUpdateExperience(exp.id, { ...exp, location: e.target.value })}
                          placeholder="e.g. Mountain View, CA"
                          className="w-full text-xs border border-gray-200 rounded-lg p-2 bg-white focus:outline-hidden"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-bold text-gray-500">Start Date</label>
                          <input
                            type="text"
                            value={exp.startDate}
                            onChange={(e) => handleUpdateExperience(exp.id, { ...exp, startDate: e.target.value })}
                            placeholder="e.g. Jan 2023"
                            className="w-full text-xs border border-gray-200 rounded-lg p-2 bg-white focus:outline-hidden"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-bold text-gray-500">End Date</label>
                          <input
                            type="text"
                            value={exp.endDate}
                            disabled={exp.current}
                            onChange={(e) => handleUpdateExperience(exp.id, { ...exp, endDate: e.target.value })}
                            placeholder={exp.current ? 'Present' : 'e.g. Present'}
                            className="w-full text-xs border border-gray-200 rounded-lg p-2 bg-white disabled:bg-gray-100 disabled:text-gray-400 focus:outline-hidden"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <input
                        type="checkbox"
                        id={`current-${exp.id}`}
                        checked={exp.current}
                        onChange={(e) => handleUpdateExperience(exp.id, { ...exp, current: e.target.checked })}
                        className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      />
                      <label htmlFor={`current-${exp.id}`} className="text-xs font-semibold text-gray-600">
                        I currently work in this role
                      </label>
                    </div>

                    {/* Bullet Points */}
                    <div className="space-y-2 pt-2 border-t border-gray-100">
                      <div className="flex justify-between items-center">
                        <label className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest">
                          Achievement Highlights (STAR Method Recommended)
                        </label>
                        <button
                          onClick={() => {
                            const updatedBullets = [...exp.bullets, 'New impact statement...'];
                            handleUpdateExperience(exp.id, { ...exp, bullets: updatedBullets });
                          }}
                          className="text-indigo-600 hover:text-indigo-800 text-[10px] font-bold flex items-center gap-0.5 cursor-pointer"
                        >
                          + Add Bullet
                        </button>
                      </div>

                      <div className="space-y-2">
                        {exp.bullets.map((bullet, bulletIdx) => (
                          <div key={bulletIdx} className="flex gap-2">
                            <input
                              type="text"
                              value={bullet}
                              onChange={(e) => {
                                const updatedBullets = [...exp.bullets];
                                updatedBullets[bulletIdx] = e.target.value;
                                handleUpdateExperience(exp.id, { ...exp, bullets: updatedBullets });
                              }}
                              className="flex-1 text-xs border border-gray-200 rounded-lg p-2 bg-white focus:outline-hidden"
                            />
                            <button
                              onClick={() => {
                                const updatedBullets = exp.bullets.filter((_, idx) => idx !== bulletIdx);
                                handleUpdateExperience(exp.id, { ...exp, bullets: updatedBullets });
                              }}
                              className="text-gray-400 hover:text-red-500 p-1.5 rounded-lg border border-gray-200 bg-white hover:bg-red-50 transition-colors cursor-pointer"
                              title="Delete Bullet"
                            >
                              <Trash2 size={12} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* 3. SKILLS TAB */}
        {activeTab === 'skills' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex justify-between items-center border-b border-gray-100 pb-2">
              <h3 className="text-sm font-bold text-gray-800">Skill Categories</h3>
              <button
                onClick={handleAddSkillCategory}
                className="bg-indigo-50 hover:bg-indigo-100 text-indigo-600 border border-indigo-200/50 text-[10px] font-bold px-2.5 py-1.5 rounded-lg flex items-center gap-1 transition-all cursor-pointer"
              >
                <Plus size={12} /> Add Category Group
              </button>
            </div>

            {data.skills.length === 0 ? (
              <div className="text-center py-8 text-gray-400 text-xs">
                No skill categories created yet.
              </div>
            ) : (
              <div className="space-y-6">
                {data.skills.map((cat) => (
                  <div key={cat.id} className="p-4 border border-gray-100 bg-gray-50/30 rounded-xl space-y-4 relative">
                    <button
                      onClick={() => handleRemoveSkillCategory(cat.id)}
                      className="absolute top-3 right-3 text-gray-400 hover:text-red-500 transition-colors p-1 rounded-md hover:bg-red-50 cursor-pointer"
                    >
                      <Trash2 size={14} />
                    </button>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest">
                        Category Group Name
                      </label>
                      <input
                        type="text"
                        value={cat.categoryName}
                        onChange={(e) => handleUpdateSkillCategory(cat.id, { ...cat, categoryName: e.target.value })}
                        placeholder="e.g. Frontend Dev, Cloud Infrastructure"
                        className="w-full text-xs border border-gray-200 rounded-lg p-2.5 bg-white focus:outline-hidden font-bold"
                      />
                    </div>

                    {/* Skill Tags list and local input */}
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-gray-500">Skills Tags</label>
                      <div className="flex flex-wrap gap-1.5 bg-white border border-gray-200 rounded-lg p-2 min-h-[42px]">
                        {cat.skills.length === 0 ? (
                          <span className="text-[10px] text-gray-400 italic px-2 py-1">No tags. Type in the input below to add...</span>
                        ) : (
                          cat.skills.map((skill, idx) => (
                            <span key={idx} className="bg-gray-100 text-gray-700 text-xs pl-2.5 pr-1.5 py-0.5 rounded-md font-medium border border-gray-200 flex items-center gap-1">
                              {skill}
                              <button
                                onClick={() => {
                                  const updatedSkills = cat.skills.filter((_, sIdx) => sIdx !== idx);
                                  handleUpdateSkillCategory(cat.id, { ...cat, skills: updatedSkills });
                                }}
                                className="hover:bg-gray-200 text-gray-400 hover:text-red-500 rounded p-0.5 cursor-pointer"
                              >
                                ×
                              </button>
                            </span>
                          ))
                        )}
                      </div>

                      {/* Add skill input form */}
                      <SkillInputForm
                        onAdd={(newSkill) => {
                          if (!cat.skills.includes(newSkill)) {
                            handleUpdateSkillCategory(cat.id, { ...cat, skills: [...cat.skills, newSkill] });
                          }
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* 4. PROJECTS TAB */}
        {activeTab === 'projects' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex justify-between items-center border-b border-gray-100 pb-2">
              <h3 className="text-sm font-bold text-gray-800">Portfolio Projects</h3>
              <button
                onClick={handleAddProject}
                className="bg-indigo-50 hover:bg-indigo-100 text-indigo-600 border border-indigo-200/50 text-[10px] font-bold px-2.5 py-1.5 rounded-lg flex items-center gap-1 transition-all cursor-pointer"
              >
                <Plus size={12} /> Add Project
              </button>
            </div>

            {data.projects.length === 0 ? (
              <div className="text-center py-8 text-gray-400 text-xs">
                No projects added. Presenting case studies raises professional appeal.
              </div>
            ) : (
              <div className="space-y-6">
                {data.projects.map((proj) => (
                  <div key={proj.id} className="p-4 border border-gray-100 bg-gray-50/30 rounded-xl space-y-4 relative">
                    <button
                      onClick={() => handleRemoveProject(proj.id)}
                      className="absolute top-3 right-3 text-gray-400 hover:text-red-500 transition-colors p-1 rounded-md hover:bg-red-50 cursor-pointer"
                    >
                      <Trash2 size={14} />
                    </button>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-gray-500">Project Name</label>
                        <input
                          type="text"
                          value={proj.title}
                          onChange={(e) => handleUpdateProject(proj.id, { ...proj, title: e.target.value })}
                          placeholder="e.g. Distributed Task Orchestrator"
                          className="w-full text-xs border border-gray-200 rounded-lg p-2 bg-white focus:outline-hidden"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-gray-500">Your Role</label>
                        <input
                          type="text"
                          value={proj.role}
                          onChange={(e) => handleUpdateProject(proj.id, { ...proj, role: e.target.value })}
                          placeholder="e.g. Solo Architect / Creator"
                          className="w-full text-xs border border-gray-200 rounded-lg p-2 bg-white focus:outline-hidden"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-gray-500">Project Description</label>
                      <textarea
                        rows={2}
                        value={proj.description}
                        onChange={(e) => handleUpdateProject(proj.id, { ...proj, description: e.target.value })}
                        placeholder="Briefly describe what this project solved, tech hurdles, and quantified outcomes..."
                        className="w-full text-xs border border-gray-200 rounded-lg p-2 bg-white focus:outline-hidden"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-gray-500">Project URL / Link</label>
                        <div className="relative">
                          <LinkIcon size={12} className="absolute left-2.5 top-3 text-gray-400" />
                          <input
                            type="text"
                            value={proj.link}
                            onChange={(e) => handleUpdateProject(proj.id, { ...proj, link: e.target.value })}
                            placeholder="e.g. github.com/user/project"
                            className="w-full text-xs border border-gray-200 rounded-lg pl-8 p-2 bg-white focus:outline-hidden"
                          />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-gray-500">Technologies Used (Comma Separated)</label>
                        <input
                          type="text"
                          value={proj.technologies.join(', ')}
                          onChange={(e) => {
                            const tags = e.target.value.split(',').map(t => t.trim()).filter(Boolean);
                            handleUpdateProject(proj.id, { ...proj, technologies: tags });
                          }}
                          placeholder="React, TypeScript, AWS, Docker"
                          className="w-full text-xs border border-gray-200 rounded-lg p-2 bg-white focus:outline-hidden"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* 5. EDUCATION TAB */}
        {activeTab === 'education' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex justify-between items-center border-b border-gray-100 pb-2">
              <h3 className="text-sm font-bold text-gray-800">Academic Background</h3>
              <button
                onClick={handleAddEducation}
                className="bg-indigo-50 hover:bg-indigo-100 text-indigo-600 border border-indigo-200/50 text-[10px] font-bold px-2.5 py-1.5 rounded-lg flex items-center gap-1 transition-all cursor-pointer"
              >
                <Plus size={12} /> Add Education
              </button>
            </div>

            {data.education.length === 0 ? (
              <div className="text-center py-8 text-gray-400 text-xs">
                No academic history added.
              </div>
            ) : (
              <div className="space-y-6">
                {data.education.map((edu) => (
                  <div key={edu.id} className="p-4 border border-gray-100 bg-gray-50/30 rounded-xl space-y-4 relative">
                    <button
                      onClick={() => handleRemoveEducation(edu.id)}
                      className="absolute top-3 right-3 text-gray-400 hover:text-red-500 transition-colors p-1 rounded-md hover:bg-red-50 cursor-pointer"
                    >
                      <Trash2 size={14} />
                    </button>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-gray-500">Degree & Specialization</label>
                        <input
                          type="text"
                          value={edu.degree}
                          onChange={(e) => handleUpdateEducation(edu.id, { ...edu, degree: e.target.value })}
                          placeholder="e.g. B.S. in Computer Science"
                          className="w-full text-xs border border-gray-200 rounded-lg p-2 bg-white focus:outline-hidden"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-gray-500">School / University</label>
                        <input
                          type="text"
                          value={edu.institution}
                          onChange={(e) => handleUpdateEducation(edu.id, { ...edu, institution: e.target.value })}
                          placeholder="e.g. Stanford University"
                          className="w-full text-xs border border-gray-200 rounded-lg p-2 bg-white focus:outline-hidden"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-gray-500">Location</label>
                        <input
                          type="text"
                          value={edu.location}
                          onChange={(e) => handleUpdateEducation(edu.id, { ...edu, location: e.target.value })}
                          placeholder="e.g. Stanford, CA"
                          className="w-full text-xs border border-gray-200 rounded-lg p-2 bg-white focus:outline-hidden"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-bold text-gray-500">Start Date</label>
                          <input
                            type="text"
                            value={edu.startDate}
                            onChange={(e) => handleUpdateEducation(edu.id, { ...edu, startDate: e.target.value })}
                            placeholder="e.g. Sep 2018"
                            className="w-full text-xs border border-gray-200 rounded-lg p-2 bg-white focus:outline-hidden"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-bold text-gray-500">End Date</label>
                          <input
                            type="text"
                            value={edu.endDate}
                            onChange={(e) => handleUpdateEducation(edu.id, { ...edu, endDate: e.target.value })}
                            placeholder="e.g. Jun 2022"
                            className="w-full text-xs border border-gray-200 rounded-lg p-2 bg-white focus:outline-hidden"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-gray-500">Academic Details (GPA, Honors, Societies)</label>
                      <input
                        type="text"
                        value={edu.details || ''}
                        onChange={(e) => handleUpdateEducation(edu.id, { ...edu, details: e.target.value })}
                        placeholder="e.g. GPA 3.9/4.0. Completed senior capstone in data engines."
                        className="w-full text-xs border border-gray-200 rounded-lg p-2 bg-white focus:outline-hidden"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* 6. CERTIFICATIONS TAB */}
        {activeTab === 'certifications' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex justify-between items-center border-b border-gray-100 pb-2">
              <h3 className="text-sm font-bold text-gray-800">Certifications & Honors</h3>
              <button
                onClick={handleAddCertification}
                className="bg-indigo-50 hover:bg-indigo-100 text-indigo-600 border border-indigo-200/50 text-[10px] font-bold px-2.5 py-1.5 rounded-lg flex items-center gap-1 transition-all cursor-pointer"
              >
                <Plus size={12} /> Add Certification
              </button>
            </div>

            {(!data.certifications || data.certifications.length === 0) ? (
              <div className="text-center py-8 text-gray-400 text-xs">
                No certifications added. Click "Add Certification" to insert some.
              </div>
            ) : (
              <div className="space-y-3">
                {data.certifications.map((cert, idx) => (
                  <div key={idx} className="flex gap-2 items-center p-3 border border-gray-100 bg-gray-50/30 rounded-xl">
                    <span className="text-xs font-bold text-indigo-600 w-6">#{idx + 1}</span>
                    <input
                      type="text"
                      value={cert}
                      onChange={(e) => handleUpdateCertification(idx, e.target.value)}
                      placeholder="e.g. AWS Certified Solutions Architect"
                      className="flex-1 text-xs border border-gray-200 rounded-lg p-2 bg-white focus:outline-hidden"
                    />
                    <button
                      onClick={() => handleRemoveCertification(idx)}
                      className="text-gray-400 hover:text-red-500 p-2 rounded-lg border border-gray-200 bg-white hover:bg-red-50 transition-colors cursor-pointer"
                      title="Delete Entry"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// Inline Sub-component for adding tags to skill groups safely
function SkillInputForm({ onAdd }: { onAdd: (skill: string) => void }) {
  const [inputVal, setInputVal] = useState('');

  const handlePressEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      triggerAdd();
    }
  };

  const triggerAdd = () => {
    const trimmed = inputVal.trim();
    if (trimmed) {
      onAdd(trimmed);
      setInputVal('');
    }
  };

  return (
    <div className="flex gap-2">
      <input
        type="text"
        value={inputVal}
        onChange={(e) => setInputVal(e.target.value)}
        onKeyDown={handlePressEnter}
        placeholder="Add skill tag (e.g. React, Python) and press Enter"
        className="flex-1 text-xs border border-gray-200 rounded-lg p-2 bg-white focus:outline-hidden"
      />
      <button
        type="button"
        onClick={triggerAdd}
        className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold px-3 py-2 rounded-lg cursor-pointer"
      >
        Add
      </button>
    </div>
  );
}
