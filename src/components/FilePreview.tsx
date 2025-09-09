import React from 'react';
import { Button } from '@/components/ui/button';
import { Download, ImageIcon, FileText } from 'lucide-react';

interface FilePreviewProps {
  fileUrl: string;
  metadata: {
    fileName?: string;
    fileType?: string;
  };
  storageId: string;
  fieldName: string;
}

export const FilePreview: React.FC<FilePreviewProps> = ({
  fileUrl,
  metadata,
  storageId,
  fieldName
}) => {
  const isImage = (fileType?: string, fileName?: string) => {
    if (!fileType && !fileName) return false;
    const type = fileType?.toLowerCase() || '';
    const name = fileName?.toLowerCase() || '';
    return type.startsWith('image/') ||
           name.endsWith('.jpg') ||
           name.endsWith('.jpeg') ||
           name.endsWith('.png') ||
           name.endsWith('.gif') ||
           name.endsWith('.webp') ||
           name.endsWith('.svg') ||
           name.endsWith('.bmp') ||
           name.endsWith('.tiff');
  };

  const isImageFile = isImage(metadata.fileType, metadata.fileName);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = metadata.fileName || `${fieldName}_file`;
    link.click();
  };

  return (
    <div className="space-y-3">
      {isImageFile ? (
        <div className="space-y-2">
          <div className="border rounded-md p-2 bg-muted/20">
            <img
              src={fileUrl}
              alt={metadata.fileName || 'Uploaded image'}
              className="max-w-full max-h-64 object-contain mx-auto"
              onError={(e) => {
                // Fallback to download link if image fails to load
                e.currentTarget.style.display = 'none';
                const fallback = e.currentTarget.parentElement?.querySelector('.image-fallback');
                if (fallback) fallback.classList.remove('hidden');
              }}
            />
            <div className="hidden image-fallback mt-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleDownload}
                className="gap-2 w-full"
              >
                <Download className="h-4 w-4" />
                Download Image
              </Button>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleDownload}
            className="gap-2 w-full"
          >
            <Download className="h-4 w-4" />
            Download Original
          </Button>
        </div>
      ) : (
        <div className="space-y-2">
          <div className="flex items-center justify-center p-4 bg-muted/20 rounded-md border">
            <div className="text-center">
              <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground">
                {metadata.fileName || 'Document File'}
              </p>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleDownload}
            className="gap-2 w-full"
          >
            <Download className="h-4 w-4" />
            Download File
          </Button>
        </div>
      )}
      
      <div className="text-xs text-muted-foreground space-y-1 p-2 bg-muted/10 rounded-md">
        <p><strong>Field:</strong> <span className="capitalize">{fieldName.replace(/([A-Z])/g, ' $1').trim()}</span></p>
        {metadata.fileName && <p><strong>File Name:</strong> {metadata.fileName}</p>}
        {metadata.fileType && <p><strong>File Type:</strong> {metadata.fileType}</p>}
        <p><strong>Storage ID:</strong> <span className="font-mono text-xs break-all">{storageId}</span></p>
      </div>
    </div>
  );
};