import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, FileText, File, Loader2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { analyzeResume } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import type { ResumeAnalysis } from "@shared/schema";

interface ResumeUploadProps {
  onUploadComplete: (analysis: ResumeAnalysis) => void;
}

export default function ResumeUpload({ onUploadComplete }: ResumeUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const { toast } = useToast();

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      setSelectedFile(files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;
    
    setIsUploading(true);
    setUploadProgress(0);
    
    try {
      // Simulate progress while uploading
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => Math.min(prev + 5, 90));
      }, 200);

      const analysis = await analyzeResume(selectedFile);
      
      clearInterval(progressInterval);
      setUploadProgress(100);
      
      toast({
        title: "Analysis Complete!",
        description: "Your resume has been analyzed successfully.",
      });

      setTimeout(() => {
        onUploadComplete(analysis);
      }, 500);
    } catch (error: any) {
      setIsUploading(false);
      setUploadProgress(0);
      toast({
        title: "Analysis Failed",
        description: error.message || "Failed to analyze resume. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12">
      <div className="max-w-2xl w-full">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-semibold mb-4">Upload Your Resume</h1>
          <p className="text-lg text-muted-foreground">
            Get instant AI-powered insights and career recommendations
          </p>
        </div>

        <Card className="p-8">
          {!selectedFile ? (
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-lg p-12 text-center transition-colors ${
                isDragging ? "border-primary bg-primary/5" : "border-border"
              }`}
              data-testid="dropzone-upload"
            >
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
                  <Upload className="w-10 h-10 text-primary" />
                </div>
              </div>

              <h3 className="text-xl font-semibold mb-2">
                Drag and drop your resume here
              </h3>
              <p className="text-muted-foreground mb-6">
                or click to browse from your computer
              </p>

              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileSelect}
                className="hidden"
                id="file-upload"
                data-testid="input-file"
              />
              <label htmlFor="file-upload">
                <Button asChild data-testid="button-browse">
                  <span className="cursor-pointer">Browse Files</span>
                </Button>
              </label>

              <div className="mt-8 flex items-center justify-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  <span>PDF</span>
                </div>
                <div className="flex items-center gap-2">
                  <File className="w-5 h-5" />
                  <span>DOCX</span>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-4">
                Maximum file size: 10MB
              </p>
            </div>
          ) : (
            <div>
              <div className="flex items-center gap-4 p-4 bg-muted/30 rounded-lg mb-6">
                <FileText className="w-10 h-10 text-primary" />
                <div className="flex-1">
                  <p className="font-medium" data-testid="text-filename">{selectedFile.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
                {!isUploading && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedFile(null)}
                    data-testid="button-remove"
                  >
                    Remove
                  </Button>
                )}
              </div>

              {isUploading && (
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Analyzing resume...</span>
                    <span className="text-sm text-muted-foreground">{uploadProgress}%</span>
                  </div>
                  <Progress value={uploadProgress} />
                </div>
              )}

              <Button
                onClick={handleUpload}
                disabled={isUploading}
                className="w-full gap-2"
                data-testid="button-upload"
              >
                {isUploading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Upload className="w-5 h-5" />
                    Analyze Resume
                  </>
                )}
              </Button>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
