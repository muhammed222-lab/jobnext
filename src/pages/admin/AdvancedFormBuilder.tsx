import React, { useState, useEffect } from 'react';
import { useMutation, useQuery } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useAdminAuth } from '@/lib/useAdminAuth';
import { toast } from '@/hooks/use-toast';
import { Plus, Trash2, GripVertical, Upload, Eye, Edit, Download, ArrowLeft } from 'lucide-react';
import FormPreview from './FormPreview';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

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

// Sortable Field Item Component
// Sortable Field Item Component
const SortableFieldItem: React.FC<{
  field: FormField;
  onRemove: (id: string) => void;
}> = ({ field, onRemove }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: field.id,
    disabled: false,
    resizeObserverConfig: {}
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`flex items-start justify-between p-4 border rounded-lg bg-card text-card-foreground shadow-sm transition-shadow ${isDragging ? 'shadow-lg' : ''}`}
    >
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-2">
          <Badge variant="secondary">{field.fieldType}</Badge>
          <span className="font-medium">{field.label}</span>
          {field.required && <Badge variant="destructive">Required</Badge>}
        </div>
        <p className="text-sm text-muted-foreground">Name: {field.name}</p>
        {field.placeholder && (
          <p className="text-sm text-muted-foreground">Placeholder: {field.placeholder}</p>
        )}
        {field.options && (
          <p className="text-sm text-muted-foreground">
            Options: {field.options.join(', ')}
          </p>
        )}
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="sm"
          {...attributes}
          {...listeners}
          className="cursor-grab active:cursor-grabbing"
        >
          <GripVertical className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onRemove(field.id)}
          className="text-destructive"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

