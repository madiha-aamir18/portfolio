import React from 'react';
import { CVData, ThemeType, PortfolioSettings } from '../types';
import { Mail, Phone, Globe, Github, Linkedin, MapPin, ExternalLink, Code, Terminal, Palette, Briefcase, FileText } from 'lucide-react';

interface PortfolioPreviewProps {
  data: CVData;
  settings: PortfolioSettings;
}

export default function PortfolioPreview({ data, settings }: PortfolioPreviewProps) {
  const { personal, experience, education, projects, skills } = data;
  const { theme, accentColor, fontSize } = settings;

  // Determine global sizing classes
  const fontSizing = {
    sm: 'text-sm leading-relaxed',
    base: 'text-base leading-relaxed',
    lg: 'text-lg leading-relaxed',
  }[fontSize];

  const headingSizing = {
    sm: 'text-lg',
    base: 'text-xl',
    lg: 'text-2xl',
  }[fontSize];

  // Theme-specific styles
  if (theme === 'tech') {
    return (
      <div id="portfolio-container" className={`bg-[#0f172a] text-slate-300 p-8 md:p-12 min-h-full font-mono rounded-xl border border-slate-800 shadow-2xl relative overflow-hidden ${fontSizing}`}>
        {/* Subtle matrix-like grid or tech background */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none"></div>

        {/* Top Header */}
        <header className="border-b border-slate-800 pb-6 mb-8 relative">
          <div className="inline-block px-2 py-0.5 bg-slate-900 border border-slate-700 rounded text-xs text-teal-400 mb-3 uppercase tracking-wider font-semibold">
            &lt;system_node_online&gt;
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <span className={`text-${accentColor}-400`}>&gt;</span> {personal.fullName || 'User Name'}
          </h1>
          <p className="text-lg text-teal-400 mt-1 font-semibold tracking-wide">
            {personal.title || 'Role Title'}
          </p>

          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 text-xs text-slate-400">
            {personal.email && (
              <span className="flex items-center gap-2">
                <span className={`text-${accentColor}-400`}>[email]</span> {personal.email}
              </span>
            )}
            {personal.phone && (
              <span className="flex items-center gap-2">
                <span className={`text-${accentColor}-400`}>[phone]</span> {personal.phone}
              </span>
            )}
            {personal.location && (
              <span className="flex items-center gap-2">
                <span className={`text-${accentColor}-400`}>[loc]</span> {personal.location}
              </span>
            )}
            {personal.website && (
              <span className="flex items-center gap-2">
                <span className={`text-${accentColor}-400`}>[web]</span> 
                <a href={personal.website} target="_blank" rel="noopener noreferrer" className="hover:underline flex items-center gap-0.5">
                  {personal.website.replace(/^https?:\/\//, '')} <ExternalLink size={10} />
                </a>
              </span>
            )}
            {personal.github && (
              <span className="flex items-center gap-2">
                <span className={`text-${accentColor}-400`}>[gh]</span> 
                <a href={`https://${personal.github}`} target="_blank" rel="noopener noreferrer" className="hover:underline">
                  {personal.github}
                </a>
              </span>
            )}
            {personal.linkedin && (
              <span className="flex items-center gap-2">
                <span className={`text-${accentColor}-400`}>[in]</span> 
                <a href={`https://${personal.linkedin}`} target="_blank" rel="noopener noreferrer" className="hover:underline">
                  {personal.linkedin}
                </a>
              </span>
            )}
          </div>
        </header>

        {/* Profile Summary */}
        {personal.summary && (
          <section className="mb-8">
            <h2 className={`text-white font-bold border-b border-slate-800 pb-1 mb-3 uppercase tracking-widest text-xs flex items-center gap-2`}>
              <span className={`text-${accentColor}-400`}>01.</span> Profile Summary
            </h2>
            <p className="text-slate-400 leading-relaxed font-sans">{personal.summary}</p>
          </section>
        )}

        {/* Work Experience */}
        {experience.length > 0 && (
          <section className="mb-8">
            <h2 className="text-white font-bold border-b border-slate-800 pb-1 mb-4 uppercase tracking-widest text-xs">
              <span className={`text-${accentColor}-400`}>02.</span> Professional History
            </h2>
            <div className="space-y-6">
              {experience.map((exp) => (
                <div key={exp.id} className="relative border-l border-slate-800 pl-4 ml-2">
                  <div className={`absolute -left-1.5 top-1.5 w-3 h-3 rounded-full bg-${accentColor}-400/40 border border-${accentColor}-400`}></div>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline">
                    <h3 className="text-white font-bold tracking-tight">
                      {exp.role} <span className={`text-${accentColor}-400`}>@ {exp.company}</span>
                    </h3>
                    <span className="text-xs text-slate-400 tracking-wider">
                      {exp.startDate} - {exp.current ? 'PRESENT' : exp.endDate}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">{exp.location}</p>
                  
                  <ul className="mt-3 space-y-1.5 list-none font-sans text-slate-400">
                    {exp.bullets.map((bullet, idx) => (
                      <li key={idx} className="flex gap-2">
                        <span className={`text-${accentColor}-400 select-none mt-1 text-[10px]`}>&gt;&gt;</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills Section */}
        {skills.length > 0 && (
          <section className="mb-8">
            <h2 className="text-white font-bold border-b border-slate-800 pb-1 mb-4 uppercase tracking-widest text-xs">
              <span className={`text-${accentColor}-400`}>03.</span> Core Skill Matrix
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {skills.map((cat) => (
                <div key={cat.id} className="bg-slate-900/60 border border-slate-800 p-4 rounded-lg">
                  <h3 className={`text-${accentColor}-400 text-xs uppercase tracking-wider font-bold mb-2`}>
                    // {cat.categoryName}
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {cat.skills.map((skill, idx) => (
                      <span key={idx} className="bg-slate-950 border border-slate-800 text-slate-400 text-xs px-2 py-1 rounded">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects Section */}
        {projects.length > 0 && settings.showProjects && (
          <section className="mb-8">
            <h2 className="text-white font-bold border-b border-slate-800 pb-1 mb-4 uppercase tracking-widest text-xs">
              <span className={`text-${accentColor}-400`}>04.</span> Featured Projects
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {projects.map((proj) => (
                <div key={proj.id} className="border border-slate-800 p-4 rounded-lg bg-slate-950/40 flex flex-col justify-between">
                  <div>
                    <h3 className="text-white font-bold flex items-center gap-2">
                      {proj.title}
                      {proj.link && (
                        <a href={proj.link} target="_blank" rel="noopener noreferrer" className={`text-${accentColor}-400 hover:underline`}>
                          <ExternalLink size={12} />
                        </a>
                      )}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1.5 font-sans leading-relaxed">{proj.description}</p>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-1">
                    {proj.technologies.map((tech, idx) => (
                      <span key={idx} className="text-[10px] text-teal-400/80 bg-teal-950/20 px-1.5 py-0.5 rounded border border-teal-900/40">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education Section */}
        {education.length > 0 && settings.showEducation && (
          <section className="mb-8">
            <h2 className="text-white font-bold border-b border-slate-800 pb-1 mb-4 uppercase tracking-widest text-xs">
              <span className={`text-${accentColor}-400`}>05.</span> Academic Credentials
            </h2>
            <div className="space-y-4">
              {education.map((edu) => (
                <div key={edu.id} className="bg-slate-900/30 border border-slate-800/60 p-4 rounded-lg">
                  <div className="flex flex-col sm:flex-row sm:justify-between">
                    <h3 className="text-white font-bold">{edu.degree}</h3>
                    <span className="text-xs text-slate-400">{edu.startDate} - {edu.endDate}</span>
                  </div>
                  <p className={`text-${accentColor}-400 text-xs font-semibold mt-0.5`}>{edu.institution} — {edu.location}</p>
                  {edu.details && (
                    <p className="text-xs text-slate-400 mt-2 font-sans">{edu.details}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Certifications Section */}
        {data.certifications && data.certifications.length > 0 && (
          <section>
            <h2 className="text-white font-bold border-b border-slate-800 pb-1 mb-4 uppercase tracking-widest text-xs">
              <span className={`text-${accentColor}-400`}>06.</span> Professional Certifications
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {data.certifications.map((cert, idx) => (
                <div key={idx} className="bg-slate-900/20 border border-slate-800/50 p-3 rounded-lg flex items-center gap-2.5">
                  <span className={`text-${accentColor}-400 font-bold text-sm`}>✓</span>
                  <span className="text-xs text-slate-300 font-sans">{cert}</span>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    );
  }

  if (theme === 'warm') {
    return (
      <div id="portfolio-container" className={`bg-[#FAF7F2] text-slate-800 p-8 md:p-14 min-h-full rounded-2xl shadow-xl border border-amber-100 font-serif leading-relaxed ${fontSizing}`}>
        {/* Top Header */}
        <header className="border-b border-amber-900/10 pb-8 mb-8 text-center">
          <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight select-all">
            {personal.fullName || 'User Name'}
          </h1>
          <p className={`text-lg italic font-sans text-amber-800 font-medium mt-2 tracking-wide uppercase`}>
            {personal.title || 'Role Title'}
          </p>
          
          <div className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs font-sans text-slate-600">
            {personal.email && (
              <span className="flex items-center gap-1.5">
                <Mail size={12} className="text-amber-800" /> {personal.email}
              </span>
            )}
            {personal.phone && (
              <span className="flex items-center gap-1.5">
                <Phone size={12} className="text-amber-800" /> {personal.phone}
              </span>
            )}
            {personal.location && (
              <span className="flex items-center gap-1.5">
                <MapPin size={12} className="text-amber-800" /> {personal.location}
              </span>
            )}
            {personal.website && (
              <span className="flex items-center gap-1.5">
                <Globe size={12} className="text-amber-800" /> 
                <a href={personal.website} target="_blank" rel="noopener noreferrer" className="hover:underline flex items-center gap-0.5">
                  {personal.website.replace(/^https?:\/\//, '')} <ExternalLink size={10} />
                </a>
              </span>
            )}
            {personal.github && (
              <span className="flex items-center gap-1.5">
                <Github size={12} className="text-amber-800" /> 
                <a href={`https://${personal.github}`} target="_blank" rel="noopener noreferrer" className="hover:underline">
                  {personal.github}
                </a>
              </span>
            )}
            {personal.linkedin && (
              <span className="flex items-center gap-1.5">
                <Linkedin size={12} className="text-amber-800" /> 
                <a href={`https://${personal.linkedin}`} target="_blank" rel="noopener noreferrer" className="hover:underline">
                  {personal.linkedin}
                </a>
              </span>
            )}
          </div>
        </header>

        {/* Profile Summary */}
        {personal.summary && (
          <section className="mb-10 text-center max-w-3xl mx-auto">
            <h2 className="text-xs uppercase tracking-widest font-sans font-bold text-amber-800 mb-3">About Me</h2>
            <p className="text-slate-700 leading-relaxed text-md text-justify sm:text-center md:px-4">{personal.summary}</p>
          </section>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-amber-900/10 pt-8">
          {/* Main Side - Experience & Education */}
          <div className="md:col-span-2 space-y-10">
            {/* Experience */}
            {experience.length > 0 && (
              <section>
                <h2 className="text-xs uppercase tracking-widest font-sans font-bold text-amber-800 mb-6 border-b border-amber-900/10 pb-1">
                  Professional Experience
                </h2>
                <div className="space-y-8">
                  {experience.map((exp) => (
                    <div key={exp.id}>
                      <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-baseline">
                        <h3 className="text-lg font-bold text-slate-900">{exp.role}</h3>
                        <span className="text-xs text-amber-800 font-sans font-medium tracking-wider bg-amber-50 px-2 py-0.5 rounded">
                          {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                        </span>
                      </div>
                      <p className="text-sm font-sans text-slate-600 font-medium">
                        {exp.company} <span className="text-slate-400 font-normal">| {exp.location}</span>
                      </p>
                      
                      <ul className="mt-3 space-y-2 list-disc list-outside pl-4 font-sans text-sm text-slate-600 leading-relaxed">
                        {exp.bullets.map((bullet, idx) => (
                          <li key={idx}>{bullet}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Projects Section */}
            {projects.length > 0 && settings.showProjects && (
              <section>
                <h2 className="text-xs uppercase tracking-widest font-sans font-bold text-amber-800 mb-6 border-b border-amber-900/10 pb-1">
                  Key Projects & Creative Works
                </h2>
                <div className="space-y-6">
                  {projects.map((proj) => (
                    <div key={proj.id} className="group">
                      <div className="flex items-center gap-1.5">
                        <h3 className="text-base font-bold text-slate-900">{proj.title}</h3>
                        {proj.link && (
                          <a href={proj.link} target="_blank" rel="noopener noreferrer" className="text-amber-800 hover:underline">
                            <ExternalLink size={12} />
                          </a>
                        )}
                      </div>
                      {proj.role && <p className="text-xs font-sans text-amber-800 italic">{proj.role}</p>}
                      <p className="text-sm text-slate-600 font-sans mt-1">{proj.description}</p>
                      <div className="mt-2 flex flex-wrap gap-1">
                        {proj.technologies.map((tech, idx) => (
                          <span key={idx} className="text-[10px] font-sans text-amber-900/80 bg-amber-100/40 px-2 py-0.5 rounded border border-amber-900/10">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Right Side - Skills & Education */}
          <div className="space-y-10 md:border-l md:border-amber-900/10 md:pl-8">
            {/* Skills */}
            {skills.length > 0 && (
              <section>
                <h2 className="text-xs uppercase tracking-widest font-sans font-bold text-amber-800 mb-6 border-b border-amber-900/10 pb-1">
                  Skills & Expertise
                </h2>
                <div className="space-y-6">
                  {skills.map((cat) => (
                    <div key={cat.id}>
                      <h3 className="text-xs font-sans font-bold text-slate-800 uppercase tracking-wide mb-2">{cat.categoryName}</h3>
                      <div className="flex flex-wrap gap-1.5">
                        {cat.skills.map((skill, idx) => (
                          <span key={idx} className="bg-amber-100/30 text-slate-700 text-xs px-2.5 py-1 rounded font-sans border border-amber-900/5">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Education */}
            {education.length > 0 && settings.showEducation && (
              <section>
                <h2 className="text-xs uppercase tracking-widest font-sans font-bold text-amber-800 mb-6 border-b border-amber-900/10 pb-1">
                  Education
                </h2>
                <div className="space-y-6">
                  {education.map((edu) => (
                    <div key={edu.id} className="space-y-1">
                      <h3 className="text-sm font-bold text-slate-900">{edu.degree}</h3>
                      <p className="text-xs font-sans text-amber-800 font-semibold">{edu.institution}</p>
                      <p className="text-[11px] font-sans text-slate-500">{edu.startDate} – {edu.endDate} | {edu.location}</p>
                      {edu.details && (
                        <p className="text-xs font-sans text-slate-600 mt-1 italic">{edu.details}</p>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Certifications */}
            {data.certifications && data.certifications.length > 0 && (
              <section className="pt-2">
                <h2 className="text-xs uppercase tracking-widest font-sans font-bold text-amber-800 mb-4 border-b border-amber-900/10 pb-1">
                  Certifications & Honors
                </h2>
                <ul className="space-y-2 font-sans text-xs text-slate-700 list-disc pl-4">
                  {data.certifications.map((cert, idx) => (
                    <li key={idx} className="leading-relaxed">{cert}</li>
                  ))}
                </ul>
              </section>
            )}
          </div>
        </div>
      </div>
    );
  }

  // DEFAULT & MINIMALIST
  return (
    <div id="portfolio-container" className={`bg-white text-gray-800 p-8 md:p-14 min-h-full rounded-2xl shadow-xl border border-gray-100 font-sans ${fontSizing}`}>
      {/* Accent strip */}
      <div className={`h-1.5 -mt-14 -mx-14 mb-10 rounded-t-2xl bg-${accentColor}-600`}></div>

      {/* Main Grid Split */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Left column: Contact, Info & Skills */}
        <div className="md:col-span-1 space-y-8 md:border-r md:border-gray-100 md:pr-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight leading-none">
              {personal.fullName || 'User Name'}
            </h1>
            <p className={`text-sm font-bold text-${accentColor}-600 mt-2 uppercase tracking-wider`}>
              {personal.title || 'Role Title'}
            </p>
          </div>

          <div className="space-y-3.5 text-xs text-gray-600">
            <h3 className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Contact</h3>
            
            {personal.email && (
              <p className="flex items-center gap-2">
                <Mail size={14} className={`text-${accentColor}-500 flex-shrink-0`} />
                <span className="break-all">{personal.email}</span>
              </p>
            )}
            {personal.phone && (
              <p className="flex items-center gap-2">
                <Phone size={14} className={`text-${accentColor}-500 flex-shrink-0`} />
                <span>{personal.phone}</span>
              </p>
            )}
            {personal.location && (
              <p className="flex items-center gap-2">
                <MapPin size={14} className={`text-${accentColor}-500 flex-shrink-0`} />
                <span>{personal.location}</span>
              </p>
            )}
            {personal.website && (
              <p className="flex items-center gap-2">
                <Globe size={14} className={`text-${accentColor}-500 flex-shrink-0`} />
                <a href={personal.website} target="_blank" rel="noopener noreferrer" className="hover:underline flex items-center gap-0.5 break-all">
                  {personal.website.replace(/^https?:\/\//, '')} <ExternalLink size={10} />
                </a>
              </p>
            )}
            {personal.github && (
              <p className="flex items-center gap-2">
                <Github size={14} className={`text-${accentColor}-500 flex-shrink-0`} />
                <a href={`https://${personal.github}`} target="_blank" rel="noopener noreferrer" className="hover:underline break-all">
                  {personal.github}
                </a>
              </p>
            )}
            {personal.linkedin && (
              <p className="flex items-center gap-2">
                <Linkedin size={14} className={`text-${accentColor}-500 flex-shrink-0`} />
                <a href={`https://${personal.linkedin}`} target="_blank" rel="noopener noreferrer" className="hover:underline break-all">
                  {personal.linkedin}
                </a>
              </p>
            )}
          </div>

          {/* Skill List */}
          {skills.length > 0 && (
            <div className="space-y-5">
              <h3 className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Skills</h3>
              {skills.map((cat) => (
                <div key={cat.id} className="space-y-1.5">
                  <h4 className="text-[11px] font-bold text-gray-700">{cat.categoryName}</h4>
                  <div className="flex flex-wrap gap-1">
                    {cat.skills.map((skill, idx) => (
                      <span key={idx} className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-[10px] px-2 py-0.5 rounded font-medium transition-colors">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Education */}
          {education.length > 0 && settings.showEducation && (
            <div className="space-y-4">
              <h3 className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Education</h3>
              {education.map((edu) => (
                <div key={edu.id} className="space-y-0.5 text-xs">
                  <h4 className="font-bold text-gray-800">{edu.degree}</h4>
                  <p className={`text-${accentColor}-600 font-semibold text-[11px]`}>{edu.institution}</p>
                  <p className="text-[10px] text-gray-500">{edu.startDate} – {edu.endDate}</p>
                </div>
              ))}
            </div>
          )}

          {/* Certifications */}
          {data.certifications && data.certifications.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Certifications</h3>
              <ul className="space-y-2 text-xs text-gray-600">
                {data.certifications.map((cert, idx) => (
                  <li key={idx} className="flex gap-2 items-start">
                    <span className={`text-${accentColor}-500 select-none`}>•</span>
                    <span>{cert}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Right column: Summary, Experience, Projects */}
        <div className="md:col-span-2 space-y-8">
          {/* Summary */}
          {personal.summary && (
            <div className="space-y-2">
              <h3 className="text-[10px] uppercase tracking-widest font-bold text-gray-400">About Me</h3>
              <p className="text-gray-600 text-sm leading-relaxed text-justify">{personal.summary}</p>
            </div>
          )}

          {/* Experience */}
          {experience.length > 0 && (
            <div className="space-y-6">
              <h3 className="text-[10px] uppercase tracking-widest font-bold text-gray-400 border-b border-gray-100 pb-1">Experience</h3>
              <div className="space-y-6">
                {experience.map((exp) => (
                  <div key={exp.id} className="space-y-1.5">
                    <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-baseline">
                      <h4 className="font-bold text-gray-900 text-sm">{exp.role}</h4>
                      <span className="text-[10px] text-gray-500 font-medium whitespace-nowrap">
                        {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                      </span>
                    </div>
                    <p className={`text-${accentColor}-600 font-semibold text-xs`}>
                      {exp.company} <span className="text-gray-400 font-normal">| {exp.location}</span>
                    </p>
                    
                    <ul className="list-disc list-outside pl-4 space-y-1 text-gray-600 text-xs leading-relaxed">
                      {exp.bullets.map((bullet, idx) => (
                        <li key={idx} className="pl-0.5">{bullet}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Projects */}
          {projects.length > 0 && settings.showProjects && (
            <div className="space-y-5">
              <h3 className="text-[10px] uppercase tracking-widest font-bold text-gray-400 border-b border-gray-100 pb-1">Projects</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {projects.map((proj) => (
                  <div key={proj.id} className="p-3.5 rounded-xl border border-gray-100 hover:border-gray-200 hover:shadow-sm bg-gray-50/50 flex flex-col justify-between transition-all">
                    <div>
                      <h4 className="font-bold text-gray-800 text-xs flex items-center gap-1">
                        {proj.title}
                        {proj.link && (
                          <a href={proj.link} target="_blank" rel="noopener noreferrer" className={`text-${accentColor}-500 hover:underline`}>
                            <ExternalLink size={10} />
                          </a>
                        )}
                      </h4>
                      {proj.role && <p className="text-[10px] text-gray-500 italic mt-0.5">{proj.role}</p>}
                      <p className="text-[11px] text-gray-600 mt-1.5 leading-relaxed">{proj.description}</p>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-1">
                      {proj.technologies.map((tech, idx) => (
                        <span key={idx} className="text-[9px] font-semibold text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
