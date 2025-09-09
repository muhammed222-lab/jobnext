import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Eye, Download, Edit, Trash2 } from 'lucide-react';

interface FormField {
  id: string;
  fieldType: string;
  label: string;
  name: string;
  required: boolean;
  placeholder?: string;
  options?: string[];
  validation?: string;
  conditionalLogic?: {
    dependsOn: string;
    condition: string;
    value: string;
  };
  order: number;
}

interface FormPreviewProps {
  formData: {
    title: string;
    description?: string;
    isDefault: boolean;
  };
  fields: FormField[];
  onEdit?: () => void;
  onDownload?: () => void;
  mode?: 'preview' | 'edit';
}

const FormPreview: React.FC<FormPreviewProps> = ({ 
  formData, 
  fields, 
  onEdit, 
  onDownload, 
  mode = 'preview' 
}) => {
  const renderField = (field: FormField) => {
    const fieldProps = {
      id: field.name,
      name: field.name,
      required: field.required,
      placeholder: field.placeholder,
      className: "w-full"
    };

    switch (field.fieldType) {
      case 'text':
      case 'email':
      case 'phone':
      case 'number':
      case 'url':
        return <Input type={field.fieldType} {...fieldProps} />;
      
      case 'textarea':
        return <Textarea {...fieldProps} rows={4} />;
      
      case 'select':
        return (
          <Select>
            <SelectTrigger>
              <SelectValue placeholder={field.placeholder} />
            </SelectTrigger>
            <SelectContent>
              {field.options?.filter(option => option.trim() !== '').map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      
      case 'checkbox':
        return (
          <div className="flex items-center space-x-2">
            <Checkbox id={field.name} />
            <Label htmlFor={field.name} className="text-sm">
              {field.placeholder}
            </Label>
          </div>
        );
      
      case 'radio':
        return (
          <div className="space-y-2">
            {field.options?.map((option) => (
              <div key={option} className="flex items-center space-x-2">
                <input
                  type="radio"
                  id={`${field.name}-${option}`}
                  name={field.name}
                  value={option}
                  className="h-4 w-4"
                />
                <Label htmlFor={`${field.name}-${option}`} className="text-sm">
                  {option}
                </Label>
              </div>
            ))}
          </div>
        );
      
      case 'file':
        return (
          <div className="space-y-2">
            <Input type="file" {...fieldProps} />
            <p className="text-sm text-muted-foreground">
              Maximum file size: 10MB. Allowed types: PDF, DOC, DOCX
            </p>
          </div>
        );
      
      case 'date':
        return <Input type="date" {...fieldProps} />;
      
      default:
        return <Input {...fieldProps} />;
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-2xl">{formData.title}</CardTitle>
            {formData.description && (
              <CardDescription>{formData.description}</CardDescription>
            )}
            {formData.isDefault && (
              <Badge variant="default" className="mt-2">Default Form</Badge>
            )}
          </div>
          {mode === 'preview' && (
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={onEdit}>
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </Button>
              <Button variant="outline" size="sm" onClick={onDownload}>
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          )}
        </CardHeader>
        
        <CardContent>
          <div className="space-y-6">
            {fields
              .sort((a, b) => a.order - b.order)
              .map((field) => (
                <div key={field.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor={field.name} className="text-base font-medium">
                      {field.label}
                      {field.required && <span className="text-destructive ml-1">*</span>}
                    </Label>
                    {mode === 'preview' && (
                      <Badge variant="outline" className="text-xs">
                        {field.fieldType}
                      </Badge>
                    )}
                  </div>
                  
                  {renderField(field)}
                  
                  {field.validation && mode === 'preview' && (
                    <p className="text-sm text-muted-foreground">
                      Validation: {field.validation}
                    </p>
                  )}
                  
                  {field.conditionalLogic && mode === 'preview' && (
                    <p className="text-sm text-muted-foreground">
                      Conditional: Shows when {field.conditionalLogic.dependsOn} {field.conditionalLogic.condition} "{field.conditionalLogic.value}"
                    </p>
                  )}
                </div>
              ))}
            
            {fields.length === 0 && (
              <div className="text-center py-12 text-muted-foreground">
                No fields added to this form yet.
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {mode === 'preview' && (
        <div className="flex justify-center">
          <Button size="lg">Submit Application</Button>
        </div>
      )}
    </div>
  );
};

export default FormPreview;