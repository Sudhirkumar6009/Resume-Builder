import React from 'react';
import { PersonalInfoForm } from './forms/PersonalInfoForm';
import { EducationForm } from './forms/EducationForm';
import { ExperienceForm } from './forms/ExperienceForm';
import { SkillsForm } from './forms/SkillsForm';
import { CertificatesForm } from './forms/CertificatesForm';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ResumeData } from './ResumeBuilder';

interface ResumeFormProps {
  resumeData: ResumeData;
  onDataUpdate: (section: keyof ResumeData, data: any) => void;
}

export const ResumeForm: React.FC<ResumeFormProps> = ({
  resumeData,
  onDataUpdate,
}) => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Resume Information</h2>

      <Tabs defaultValue="personal" className="w-full">
        <TabsList className="grid w-full grid-cols-5 mb-6">
          <TabsTrigger value="personal">Personal</TabsTrigger>
          <TabsTrigger value="education">Education</TabsTrigger>
          <TabsTrigger value="experience">Experience</TabsTrigger>
          <TabsTrigger value="skills">Skills</TabsTrigger>
          <TabsTrigger value="certificates">Certificates</TabsTrigger>
        </TabsList>

        <TabsContent value="personal" className="space-y-4">
          <PersonalInfoForm
            data={resumeData.personalInfo}
            onChange={(data) => onDataUpdate('personalInfo', data)}
          />
        </TabsContent>

        <TabsContent value="education" className="space-y-4">
          <EducationForm
            data={resumeData.education}
            onChange={(data) => onDataUpdate('education', data)}
          />
        </TabsContent>

        <TabsContent value="experience" className="space-y-4">
          <ExperienceForm
            data={resumeData.experience}
            onChange={(data) => onDataUpdate('experience', data)}
          />
        </TabsContent>

        <TabsContent value="skills" className="space-y-4">
          <SkillsForm
            data={resumeData.skills}
            onChange={(data) => onDataUpdate('skills', data)}
          />
        </TabsContent>

        <TabsContent value="certificates" className="space-y-4">
          <CertificatesForm
            data={resumeData.certificates}
            onChange={(data) => onDataUpdate('certificates', data)}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};