const AdvancedFormBuilder: React.FC = () => {
  const { currentUser } = useAdminAuth();
  const createFormMutation = useMutation(api.admin.createApplicationForm);
  const addFieldMutation = useMutation(api.admin.addFormField);
  const updateApplicationForm = useMutation(api.admin.updateApplicationForm);
  const forms = useQuery(api.admin.getAllApplicationForms, currentUser?._id ? { adminUserId: currentUser._id } : 'skip');

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    isDefault: false,
  });

  const [fields, setFields] = useState<FormField[]>([]);
  const [currentField, setCurrentField] = useState<Partial<FormField>>({
    fieldType: 'text',
    label: '',
    name: '',
    required: false,
    placeholder: '',
  });

  const [optionsInput, setOptionsInput] = useState('');
  const [maxFileSize, setMaxFileSize] = useState(10); // MB
  const [allowedFileTypes, setAllowedFileTypes] = useState(['pdf', 'doc', 'docx']);
  const [conditionalLogic, setConditionalLogic] = useState({
    dependsOn: '',
    condition: 'equals',
    value: ''
  });
  const [showConditionalLogic, setShowConditionalLogic] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  const [editingFormId, setEditingFormId] = useState<string | null>(null);

  const defaultForm = useQuery(api.admin.getDefaultApplicationForm);
  const defaultFormFields = useQuery(
    api.admin.getFormFields,
    defaultForm ? { formId: defaultForm._id } : 'skip'
  );

  useEffect(() => {
    if (defaultForm) {
      setFormData({
        title: defaultForm.title,
        description: defaultForm.description || '',
        isDefault: defaultForm.isDefault,
      });
      setEditingFormId(defaultForm._id);
    } else {
      // If no default form exists, create one locally
      createDefaultForm();
    }
  }, [defaultForm]);

  useEffect(() => {
    if (defaultFormFields) {
      const formattedFields = defaultFormFields.map(f => ({ ...f, id: f._id.toString() }));
      setFields(formattedFields as FormField[]);
    }
  }, [defaultFormFields]);


  const addField = () => {
    if (!currentField.label || !currentField.name) {
      toast({
        title: "Error",
        description: "Label and name are required",
        variant: "destructive",
      });
      return;
    }

    const newField: FormField = {
      id: Date.now().toString(),
      fieldType: currentField.fieldType || 'text',
      label: currentField.label,
      name: currentField.name,
      required: currentField.required || false,
      placeholder: currentField.placeholder,
      options: currentField.fieldType === 'select' || currentField.fieldType === 'radio' || currentField.fieldType === 'checkbox'
        ? optionsInput.split(',').map(opt => opt.trim()).filter(Boolean)
        : undefined,
      conditionalLogic: showConditionalLogic && conditionalLogic.dependsOn ? {
        dependsOn: conditionalLogic.dependsOn,
        condition: conditionalLogic.condition,
        value: conditionalLogic.value
      } : undefined,
      order: fields.length + 1,
    };

    setFields([...fields, newField]);
    setCurrentField({
      fieldType: 'text',
      label: '',
      name: '',
      required: false,
      placeholder: '',
    });
    setOptionsInput('');
    setConditionalLogic({
      dependsOn: '',
      condition: 'equals',
      value: ''
    });
    setShowConditionalLogic(false);
  };

  const removeField = (id: string) => {
    setFields(fields.filter(field => field.id !== id));
  };

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      setFields((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over?.id);

        return arrayMove(items, oldIndex, newIndex).map((field, index) => ({
          ...field,
          order: index + 1
        }));
      });
    }
  };

  // Edit existing form
  const startEditForm = (formId: string) => {
    setEditingFormId(formId);
    // TODO: Load form data and fields for editing
    toast({
      title: "Edit Mode",
      description: "Editing form functionality coming soon",
    });
  };

  const cancelEdit = () => {
    setEditingFormId(null);
  };

  // Create default form fields locally if none exists in DB
  const createDefaultForm = () => {
    const defaultFields: FormField[] = [
      { id: '1', fieldType: 'text', label: 'First Name', name: 'firstName', required: true, placeholder: 'Enter your first name', order: 1 },
      { id: '2', fieldType: 'text', label: 'Surname', name: 'surname', required: true, placeholder: 'Enter your surname', order: 2 },
      { id: '3', fieldType: 'text', label: 'Last Name', name: 'lastName', required: true, placeholder: 'Enter your last name', order: 3 },
      { id: '4', fieldType: 'file', label: 'ID Card Front', name: 'idCardFront', required: true, placeholder: 'Upload front of your ID card', order: 4 },
      { id: '5', fieldType: 'file', label: 'ID Card Back', name: 'idCardBack', required: true, placeholder: 'Upload back of your ID card', order: 5 },
      { id: '6', fieldType: 'file', label: 'Utility Bill', name: 'utilityBill', required: true, placeholder: 'Upload your utility bill', order: 6 },
      { id: '7', fieldType: 'file', label: 'Credit Score Report', name: 'creditScore', required: true, placeholder: 'Upload your credit score report', order: 7 },
      { id: '8', fieldType: 'email', label: 'Email Address', name: 'email', required: true, placeholder: 'Enter your email address', order: 8 },
      { id: '9', fieldType: 'phone', label: 'Phone Number', name: 'phone', required: true, placeholder: 'Enter your phone number', order: 9 },
      { id: '10', fieldType: 'file', label: 'W-2 Form', name: 'w2Form', required: true, placeholder: 'Upload your W-2 form', order: 10 },
      { id: '11', fieldType: 'text', label: 'SSN (Social Security Number)', name: 'ssn', required: true, placeholder: 'Enter your SSN', order: 11 }
    ];

    setFields(defaultFields);
    setFormData({
      title: 'Default Application Form',
      description: 'Standard application form for job applications',
      isDefault: true
    });
  };

  const saveForm = async () => {
    if (!currentUser?._id) return;

    try {
      if (editingFormId) {
        // Update existing form
        await updateApplicationForm({
          formId: editingFormId as any,
          adminUserId: currentUser._id,
          title: formData.title,
          description: formData.description,
          isDefault: formData.isDefault,
          fields: fields.map(({ id, ...rest }) => rest), // Pass fields without the local 'id'
        });
        toast({
          title: "Success",
          description: "Form updated successfully",
        });
      } else {
        // Create new form
        const formId = await createFormMutation({
          title: formData.title,
          description: formData.description,
          isDefault: formData.isDefault,
          adminUserId: currentUser._id,
        });

        for (const field of fields) {
          await addFieldMutation({
            formId: formId as any,
            fieldType: field.fieldType as any,
            label: field.label,
            name: field.name,
            required: field.required,
            placeholder: field.placeholder,
            options: field.options,
            order: field.order,
            adminUserId: currentUser._id,
          });
        }
        toast({
          title: "Success",
          description: "Form created successfully",
        });
        // After creating, set the editingFormId so next save is an update
        setEditingFormId(formId);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save form",
        variant: "destructive",
      });
    }
  };

  const fieldTypes = [
    { value: 'text', label: 'Text Input' },
    { value: 'email', label: 'Email' },
    { value: 'phone', label: 'Phone' },
    { value: 'textarea', label: 'Text Area' },
    { value: 'select', label: 'Dropdown' },
    { value: 'checkbox', label: 'Checkbox' },
    { value: 'radio', label: 'Radio Buttons' },
    { value: 'file', label: 'File Upload' },
    { value: 'url', label: 'URL' },
    { value: 'color', label: 'Color Picker' },
    { value: 'number', label: 'Number' },
    { value: 'date', label: 'Date' },
  ];

  if (previewMode) {
    return (
      <div className="space-y-6 p-4 md:p-6">
        <Button
          variant="outline"
          onClick={() => setPreviewMode(false)}
          className="mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Builder
        </Button>
        <FormPreview
          formData={formData}
          fields={fields}
          onEdit={() => setPreviewMode(false)}
          onDownload={() => {
            // Export form as JSON
            const formExport = {
              ...formData,
              fields: fields.map(f => ({
                ...f,
                id: undefined
              }))
            };
            const dataStr = JSON.stringify(formExport, null, 2);
            const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
            const exportFileDefaultName = `${formData.title.replace(/\s+/g, '_')}.json`;
            
            const linkElement = document.createElement('a');
            linkElement.setAttribute('href', dataUri);
            linkElement.setAttribute('download', exportFileDefaultName);
            linkElement.click();
          }}
        />
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Application Form Builder</h1>
          <p className="text-muted-foreground">Create and manage the default job application form.</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => setPreviewMode(true)}
            disabled={fields.length === 0}
          >
            <Eye className="h-4 w-4 mr-2" />
            Preview
          </Button>
          <Button
            onClick={saveForm}
            disabled={!formData.title || fields.length === 0}
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <Edit className="h-4 w-4 mr-2" />
            {editingFormId ? 'Update Form' : 'Create Form'}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Form Settings & Field Editor */}
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Form Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="formTitle">Form Title *</Label>
                <Input id="formTitle" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} placeholder="e.g. Standard Application" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="formDescription">Description</Label>
                <Textarea id="formDescription" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} placeholder="A brief description of the form" />
              </div>
              <div className="flex items-center space-x-2 pt-2">
                <Switch id="isDefault" checked={formData.isDefault} onCheckedChange={(checked) => setFormData({ ...formData, isDefault: checked })} />
                <Label htmlFor="isDefault">Set as default form</Label>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Add a New Field</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Field Type & Label */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fieldType">Field Type</Label>
                  <Select value={currentField.fieldType} onValueChange={(value) => setCurrentField({ ...currentField, fieldType: value })}>
                    <SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
                    <SelectContent>{fieldTypes.map(type => <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fieldLabel">Label *</Label>
                  <Input id="fieldLabel" value={currentField.label || ''} onChange={(e) => setCurrentField({ ...currentField, label: e.target.value })} placeholder="e.g. Full Name" />
                </div>
              </div>
              {/* Field Name & Placeholder */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fieldName">Field Name *</Label>
                  <Input id="fieldName" value={currentField.name || ''} onChange={(e) => setCurrentField({ ...currentField, name: e.target.value })} placeholder="e.g. fullName" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fieldPlaceholder">Placeholder</Label>
                  <Input id="fieldPlaceholder" value={currentField.placeholder || ''} onChange={(e) => setCurrentField({ ...currentField, placeholder: e.target.value })} placeholder="e.g. Enter your full name" />
                </div>
              </div>
              {/* Options for Select/Radio */}
              {(currentField.fieldType === 'select' || currentField.fieldType === 'radio' || currentField.fieldType === 'checkbox') && (
                <div className="space-y-2">
                  <Label htmlFor="fieldOptions">Options (comma-separated)</Label>
                  <Input id="fieldOptions" value={optionsInput} onChange={(e) => setOptionsInput(e.target.value)} placeholder="Option 1, Option 2" />
                </div>
              )}
              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center space-x-2">
                  <Switch id="fieldRequired" checked={currentField.required || false} onCheckedChange={(checked) => setCurrentField({ ...currentField, required: checked })} />
                  <Label htmlFor="fieldRequired">Required</Label>
                </div>
                <Button onClick={addField} size="sm"><Plus className="h-4 w-4 mr-2" />Add Field</Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Form Preview / Field List */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Form Fields</CardTitle>
              <CardDescription>Arrange and manage the fields of your form.</CardDescription>
            </CardHeader>
            <CardContent>
              {fields.length > 0 ? (
                <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                  <SortableContext items={fields.map(f => f.id)} strategy={verticalListSortingStrategy}>
                    <div className="space-y-4">
                      {fields.map((field) => (
                        <SortableFieldItem key={field.id} field={field} onRemove={removeField} />
                      ))}
                    </div>
                  </SortableContext>
                </DndContext>
              ) : (
                <div className="text-center py-12 border-2 border-dashed rounded-lg">
                  <p className="text-muted-foreground">No fields added yet.</p>
                  <p className="text-sm text-muted-foreground">Add a new field to get started.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdvancedFormBuilder;