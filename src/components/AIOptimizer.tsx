import React, { useState } from 'react';
import { CVData, ExperienceItem, SkillCategory } from '../types';
import { Sparkles, Brain, ArrowRight, Check, RefreshCw, HelpCircle, Loader2 } from 'lucide-react';

interface AIOptimizerProps {
  data: CVData;
  onUpdatePersonal: (fields: Partial<CVData['personal']>) => void;
  onUpdateExperience: (id: string, updated: ExperienceItem) => void;
  onAddSkillToCategory: (categoryId: string, skill: string) => void;
  skillsCategories: SkillCategory[];
}

export default function AIOptimizer({
  data,
  onUpdatePersonal,
  onUpdateExperience,
  onAddSkillToCategory,
  skillsCategories
}: AIOptimizerProps) {
  const [activeTool, setActiveTool] = useState<'bullet' | 'tailor' | 'skills'>('bullet');

  // STAR Bullet Optimizer States
  const [selectedExpId, setSelectedExpId] = useState<string>(data.experience[0]?.id || '');
  const [bulletDraft, setBulletDraft] = useState<string>('');
  const [isOptimizingBullet, setIsOptimizingBullet] = useState<boolean>(false);
  const [optimizedBullet, setOptimizedBullet] = useState<{ text: string; explanation: string } | null>(null);
  const [bulletError, setBulletError] = useState<string | null>(null);

  // Job Tailoring States
  const [jobDescription, setJobDescription] = useState<string>('');
  const [isTailoring, setIsTailoring] = useState<boolean>(false);
  const [tailorResult, setTailorResult] = useState<{
    summary: string;
    keywords: string[];
    tips: string;
  } | null>(null);
  const [tailorError, setTailorError] = useState<string | null>(null);

  // Skills Recommender States
  const [industry, setIndustry] = useState<string>('');
  const [roleName, setRoleName] = useState<string>(data.personal.title || '');
  const [isRecommendingSkills, setIsRecommendingSkills] = useState<boolean>(false);
  const [recommendedSkills, setRecommendedSkills] = useState<string[]>([]);
  const [skillsError, setSkillsError] = useState<string | null>(null);
  const [selectedSkillCategory, setSelectedSkillCategory] = useState<string>(skillsCategories[0]?.id || '');

  // 1. STAR Bullet Point Optimization
  const handleOptimizeBullet = async () => {
    if (!bulletDraft.trim()) {
      setBulletError("Please enter a bullet point draft to optimize.");
      return;
    }

    setIsOptimizingBullet(true);
    setBulletError(null);
    setOptimizedBullet(null);

    const activeExp = data.experience.find(exp => exp.id === selectedExpId);

    try {
      const response = await fetch('/api/gemini/optimize-bullet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          bulletText: bulletDraft,
          role: activeExp?.role || data.personal.title,
          industry: activeExp?.company || 'General'
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to optimize bullet.");
      }

      const resData = await response.json();
      setOptimizedBullet({
        text: resData.optimizedText,
        explanation: resData.explanation
      });
    } catch (err: any) {
      console.error(err);
      setBulletError(err.message || "Something went wrong while communicating with Gemini.");
    } finally {
      setIsOptimizingBullet(false);
    }
  };

  const handleApplyBullet = () => {
    if (!optimizedBullet || !selectedExpId) return;

    const activeExp = data.experience.find(exp => exp.id === selectedExpId);
    if (!activeExp) return;

    // Append optimized bullet to the experience bullets array
    const updatedBullets = [...activeExp.bullets, optimizedBullet.text];
    onUpdateExperience(selectedExpId, {
      ...activeExp,
      bullets: updatedBullets
    });

    // Reset draft or provide brief success indicator
    setBulletDraft('');
    setOptimizedBullet(null);
    alert("Successfully applied the optimized bullet point to your CV experience!");
  };

  // 2. Tailor Summary and Highlights to Job Description
  const handleTailorSummary = async () => {
    if (!jobDescription.trim()) {
      setTailorError("Please paste a target job description to tailor your profile.");
      return;
    }

    setIsTailoring(true);
    setTailorError(null);
    setTailorResult(null);

    try {
      const response = await fetch('/api/gemini/tailor-summary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          profile: {
            personal: data.personal,
            experience: data.experience.map(e => ({ role: e.role, company: e.company, bullets: e.bullets })),
            skills: data.skills
          },
          jobDescription: jobDescription
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to tailor summary.");
      }

      const resData = await response.json();
      setTailorResult({
        summary: resData.tailoredSummary,
        keywords: resData.keywordsSuggested,
        tips: resData.alignmentTips
      });
    } catch (err: any) {
      console.error(err);
      setTailorError(err.message || "Failed to tailor resume. Please try again.");
    } finally {
      setIsTailoring(false);
    }
  };

  const handleApplyTailoredSummary = () => {
    if (!tailorResult) return;
    onUpdatePersonal({ summary: tailorResult.summary });
    alert("Successfully updated your CV summary statement!");
  };

  // 3. Recommend Skills
  const handleRecommendSkills = async () => {
    setIsRecommendingSkills(true);
    setSkillsError(null);
    setRecommendedSkills([]);

    const allCurrentSkills = data.skills.flatMap(c => c.skills);

    try {
      const response = await fetch('/api/gemini/suggest-skills', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          industry: industry || 'Tech',
          role: roleName || data.personal.title,
          currentSkills: allCurrentSkills
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to suggest skills.");
      }

      const resData = await response.json();
      setRecommendedSkills(resData.recommendedSkills || []);
    } catch (err: any) {
      console.error(err);
      setSkillsError(err.message || "Failed to retrieve recommended skills.");
    } finally {
      setIsRecommendingSkills(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col h-full">
      {/* Tab Header */}
      <div className="bg-gray-50/80 px-4 py-3 border-b border-gray-100 flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-xs font-bold text-gray-800 uppercase tracking-wider">
          <Sparkles size={14} className="text-indigo-600 animate-pulse" />
          <span>Gemini AI Career Co-Pilot</span>
        </div>
        <div className="flex bg-gray-200/60 p-0.5 rounded-lg text-[10px] font-semibold">
          <button
            onClick={() => setActiveTool('bullet')}
            className={`px-2.5 py-1 rounded-md transition-colors ${activeTool === 'bullet' ? 'bg-white text-gray-900 shadow-xs' : 'text-gray-500 hover:text-gray-800'}`}
          >
            Refine Bullets
          </button>
          <button
            onClick={() => setActiveTool('tailor')}
            className={`px-2.5 py-1 rounded-md transition-colors ${activeTool === 'tailor' ? 'bg-white text-gray-900 shadow-xs' : 'text-gray-500 hover:text-gray-800'}`}
          >
            Tailor Profile
          </button>
          <button
            onClick={() => setActiveTool('skills')}
            className={`px-2.5 py-1 rounded-md transition-colors ${activeTool === 'skills' ? 'bg-white text-gray-900 shadow-xs' : 'text-gray-500 hover:text-gray-800'}`}
          >
            Suggest Skills
          </button>
        </div>
      </div>

      {/* Main Tool Area */}
      <div className="p-5 flex-1 overflow-y-auto space-y-4">
        
        {/* TOOL 1: STAR BULLET REFINER */}
        {activeTool === 'bullet' && (
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-bold text-gray-800 flex items-center gap-1.5">
                <Brain size={14} className="text-indigo-500" /> STAR-Method Bullet Refiner
              </h3>
              <p className="text-xs text-gray-500 mt-1">
                Converts weak passive phrases like <span className="italic">"was in charge of sales"</span> into metric-driven statements using Situation, Task, Action, and Result (STAR).
              </p>
            </div>

            {data.experience.length === 0 ? (
              <div className="bg-amber-50 text-amber-800 border border-amber-200/60 rounded-xl p-3 text-xs">
                Please add at least one Work Experience first to refine bullets for.
              </div>
            ) : (
              <>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest">
                    Select Target Experience
                  </label>
                  <select
                    value={selectedExpId}
                    onChange={(e) => setSelectedExpId(e.target.value)}
                    className="w-full text-xs border border-gray-200 rounded-lg p-2 bg-white focus:outline-hidden focus:ring-1 focus:ring-indigo-500"
                  >
                    {data.experience.map((exp) => (
                      <option key={exp.id} value={exp.id}>
                        {exp.role} at {exp.company}
                      </option>
                    ))}
                  </select>
                </div>
    <div className="space-y-1.5">
                  <label className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest flex justify-between">
                    <span>Your Draft Bullet Point</span>
                    <span className="text-indigo-600 cursor-pointer hover:underline" onClick={() => setBulletDraft("managed a database and resolved bottlenecks")}>
                      Try Example
                    </span>
                  </label>
                  <textarea
                    rows={3}
                    value={bulletDraft}
                    onChange={(e) => setBulletDraft(e.target.value)}
                    placeholder="e.g. helped migrate code to cloud and wrote unit tests"
                    className="w-full text-xs border border-gray-200 rounded-lg p-2.5 focus:outline-hidden focus:ring-1 focus:ring-indigo-500 font-sans"
                  />
                </div>

                <button
                  onClick={handleOptimizeBullet}
                  disabled={isOptimizingBullet || !bulletDraft.trim()}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-300 text-white text-xs font-semibold py-2 px-4 rounded-lg flex items-center justify-center gap-1.5 transition-all shadow-xs cursor-pointer"
                >
                  {isOptimizingBullet ? (
                    <>
                      <Loader2 size={13} className="animate-spin" /> Optimizing Draft...
                    </>
                  ) : (
                    <>
                      <Sparkles size={13} /> Elevate Bullet to STAR-Method
                    </>
                  )}
                </button>

                {bulletError && (
                  <div className="text-xs text-red-600 bg-red-50 p-3 rounded-lg border border-red-200/50">
                    {bulletError}
                  </div>
                )}

                {optimizedBullet && (
                  <div className="bg-indigo-50/50 rounded-xl border border-indigo-100 p-4 space-y-3 animate-fadeIn">
                    <div className="space-y-1">
                      <h4 className="text-[10px] font-extrabold text-indigo-800 uppercase tracking-widest">
                        Gemini Pro Output (Action-Oriented)
                      </h4>
                      <p className="text-xs text-gray-800 font-medium font-sans leading-relaxed">
                        • {optimizedBullet.text}
                      </p>
                    </div>

                    <div className="text-[11px] text-gray-600 italic bg-white p-2.5 rounded-lg border border-indigo-100/40">
                      <strong>AI Explanation:</strong> {optimizedBullet.explanation}
                    </div>

                    <div className="flex gap-2 pt-1">
                      <button
                        onClick={handleApplyBullet}
                        className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-bold py-1.5 px-3 rounded-md flex items-center justify-center gap-1 transition-all cursor-pointer"
                      >
                        <Check size={12} /> Apply Bullet to CV
                      </button>
                      <button
                        onClick={() => setOptimizedBullet(null)}
                        className="bg-gray-100 hover:bg-gray-200 text-gray-600 text-[11px] font-medium py-1.5 px-3 rounded-md transition-all cursor-pointer"
                      >
                        Dismiss
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        )}

        {/* TOOL 2: PROFILE TAILORING TO JD */}
        {activeTool === 'tailor' && (
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-bold text-gray-800 flex items-center gap-1.5">
                <Brain size={14} className="text-indigo-500" /> Target Job Description Tailor
              </h3>
              <p className="text-xs text-gray-500 mt-1">
                Paste a target job posting. Gemini will rewrite your professional summary and suggest essential keywords to match applicant trackers (ATS).
              </p>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest">
                Target Job Description
              </label>
              <textarea
                rows={4}
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Paste the full job posting, title, or key requirements..."
                className="w-full text-xs border border-gray-200 rounded-lg p-2.5 focus:outline-hidden focus:ring-1 focus:ring-indigo-500"
              />
            </div>

            <button
              onClick={handleTailorSummary}
              disabled={isTailoring || !jobDescription.trim()}
              className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-300 text-white text-xs font-semibold py-2 px-4 rounded-lg flex items-center justify-center gap-1.5 transition-all shadow-xs cursor-pointer"
            >
              {isTailoring ? (
                <>
                  <Loader2 size={13} className="animate-spin" /> Tailoring Profile Summary...
                </>
              ) : (
                <>
                  <Sparkles size={13} /> Tailor Resume with AI
                </>
              )}
            </button>

            {tailorError && (
              <div className="text-xs text-red-600 bg-red-50 p-3 rounded-lg border border-red-200/50">
                {tailorError}
              </div>
            )}

            {tailorResult && (
              <div className="bg-indigo-50/50 rounded-xl border border-indigo-100 p-4 space-y-4 animate-fadeIn">
                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <h4 className="text-[10px] font-extrabold text-indigo-800 uppercase tracking-widest">
                      Tailored Professional Summary
                    </h4>
                    <button
                      onClick={handleApplyTailoredSummary}
                      className="text-emerald-700 font-bold text-xs hover:underline flex items-center gap-0.5 cursor-pointer"
                    >
                      <Check size={11} /> Apply to CV
                    </button>
                  </div>
                  <p className="text-xs text-gray-700 leading-relaxed bg-white p-3 rounded-lg border border-indigo-100/40">
                    {tailorResult.summary}
                  </p>
                </div>

                <div className="space-y-1.5">
                  <h4 className="text-[10px] font-extrabold text-indigo-800 uppercase tracking-widest">
                    Recommended Keywords to Inject
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {tailorResult.keywords.map((kw, idx) => (
                      <span key={idx} className="bg-indigo-100 text-indigo-800 text-[10px] px-2 py-0.5 rounded font-medium border border-indigo-200/30">
                        {kw}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="text-[11px] text-gray-600 leading-relaxed">
                  <strong>Career Coach Alignment Advice:</strong>
                  <p className="mt-1 whitespace-pre-line bg-indigo-50/20 p-2.5 rounded-lg border border-indigo-100/10">
                    {tailorResult.tips}
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TOOL 3: SKILLS FINDER */}
        {activeTool === 'skills' && (
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-bold text-gray-800 flex items-center gap-1.5">
                <Brain size={14} className="text-indigo-500" /> Industry Skills Suggester
              </h3>
              <p className="text-xs text-gray-500 mt-1">
                Enter your target role and sector. Gemini will suggest modern, highly searched skills tags that can boost your CV's discoverability.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest">
                  Target Role
                </label>
                <input
                  type="text"
                  value={roleName}
                  onChange={(e) => setRoleName(e.target.value)}
                  placeholder="e.g. UX Designer"
                  className="w-full text-xs border border-gray-200 rounded-lg p-2 focus:outline-hidden focus:ring-1 focus:ring-indigo-500"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest">
                  Industry / Domain
                </label>
                <input
                  type="text"
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  placeholder="e.g. Fintech"
                  className="w-full text-xs border border-gray-200 rounded-lg p-2 focus:outline-hidden focus:ring-1 focus:ring-indigo-500"
                />
              </div>
            </div>

            {skillsCategories.length === 0 ? (
              <div className="bg-amber-50 text-amber-800 border border-amber-200/60 rounded-xl p-3 text-xs">
                Please create at least one Skill Category first to append suggested tags to.
              </div>
            ) : (
              <div className="space-y-1.5">
                <label className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest">
                  Category to Add Skills To
                </label>
                <select
                  value={selectedSkillCategory}
                  onChange={(e) => setSelectedSkillCategory(e.target.value)}
                  className="w-full text-xs border border-gray-200 rounded-lg p-2 bg-white focus:outline-hidden"
                >
                  {skillsCategories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.categoryName}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <button
              onClick={handleRecommendSkills}
              disabled={isRecommendingSkills || skillsCategories.length === 0}
              className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-300 text-white text-xs font-semibold py-2 px-4 rounded-lg flex items-center justify-center gap-1.5 transition-all shadow-xs cursor-pointer"
            >
              {isRecommendingSkills ? (
                <>
                  <Loader2 size={13} className="animate-spin" /> Retrieving Skills...
                </>
              ) : (
                <>
                  <Sparkles size={13} /> Find Professional Keywords
                </>
              )}
            </button>

            {skillsError && (
              <div className="text-xs text-red-600 bg-red-50 p-3 rounded-lg border border-red-200/50">
                {skillsError}
              </div>
            )}

            {recommendedSkills.length > 0 && (
              <div className="bg-indigo-50/50 rounded-xl border border-indigo-100 p-4 space-y-3 animate-fadeIn">
                <h4 className="text-[10px] font-extrabold text-indigo-800 uppercase tracking-widest">
                  Suggested Modern Industry Tags
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {recommendedSkills.map((skill, idx) => {
                    const exists = skillsCategories
                      .find(c => c.id === selectedSkillCategory)
                      ?.skills.includes(skill);

                    return (
                      <button
                        key={idx}
                        disabled={exists}
                        onClick={() => {
                          onAddSkillToCategory(selectedSkillCategory, skill);
                        }}
                        className={`text-[10px] px-2 py-1 rounded font-medium flex items-center gap-1 border transition-all cursor-pointer ${
                          exists 
                            ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed' 
                            : 'bg-white hover:bg-indigo-100 hover:border-indigo-300 text-gray-700 border-gray-200 hover:scale-102 active:scale-98'
                        }`}
                      >
                        {skill} {exists ? <Check size={10} className="text-emerald-600" /> : <span className="text-indigo-600">+</span>}
                      </button>
                    );
                  })}
                </div>
                <p className="text-[10px] text-gray-500 italic">
                  * Click any suggested tag to instantly append it to your selected category.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
