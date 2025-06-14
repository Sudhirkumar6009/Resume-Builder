import React, { useState } from 'react';
import axios from 'axios';
import { ResumeForm } from './ResumeForm';
import { TemplateSelector } from './TemplateSelector';
import { Button } from '@/components/ui/button';
import { Download, Save, Share, Maximize } from 'lucide-react';
import { toast } from 'sonner';

export interface ResumeData {
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    summary: string;
  };
  education: Array<{
    id: string;
    institution: string;
    degree: string;
    field: string;
    startDate: string;
    endDate: string;
    gpa?: string;
  }>;
  experience: Array<{
    id: string;
    company: string;
    position: string;
    startDate: string;
    endDate: string;
    description: string;
    current: boolean;
  }>;
  skills: Array<{
    id: string;
    name: string;
    level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  }>;
  certificates: Array<{
    id: string;
    name: string;
    issuer: string;
    issueDate: string;
    expiryDate?: string;
    credentialId?: string;
  }>;
}

export type TemplateType = 'modern' | 'professional' | 'creative';

const initialResumeData: ResumeData = {
  personalInfo: {
    fullName: '',
    email: '',
    phone: '',
    address: '',
    summary: '',
  },
  education: [],
  experience: [],
  skills: [],
  certificates: [],
};

// Modern Template Component
const ModernTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
    });
  };

  const getSkillWidth = (level: string) => {
    switch (level) {
      case 'Beginner':
        return '25%';
      case 'Intermediate':
        return '50%';
      case 'Advanced':
        return '75%';
      case 'Expert':
        return '100%';
      default:
        return '50%';
    }
  };

  return (
    <div className="w-full h-full bg-white text-gray-800 font-sans">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8">
        <h1 className="text-4xl font-bold mb-2">
          {data.personalInfo.fullName || 'Your Name'}
        </h1>
        <div className="flex flex-wrap gap-4 text-sm">
          {data.personalInfo.email && <span>{data.personalInfo.email}</span>}
          {data.personalInfo.phone && <span>{data.personalInfo.phone}</span>}
          {data.personalInfo.address && (
            <span>{data.personalInfo.address}</span>
          )}
        </div>
      </div>

      <div className="flex">
        {/* Main Content */}
        <div className="flex-grow p-8">
          {/* Summary */}
          {data.personalInfo.summary && (
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-blue-600 mb-4 border-b-2 border-blue-600 pb-2">
                Professional Summary
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {data.personalInfo.summary}
              </p>
            </section>
          )}

          {/* Experience */}
          {data.experience.length > 0 && (
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-blue-600 mb-4 border-b-2 border-blue-600 pb-2">
                Experience
              </h2>
              {data.experience.map((exp) => (
                <div key={exp.id} className="mb-6">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-xl font-semibold">{exp.position}</h3>
                      <p className="text-lg text-blue-600">{exp.company}</p>
                    </div>
                    <span className="text-sm text-gray-500">
                      {formatDate(exp.startDate)} -{' '}
                      {exp.current ? 'Present' : formatDate(exp.endDate)}
                    </span>
                  </div>
                  <p className="text-gray-700 leading-relaxed">
                    {exp.description}
                  </p>
                </div>
              ))}
            </section>
          )}

          {/* Education */}
          {data.education.length > 0 && (
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-blue-600 mb-4 border-b-2 border-blue-600 pb-2">
                Education
              </h2>
              {data.education.map((edu) => (
                <div key={edu.id} className="mb-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-semibold">
                        {edu.degree} in {edu.field}
                      </h3>
                      <p className="text-lg text-blue-600">{edu.institution}</p>
                      {edu.gpa && (
                        <p className="text-sm text-gray-600">GPA: {edu.gpa}</p>
                      )}
                    </div>
                    <span className="text-sm text-gray-500">
                      {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                    </span>
                  </div>
                </div>
              ))}
            </section>
          )}

          {/* Certificates */}
          {data.certificates.length > 0 && (
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-blue-600 mb-4 border-b-2 border-blue-600 pb-2">
                Certifications
              </h2>
              {data.certificates.map((cert) => (
                <div key={cert.id} className="mb-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-semibold">{cert.name}</h3>
                      <p className="text-lg text-blue-600">{cert.issuer}</p>
                      {cert.credentialId && (
                        <p className="text-sm text-gray-600">
                          ID: {cert.credentialId}
                        </p>
                      )}
                    </div>
                    <span className="text-sm text-gray-500">
                      {formatDate(cert.issueDate)}{' '}
                      {cert.expiryDate && `- ${formatDate(cert.expiryDate)}`}
                    </span>
                  </div>
                </div>
              ))}
            </section>
          )}
        </div>

        {/* Sidebar */}
        <div className="w-80 bg-gray-50 p-8">
          {/* Skills */}
          {data.skills.length > 0 && (
            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Skills</h2>
              {data.skills.map((skill) => (
                <div key={skill.id} className="mb-4">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">{skill.name}</span>
                    <span className="text-xs text-gray-500">{skill.level}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: getSkillWidth(skill.level) }}
                    ></div>
                  </div>
                </div>
              ))}
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

// Professional Template Component (Replacing Classic)
const ProfessionalTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
    });
  };

  return (
    <div className="w-full h-full bg-white text-gray-900 font-sans p-8">
      {/* Header */}
      <div className="border-l-8 border-indigo-600 pl-6 mb-8">
        <h1 className="text-5xl font-light text-gray-800 mb-2">
          {data.personalInfo.fullName || 'Your Name'}
        </h1>
        <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mt-4">
          {data.personalInfo.email && (
            <span className="flex items-center gap-2">
              📧 {data.personalInfo.email}
            </span>
          )}
          {data.personalInfo.phone && (
            <span className="flex items-center gap-2">
              📞 {data.personalInfo.phone}
            </span>
          )}
          {data.personalInfo.address && (
            <span className="flex items-center gap-2 col-span-2">
              📍 {data.personalInfo.address}
            </span>
          )}
        </div>
      </div>

      {/* Summary */}
      {data.personalInfo.summary && (
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-indigo-600 mb-4 flex items-center gap-2">
            <div className="w-8 h-0.5 bg-indigo-600"></div>
            PROFESSIONAL SUMMARY
          </h2>
          <p className="text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-lg">
            {data.personalInfo.summary}
          </p>
        </section>
      )}

      <div className="grid grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="col-span-2">
          {/* Experience */}
          {data.experience.length > 0 && (
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-indigo-600 mb-4 flex items-center gap-2">
                <div className="w-8 h-0.5 bg-indigo-600"></div>
                EXPERIENCE
              </h2>
              {data.experience.map((exp) => (
                <div
                  key={exp.id}
                  className="mb-6 relative pl-4 border-l-2 border-indigo-200"
                >
                  <div className="absolute w-3 h-3 bg-indigo-600 rounded-full -left-2 top-2"></div>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-xl font-bold text-gray-800">
                        {exp.position}
                      </h3>
                      <p className="text-lg font-semibold text-indigo-600">
                        {exp.company}
                      </p>
                    </div>
                    <span className="text-sm text-gray-500 bg-indigo-50 px-3 py-1 rounded-full">
                      {formatDate(exp.startDate)} -{' '}
                      {exp.current ? 'Present' : formatDate(exp.endDate)}
                    </span>
                  </div>
                  <p className="text-gray-700 leading-relaxed">
                    {exp.description}
                  </p>
                </div>
              ))}
            </section>
          )}

          {/* Certificates */}
          {data.certificates.length > 0 && (
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-indigo-600 mb-4 flex items-center gap-2">
                <div className="w-8 h-0.5 bg-indigo-600"></div>
                CERTIFICATIONS
              </h2>
              <div className="grid gap-4">
                {data.certificates.map((cert) => (
                  <div
                    key={cert.id}
                    className="bg-gradient-to-r from-indigo-50 to-blue-50 p-4 rounded-lg border border-indigo-100"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-bold text-gray-800">
                          {cert.name}
                        </h3>
                        <p className="text-indigo-600 font-semibold">
                          {cert.issuer}
                        </p>
                        {cert.credentialId && (
                          <p className="text-sm text-gray-600">
                            Credential ID: {cert.credentialId}
                          </p>
                        )}
                      </div>
                      <span className="text-sm text-gray-500">
                        {formatDate(cert.issueDate)}{' '}
                        {cert.expiryDate && `- ${formatDate(cert.expiryDate)}`}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Right Column */}
        <div>
          {/* Education */}
          {data.education.length > 0 && (
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-indigo-600 mb-4">
                EDUCATION
              </h2>
              {data.education.map((edu) => (
                <div key={edu.id} className="mb-4 p-4 bg-gray-50 rounded-lg">
                  <h3 className="text-lg font-bold text-gray-800">
                    {edu.degree}
                  </h3>
                  <p className="text-indigo-600 font-semibold">{edu.field}</p>
                  <p className="text-gray-600">{edu.institution}</p>
                  <p className="text-sm text-gray-500 mt-1">
                    {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                  </p>
                  {edu.gpa && (
                    <p className="text-sm text-gray-600">GPA: {edu.gpa}</p>
                  )}
                </div>
              ))}
            </section>
          )}

          {/* Skills */}
          {data.skills.length > 0 && (
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-indigo-600 mb-4">
                SKILLS
              </h2>
              <div className="space-y-4">
                {data.skills.map((skill) => (
                  <div key={skill.id}>
                    <div className="flex justify-between mb-2">
                      <span className="font-semibold text-gray-800">
                        {skill.name}
                      </span>
                      <span className="text-sm text-indigo-600 font-medium">
                        {skill.level}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-indigo-500 to-blue-500 h-2 rounded-full transition-all duration-300"
                        style={{
                          width:
                            skill.level === 'Beginner'
                              ? '25%'
                              : skill.level === 'Intermediate'
                              ? '50%'
                              : skill.level === 'Advanced'
                              ? '75%'
                              : '100%',
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

// Creative Template Component (keeping existing)
const CreativeTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
    });
  };

  const getSkillColor = (level: string) => {
    switch (level) {
      case 'Beginner':
        return 'bg-emerald-300';
      case 'Intermediate':
        return 'bg-emerald-400';
      case 'Advanced':
        return 'bg-emerald-500';
      case 'Expert':
        return 'bg-emerald-600';
      default:
        return 'bg-emerald-400';
    }
  };

  return (
    <div className="w-full h-full bg-white text-gray-800 font-sans">
      <div className="flex">
        {/* Left Sidebar */}
        <div className="w-80 bg-gradient-to-b from-emerald-500 to-teal-600 text-white p-8">
          {/* Header */}
          <div className="mb-8 text-center">
            <div className="w-32 h-32 bg-white rounded-full mx-auto mb-4 flex items-center justify-center">
              <span className="text-4xl font-bold text-emerald-600">
                {data.personalInfo.fullName
                  ? data.personalInfo.fullName.charAt(0)
                  : 'Y'}
              </span>
            </div>
            <h1 className="text-2xl font-bold mb-2">
              {data.personalInfo.fullName || 'Your Name'}
            </h1>
          </div>

          {/* Contact */}
          <section className="mb-8">
            <h2 className="text-lg font-bold mb-4 border-b border-white/30 pb-2">
              CONTACT
            </h2>
            <div className="space-y-2 text-sm">
              {data.personalInfo.email && (
                <p className="break-words">{data.personalInfo.email}</p>
              )}
              {data.personalInfo.phone && <p>{data.personalInfo.phone}</p>}
              {data.personalInfo.address && <p>{data.personalInfo.address}</p>}
            </div>
          </section>

          {/* Skills */}
          {data.skills.length > 0 && (
            <section className="mb-8">
              <h2 className="text-lg font-bold mb-4 border-b border-white/30 pb-2">
                SKILLS
              </h2>
              <div className="space-y-3">
                {data.skills.map((skill) => (
                  <div key={skill.id}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium">{skill.name}</span>
                      <span className="text-xs">{skill.level}</span>
                    </div>
                    <div className="w-full bg-white/20 rounded-full h-2">
                      <div
                        className={`${getSkillColor(
                          skill.level
                        )} h-2 rounded-full transition-all duration-300`}
                        style={{
                          width:
                            skill.level === 'Beginner'
                              ? '25%'
                              : skill.level === 'Intermediate'
                              ? '50%'
                              : skill.level === 'Advanced'
                              ? '75%'
                              : '100%',
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Education */}
          {data.education.length > 0 && (
            <section className="mb-8">
              <h2 className="text-lg font-bold mb-4 border-b border-white/30 pb-2">
                EDUCATION
              </h2>
              {data.education.map((edu) => (
                <div key={edu.id} className="mb-4 text-sm">
                  <h3 className="font-semibold">{edu.degree}</h3>
                  <p className="text-white/80">{edu.field}</p>
                  <p className="text-white/70">{edu.institution}</p>
                  <p className="text-xs text-white/60">
                    {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                  </p>
                  {edu.gpa && (
                    <p className="text-xs text-white/60">GPA: {edu.gpa}</p>
                  )}
                </div>
              ))}
            </section>
          )}

          {/* Certificates */}
          {data.certificates.length > 0 && (
            <section>
              <h2 className="text-lg font-bold mb-4 border-b border-white/30 pb-2">
                CERTIFICATES
              </h2>
              {data.certificates.map((cert) => (
                <div key={cert.id} className="mb-4 text-sm">
                  <h3 className="font-semibold">{cert.name}</h3>
                  <p className="text-white/80">{cert.issuer}</p>
                  <p className="text-xs text-white/60">
                    {formatDate(cert.issueDate)}{' '}
                    {cert.expiryDate && `- ${formatDate(cert.expiryDate)}`}
                  </p>
                  {cert.credentialId && (
                    <p className="text-xs text-white/60">
                      ID: {cert.credentialId}
                    </p>
                  )}
                </div>
              ))}
            </section>
          )}
        </div>

        {/* Main Content */}
        <div className="flex-grow p-8">
          {/* Summary */}
          {data.personalInfo.summary && (
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-emerald-600 mb-4">
                About Me
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {data.personalInfo.summary}
              </p>
            </section>
          )}

          {/* Experience */}
          {data.experience.length > 0 && (
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-emerald-600 mb-6">
                Work Experience
              </h2>
              <div className="relative">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-emerald-200"></div>
                {data.experience.map((exp, index) => (
                  <div key={exp.id} className="relative pl-8 mb-8">
                    <div className="absolute left-0 w-4 h-4 bg-emerald-500 rounded-full -ml-2 mt-1"></div>
                    <div className="bg-gray-50 rounded-lg p-6">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="text-xl font-bold text-gray-800">
                            {exp.position}
                          </h3>
                          <p className="text-lg text-emerald-600 font-semibold">
                            {exp.company}
                          </p>
                        </div>
                        <span className="text-sm text-gray-500 bg-white px-3 py-1 rounded-full">
                          {formatDate(exp.startDate)} -{' '}
                          {exp.current ? 'Present' : formatDate(exp.endDate)}
                        </span>
                      </div>
                      <p className="text-gray-700 leading-relaxed">
                        {exp.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

// Resume Preview Component
const ResumePreview: React.FC<{
  resumeData: ResumeData;
  template: TemplateType;
  isFullScreen: boolean;
}> = ({ resumeData, template, isFullScreen }) => {
  const renderTemplate = () => {
    switch (template) {
      case 'modern':
        return <ModernTemplate data={resumeData} />;
      case 'professional':
        return <ProfessionalTemplate data={resumeData} />;
      case 'creative':
        return <CreativeTemplate data={resumeData} />;
      default:
        return <ModernTemplate data={resumeData} />;
    }
  };

  return (
    <div
      id="resume-preview"
      className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100%',
        height: '100%',
        margin: 0,
        overflow: 'auto',
        padding: 0,
        transform: isFullScreen ? 'scale(0.8)' : 'scale(1)',
        transformOrigin: 'top center',
      }}
    >
      {renderTemplate()}
    </div>
  );
};

export const ResumeBuilder = () => {
  useState<TemplateType>('modern');
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [emailInput, setEmailInput] = useState('');
  const [resumeData, setResumeData] = useState<ResumeData>(initialResumeData);
  const [selectedTemplate, setSelectedTemplate] =
    useState<TemplateType>('modern');
  const [loadingProfile, setLoadingProfile] = useState(false);

  // Map backend profile to ResumeData
  const mapProfileToResumeData = (profile: any): ResumeData => ({
    personalInfo: {
      fullName: profile.name || '',
      email: profile.email || '',
      phone: profile.phone || '',
      address: '',
      summary: '',
    },
    education: (profile.education || []).map((edu: any, idx: number) => ({
      id: String(idx),
      institution: edu.school || '',
      degree: edu.degree?.split(' in ')[0] || '',
      field: edu.degree?.split(' in ')[1] || '',
      startDate: '',
      endDate: edu.year ? `${edu.year}-06` : '',
      gpa: '',
    })),
    experience: (profile.experience || []).map((exp: any, idx: number) => ({
      id: String(idx),
      company: exp.company || '',
      position: exp.role || '',
      startDate: exp.startDate || '',
      endDate: exp.endDate || '',
      description: exp.description || '',
      current: exp.current || false,
    })),
    skills: (profile.skills || []).map((skill: any, idx: number) => ({
      id: String(idx),
      name: skill.name || skill, // fallback if skill is string
      level: skill.level || 'Intermediate',
    })),
    certificates: (profile.certificates || []).map(
      (cert: any, idx: number) => ({
        id: String(idx),
        name: cert.name || '',
        issuer: cert.issuer || '',
        issueDate: cert.issueDate || '',
        expiryDate: cert.expiryDate || '',
        credentialId: cert.credentialId || '',
      })
    ),
  });

  // Fetch profile by email
  const handleFetchProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput) return;
    setLoadingProfile(true);
    try {
      const res = await axios.get(
        `http://localhost:5000/api/profile/${encodeURIComponent(emailInput)}`
      );
      if (res.data) {
        setResumeData(mapProfileToResumeData(res.data));
        setSelectedTemplate(res.data.template || 'modern');
        toast.success('Profile loaded!');
      } else {
        toast.error('No profile found for this email.');
      }
    } catch (err) {
      toast.error('Failed to fetch profile.');
    } finally {
      setLoadingProfile(false);
    }
  };

  const handleDataUpdate = (section: keyof ResumeData, data: any) => {
    setResumeData((prev) => ({
      ...prev,
      [section]: data,
    }));
  };

  const handleSaveResume = () => {
    localStorage.setItem('resumeData', JSON.stringify(resumeData));
    localStorage.setItem('selectedTemplate', selectedTemplate);
    toast.success('Resume saved successfully!');
  };

  const handleShareProfile = () => {
    const resumeId = Date.now().toString(); // Simple ID generation
    const shareData = {
      resumeData,
      selectedTemplate,
      id: resumeId,
    };

    // Save to localStorage with unique ID
    localStorage.setItem(
      `shared_resume_${resumeId}`,
      JSON.stringify(shareData)
    );

    // Create shareable link
    const shareUrl = `${window.location.origin}/?shared=${resumeId}`;

    // Copy to clipboard
    navigator.clipboard
      .writeText(shareUrl)
      .then(() => {
        toast.success('Profile link copied to clipboard!', {
          description: 'Share this link to let others view your resume',
        });
      })
      .catch(() => {
        toast.error('Failed to copy link to clipboard');
      });
  };

  const handleDownloadPDF = async () => {
    try {
      const element = document.getElementById('resume-preview');
      if (!element) {
        toast.error('Resume preview not found.');
        return;
      }

      // Save original styles
      const originalTransform = element.style.transform;
      const originalPosition = element.style.position;
      const originalWidth = element.style.width;
      const originalHeight = element.style.height;
      const originalTop = element.style.top;
      const originalLeft = element.style.left;
      const originalRight = element.style.right;
      const originalBottom = element.style.bottom;

      // Remove scaling and positioning for PDF rendering
      element.style.transform = 'scale(1)';
      element.style.position = 'static';
      element.style.width = '794px'; // A4 width in px at 96dpi
      element.style.height = '1123px'; // A4 height in px at 96dpi
      element.style.top = '';
      element.style.left = '';
      element.style.right = '';
      element.style.bottom = '';

      const html2pdf = (await import('html2pdf.js')).default;

      const opt = {
        margin: 0,
        filename: `${resumeData.personalInfo.fullName || 'Resume'}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: 'px', format: [794, 1123], orientation: 'portrait' },
      };

      await html2pdf().set(opt).from(element).save();

      // Restore original styles
      element.style.transform = originalTransform;
      element.style.position = originalPosition;
      element.style.width = originalWidth;
      element.style.height = originalHeight;
      element.style.top = originalTop;
      element.style.left = originalLeft;
      element.style.right = originalRight;
      element.style.bottom = originalBottom;

      toast.success('PDF downloaded successfully!');
    } catch (error) {
      toast.error('Failed to download PDF. Please try again.');
    }
  };

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };

  // Map ResumeData to backend format
  const mapResumeDataToProfile = (
    resumeData: ResumeData,
    template: string
  ) => ({
    name: resumeData.personalInfo.fullName,
    email: resumeData.personalInfo.email,
    phone: resumeData.personalInfo.phone,
    education: resumeData.education.map((edu) => ({
      school: edu.institution,
      degree: `${edu.degree}${edu.field ? ' in ' + edu.field : ''}`,
      year: edu.endDate ? new Date(edu.endDate).getFullYear().toString() : '',
    })),
    experience: resumeData.experience.map((exp) => ({
      company: exp.company,
      role: exp.position,
      startDate: exp.startDate,
      endDate: exp.endDate,
      description: exp.description,
      current: exp.current,
    })),
    skills: resumeData.skills.map((skill) => ({
      name: skill.name,
      level: skill.level,
    })),
    certificates: resumeData.certificates.map((cert) => ({
      name: cert.name,
      issuer: cert.issuer,
      issueDate: cert.issueDate,
      expiryDate: cert.expiryDate || '',
      credentialId: cert.credentialId || '',
    })),
    template,
  });

  const handleSaveToServer = async () => {
    try {
      const profileData = mapResumeDataToProfile(resumeData, selectedTemplate);
      await axios.post(`http://localhost:5000/api/profile/save`, profileData);
      toast.success('Resume saved to server!');
    } catch (error) {
      toast.error('Failed to save resume to server.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        {/* Email Fetch Field */}
        <form onSubmit={handleFetchProfile} className="flex items-center gap-2">
          <input
            type="email"
            value={emailInput}
            onChange={(e) => setEmailInput(e.target.value)}
            placeholder="Enter your email"
            className="border rounded px-3 py-1 text-black"
            required
          />
          <button
            type="submit"
            className="bg-white text-blue-600 px-3 py-1 rounded font-semibold"
            disabled={loadingProfile}
          >
            {loadingProfile ? 'Loading...' : 'Fetch'}
          </button>
        </form>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-primary mb-2">
            Resume Builder
          </h1>
          <p className="text-muted-foreground text-m">
            Create your professional resume in minutes
          </p>
        </div>

        {/* Template Selector */}
        <div className="mb-8">
          <TemplateSelector
            selectedTemplate={selectedTemplate}
            onTemplateChange={setSelectedTemplate}
          />
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4 mb-8">
          <Button
            onClick={handleSaveResume}
            className="flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            Save Resume
          </Button>
          <Button
            onClick={handleDownloadPDF}
            variant="outline"
            className="flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Download PDF
          </Button>
          <Button
            onClick={handleShareProfile}
            variant="outline"
            className="flex items-center gap-2"
          >
            <Share className="w-4 h-4" />
            Share Profile
          </Button>
          <Button
            onClick={toggleFullScreen}
            variant="outline"
            className="flex items-center gap-2"
          >
            <Maximize className="w-4 h-4" />
            {isFullScreen ? 'Exit Full Screen' : 'Full Screen Preview'}
          </Button>
          <Button
            onClick={handleSaveToServer}
            variant="outline"
            className="flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            Save to Server
          </Button>
        </div>

        {/* Main Content */}
        <div
          className={`gap-8 max-w-7xl mx-auto ${
            isFullScreen
              ? 'grid grid-cols-1'
              : 'grid grid-cols-1 lg:grid-cols-2'
          }`}
        >
          {/* Form Section */}
          {!isFullScreen && (
            <div className="bg-white rounded-xl shadow-lg p-6 h-fit">
              <ResumeForm
                resumeData={resumeData}
                onDataUpdate={handleDataUpdate}
              />
            </div>
          )}

          <div
            className={`bg-white rounded-xl shadow-lg p-6 ${
              isFullScreen ? '' : 'sticky top-8'
            }`}
            style={{
              position: isFullScreen ? 'fixed' : undefined,
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: isFullScreen ? 50 : undefined,
              width: isFullScreen ? '100vw' : undefined,
              height: isFullScreen ? '100vh' : undefined,
              padding: isFullScreen ? 0 : undefined,
            }}
          >
            {isFullScreen && (
              <button
                onClick={toggleFullScreen}
                style={{
                  position: 'fixed',
                  top: 24,
                  right: 24,
                  zIndex: 100,
                  background: '#fff',
                  border: '1px solid #ddd',
                  borderRadius: '9999px',
                  padding: '0.5rem 1.25rem',
                  fontWeight: 600,
                  boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                  cursor: 'pointer',
                }}
              >
                Exit Full Screen
              </button>
            )}
            <ResumePreview
              resumeData={resumeData}
              template={selectedTemplate}
              isFullScreen={isFullScreen}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
