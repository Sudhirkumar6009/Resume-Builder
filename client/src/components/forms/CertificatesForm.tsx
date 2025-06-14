
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Trash2, Plus } from 'lucide-react';

interface Certificate {
  id: string;
  name: string;
  issuer: string;
  issueDate: string;
  expiryDate?: string;
  credentialId?: string;
}

interface CertificatesFormProps {
  data: Certificate[];
  onChange: (data: Certificate[]) => void;
}

export const CertificatesForm: React.FC<CertificatesFormProps> = ({
  data,
  onChange
}) => {
  const [certificates, setCertificates] = useState<Certificate[]>(data);

  const addCertificate = () => {
    const newCertificate: Certificate = {
      id: Date.now().toString(),
      name: '',
      issuer: '',
      issueDate: '',
      expiryDate: '',
      credentialId: ''
    };
    const updatedCertificates = [...certificates, newCertificate];
    setCertificates(updatedCertificates);
    onChange(updatedCertificates);
  };

  const updateCertificate = (id: string, field: keyof Certificate, value: string) => {
    const updatedCertificates = certificates.map(cert =>
      cert.id === id ? { ...cert, [field]: value } : cert
    );
    setCertificates(updatedCertificates);
    onChange(updatedCertificates);
  };

  const removeCertificate = (id: string) => {
    const updatedCertificates = certificates.filter(cert => cert.id !== id);
    setCertificates(updatedCertificates);
    onChange(updatedCertificates);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Certifications</h3>
        <Button onClick={addCertificate} size="sm" className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add Certificate
        </Button>
      </div>

      {certificates.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          <p>No certificates added yet. Click "Add Certificate" to get started.</p>
        </div>
      )}

      {certificates.map((certificate) => (
        <Card key={certificate.id}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="text-lg">Certificate</CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => removeCertificate(certificate.id)}
              className="text-red-500 hover:text-red-700"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor={`cert-name-${certificate.id}`}>Certificate Name *</Label>
                <Input
                  id={`cert-name-${certificate.id}`}
                  value={certificate.name}
                  onChange={(e) => updateCertificate(certificate.id, 'name', e.target.value)}
                  placeholder="e.g., AWS Certified Solutions Architect"
                />
              </div>
              <div>
                <Label htmlFor={`cert-issuer-${certificate.id}`}>Issuing Organization *</Label>
                <Input
                  id={`cert-issuer-${certificate.id}`}
                  value={certificate.issuer}
                  onChange={(e) => updateCertificate(certificate.id, 'issuer', e.target.value)}
                  placeholder="e.g., Amazon Web Services"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor={`cert-issue-date-${certificate.id}`}>Issue Date *</Label>
                <Input
                  id={`cert-issue-date-${certificate.id}`}
                  type="date"
                  value={certificate.issueDate}
                  onChange={(e) => updateCertificate(certificate.id, 'issueDate', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor={`cert-expiry-date-${certificate.id}`}>Expiry Date (Optional)</Label>
                <Input
                  id={`cert-expiry-date-${certificate.id}`}
                  type="date"
                  value={certificate.expiryDate || ''}
                  onChange={(e) => updateCertificate(certificate.id, 'expiryDate', e.target.value)}
                />
              </div>
            </div>

            <div>
              <Label htmlFor={`cert-credential-${certificate.id}`}>Credential ID (Optional)</Label>
              <Input
                id={`cert-credential-${certificate.id}`}
                value={certificate.credentialId || ''}
                onChange={(e) => updateCertificate(certificate.id, 'credentialId', e.target.value)}
                placeholder="e.g., AWS-ASA-12345"
              />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
