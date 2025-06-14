import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TemplateType } from './ResumeBuilder';

interface TemplateSelectorProps {
  selectedTemplate: TemplateType;
  onTemplateChange: (template: TemplateType) => void;
}

const templates = [
  {
    id: 'modern' as TemplateType,
    name: 'Modern',
    description: 'Clean and contemporary design',
    preview: 'bg-gradient-to-br from-blue-500 to-purple-600',
    textColor: 'text-white',
  },
  {
    id: 'professional' as TemplateType,
    name: 'Professional (Most Popular)',
    description: 'Sophisticated corporate layout',
    preview: 'bg-gradient-to-br from-indigo-600 to-blue-800',
    textColor: 'text-white',
  },
  {
    id: 'creative' as TemplateType,
    name: 'Creative',
    description: 'Bold and artistic design',
    preview: 'bg-gradient-to-br from-emerald-500 to-teal-600',
    textColor: 'text-white',
  },
];

export const TemplateSelector: React.FC<TemplateSelectorProps> = ({
  selectedTemplate,
  onTemplateChange,
}) => {
  return (
    <div>
      <h2 className="text-2xl font-semibold text-center mb-6">
        Choose Your Template
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        {templates.map((template) => (
          <Card
            key={template.id}
            className={`cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg ${
              selectedTemplate === template.id
                ? 'ring-2 ring-primary ring-offset-2'
                : ''
            }`}
            onClick={() => onTemplateChange(template.id)}
          >
            <CardContent className="p-0">
              <div
                className={`${template.preview} h-32 rounded-t-lg flex items-center justify-center relative`}
              >
                <div className={`text-center ${template.textColor}`}>
                  <div className="text-sm font-semibold mb-1">Your Name</div>
                  <div className="text-xs opacity-80">Professional Title</div>
                </div>
                {selectedTemplate === template.id && (
                  <Badge className="absolute top-2 right-2 bg-white text-primary">
                    Selected
                  </Badge>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-1">{template.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {template.description}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
