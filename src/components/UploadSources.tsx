/**
 * Upload Sources Component
 * Multi-source input interface for PDFs, documents, images, audio, video, and other sources
 * Includes drag-and-drop support, metadata fields, validation, and real-time AI processing feedback
 */
import { useState } from 'react';
import { toast } from 'sonner@2.0.3';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import {
  FileText,
  Image,
  Video,
  Mic,
  Link,
  Upload,
  File,
  X,
  CheckCircle,
  FileSpreadsheet,
  Loader2,
  AlertCircle,
  Network,
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

interface UploadedFile {
  id: string;
  name: string;
  type: string;
  size: number;
  progress: number;
  status: 'uploading' | 'processing' | 'analyzing' | 'complete' | 'warning' | 'error';
  processingStage?: string;
  warning?: string;
}

export default function UploadSources() {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const [metadata, setMetadata] = useState({
    title: '',
    description: '',
    date: '',
    sourceType: '',
    tags: '',
  });

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(e.target.files);
    }
  };

  const handleFiles = (files: FileList) => {
    const newFiles: UploadedFile[] = Array.from(files).map((file) => {
      // Store file in localStorage (for demo purposes)
      const reader = new FileReader();
      reader.onload = (e) => {
        const fileData = {
          name: file.name,
          type: file.type,
          size: file.size,
          data: e.target?.result,
          uploadDate: new Date().toISOString(),
        };
        
        // Save to localStorage
        const savedFiles = JSON.parse(localStorage.getItem('uploadedFiles') || '[]');
        savedFiles.push(fileData);
        localStorage.setItem('uploadedFiles', JSON.stringify(savedFiles));
      };
      
      // Read file as data URL
      if (file.size < 10 * 1024 * 1024) { // Only store files < 10MB
        reader.readAsDataURL(file);
      }
      
      return {
        id: Math.random().toString(36).substr(2, 9),
        name: file.name,
        type: file.type || 'application/octet-stream',
        size: file.size,
        progress: 0,
        status: 'uploading' as const,
      };
    });

    setUploadedFiles((prev) => [...prev, ...newFiles]);

    // Simulate upload progress
    newFiles.forEach((file) => {
      simulateUpload(file.id);
    });
  };

  const simulateUpload = (fileId: string) => {
    let progress = 0;
    const stages = [
      'Uploading file...',
      'Extracting text content...',
      'Analyzing entities...',
      'Building relationships...',
      'Updating knowledge graph...',
      'Complete',
    ];
    let currentStage = 0;

    const interval = setInterval(() => {
      progress += 10;
      
      if (progress >= 20 * (currentStage + 1) && currentStage < stages.length - 1) {
        currentStage++;
      }

      setUploadedFiles((prev) =>
        prev.map((f) => {
          if (f.id !== fileId) return f;
          
          let status: UploadedFile['status'] = 'uploading';
          let warning: string | undefined;
          
          if (progress < 30) {
            status = 'uploading';
          } else if (progress < 90) {
            status = 'processing';
          } else if (progress < 100) {
            status = 'analyzing';
          } else {
            // Randomly assign warning for demo
            const hasWarning = Math.random() > 0.7;
            if (hasWarning) {
              status = 'warning';
              warning = 'Potential contradiction detected with existing documents';
            } else {
              status = 'complete';
            }
          }

          return {
            ...f,
            progress,
            status,
            processingStage: stages[currentStage],
            warning,
          };
        })
      );

      if (progress >= 100) {
        clearInterval(interval);
        
        // Show success toast
        const file = uploadedFiles.find(f => f.id === fileId);
        if (file) {
          toast.success(`${file.name} uploaded and processed successfully! ✅`);
        }
      }
    }, 300);
  };

  const removeFile = (fileId: string) => {
    setUploadedFiles((prev) => prev.filter((f) => f.id !== fileId));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-gray-900">Upload Sources</h2>
        <p className="text-gray-600 mt-1">
          Upload documents, images, audio, video, and other sources for AI processing
        </p>
      </div>

      <Tabs defaultValue="files" className="w-full">
        <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-grid">
          <TabsTrigger value="files">Files</TabsTrigger>
          <TabsTrigger value="audio">Audio/Voice</TabsTrigger>
          <TabsTrigger value="video">Video</TabsTrigger>
          <TabsTrigger value="other">Other Sources</TabsTrigger>
        </TabsList>

        {/* Files Upload Tab */}
        <TabsContent value="files" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Upload Documents & Images</CardTitle>
              <CardDescription>
                Supported formats: PDF, DOC, DOCX, XLS, XLSX, TXT, JPG, PNG (Max 50MB per file)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div
                className={`
                  border-2 border-dashed rounded-lg p-12 text-center 
                  transition-all-smooth relative overflow-hidden
                  ${dragActive 
                    ? 'border-blue-500 bg-gradient-to-br from-blue-50 to-blue-100 scale-[1.02]' 
                    : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'
                  }
                `}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                {dragActive && (
                  <div className="absolute inset-0 bg-blue-500/10 animate-pulse" />
                )}
                <Upload className={`
                  w-12 h-12 mx-auto mb-4 transition-all-smooth
                  ${dragActive ? 'text-blue-600 scale-110 animate-bounce' : 'text-gray-400'}
                `} />
                <p className={`mb-2 transition-colors ${dragActive ? 'text-blue-900' : 'text-gray-900'}`}>
                  Drag and drop your files here, or click to browse
                </p>
                <p className={`text-sm mb-4 transition-colors ${dragActive ? 'text-blue-700' : 'text-gray-500'}`}>
                  Upload PDF, Word, Excel, images, and text files
                </p>
                <input
                  type="file"
                  multiple
                  onChange={handleFileInput}
                  className="hidden"
                  id="file-upload"
                  accept=".pdf,.doc,.docx,.xls,.xlsx,.txt,.jpg,.jpeg,.png,.gif"
                />
                <Button asChild className="hover:scale-105 transition-transform">
                  <label htmlFor="file-upload" className="cursor-pointer">
                    Select Files
                  </label>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Metadata Section */}
          <Card>
            <CardHeader>
              <CardTitle>Source Metadata (Optional)</CardTitle>
              <CardDescription>Add additional context to your uploaded files</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    placeholder="Enter document title"
                    value={metadata.title}
                    onChange={(e) => setMetadata({ ...metadata, title: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="date">Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={metadata.date}
                    onChange={(e) => setMetadata({ ...metadata, date: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe the content and purpose of this source"
                  value={metadata.description}
                  onChange={(e) => setMetadata({ ...metadata, description: e.target.value })}
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="sourceType">Source Type</Label>
                  <Select value={metadata.sourceType} onValueChange={(value) => setMetadata({ ...metadata, sourceType: value })}>
                    <SelectTrigger id="sourceType">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="meeting">Meeting Notes</SelectItem>
                      <SelectItem value="report">Report</SelectItem>
                      <SelectItem value="presentation">Presentation</SelectItem>
                      <SelectItem value="research">Research</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="tags">Tags (comma separated)</Label>
                  <Input
                    id="tags"
                    placeholder="tag1, tag2, tag3"
                    value={metadata.tags}
                    onChange={(e) => setMetadata({ ...metadata, tags: e.target.value })}
                  />
                </div>
              </div>

              <div className="flex justify-end mt-4">
                <Button 
                  onClick={() => {
                    // Save metadata to the most recent uploaded file
                    const savedFiles = JSON.parse(localStorage.getItem('uploadedFiles') || '[]');
                    if (savedFiles.length > 0) {
                      savedFiles[savedFiles.length - 1].metadata = metadata;
                      localStorage.setItem('uploadedFiles', JSON.stringify(savedFiles));
                      toast.success('Metadata saved successfully! ✅');
                      // Reset metadata form
                      setMetadata({
                        title: '',
                        description: '',
                        date: '',
                        sourceType: '',
                        tags: '',
                      });
                    } else {
                      toast.error('Please upload a file first');
                    }
                  }}
                  className="hover:scale-105 transition-transform"
                >
                  Save Metadata
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Quick Notes Section */}
          <Card>
            <CardHeader>
              <CardTitle>Add Quick Notes</CardTitle>
              <CardDescription>Create text notes without uploading a file</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="note-title">Note Title</Label>
                <Input
                  id="note-title"
                  placeholder="Enter note title"
                />
              </div>
              <div>
                <Label htmlFor="note-content">Note Content</Label>
                <Textarea
                  id="note-content"
                  placeholder="Type your notes here..."
                  rows={6}
                />
              </div>
              <div className="flex justify-end">
                <Button 
                  onClick={() => {
                    const noteTitle = (document.getElementById('note-title') as HTMLInputElement)?.value;
                    const noteContent = (document.getElementById('note-content') as HTMLTextAreaElement)?.value;
                    
                    if (noteTitle && noteContent) {
                      const savedFiles = JSON.parse(localStorage.getItem('uploadedFiles') || '[]');
                      savedFiles.push({
                        name: noteTitle + '.txt',
                        type: 'text/plain',
                        size: noteContent.length,
                        data: noteContent,
                        uploadDate: new Date().toISOString(),
                        isNote: true,
                      });
                      localStorage.setItem('uploadedFiles', JSON.stringify(savedFiles));
                      toast.success(`Note "${noteTitle}" saved successfully! 📝`);
                      
                      // Clear form
                      (document.getElementById('note-title') as HTMLInputElement).value = '';
                      (document.getElementById('note-content') as HTMLTextAreaElement).value = '';
                    } else {
                      toast.error('Please fill in both title and content');
                    }
                  }}
                  className="hover:scale-105 transition-transform"
                >
                  Save Note
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Audio/Voice Upload Tab */}
        <TabsContent value="audio" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Record Live Audio</CardTitle>
                <CardDescription>Record voice notes or meeting audio in real-time</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-center p-12 border-2 border-gray-300 rounded-lg">
                  <div className="text-center">
                    <div className="w-20 h-20 mx-auto bg-red-50 rounded-full flex items-center justify-center mb-4">
                      <Mic className="w-10 h-10 text-red-600" />
                    </div>
                    <Button>Start Recording</Button>
                    <p className="text-sm text-gray-500 mt-3">Click to begin voice recording</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Upload Audio File</CardTitle>
                <CardDescription>Upload existing audio files (MP3, WAV, M4A)</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-center p-12 border-2 border-dashed border-gray-300 rounded-lg">
                  <div className="text-center">
                    <Mic className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                    <input
                      type="file"
                      className="hidden"
                      id="audio-upload"
                      accept="audio/*"
                      onChange={handleFileInput}
                    />
                    <Button asChild variant="outline">
                      <label htmlFor="audio-upload" className="cursor-pointer">
                        Select Audio File
                      </label>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Video Upload Tab */}
        <TabsContent value="video" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Upload Video File</CardTitle>
                <CardDescription>Upload video files (MP4, MOV, AVI)</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center p-12 border-2 border-dashed border-gray-300 rounded-lg">
                  <div className="text-center">
                    <Video className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                    <input
                      type="file"
                      className="hidden"
                      id="video-upload"
                      accept="video/*"
                      onChange={handleFileInput}
                    />
                    <Button asChild variant="outline">
                      <label htmlFor="video-upload" className="cursor-pointer">
                        Select Video File
                      </label>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>YouTube URL</CardTitle>
                <CardDescription>Import video from YouTube</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="youtube-url">YouTube URL</Label>
                  <Input
                    id="youtube-url"
                    placeholder="https://www.youtube.com/watch?v=..."
                  />
                </div>
                <Button className="w-full">Import from YouTube</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Other Sources Tab */}
        <TabsContent value="other" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Web Link</CardTitle>
                <CardDescription>Import content from a URL</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="web-url">URL</Label>
                  <Input id="web-url" placeholder="https://example.com" />
                </div>
                <Button className="w-full">Import from URL</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Text/Chat Transcript</CardTitle>
                <CardDescription>Paste email or chat content</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="text-content">Content</Label>
                  <Textarea
                    id="text-content"
                    placeholder="Paste your text content here..."
                    rows={6}
                  />
                </div>
                <Button className="w-full">Save Content</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Uploaded Files List */}
      {uploadedFiles.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Uploaded Files</CardTitle>
            <CardDescription>{uploadedFiles.length} file(s) uploaded</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {uploadedFiles.map((file, index) => (
                <div 
                  key={file.id} 
                  className={`
                    flex items-center gap-4 p-4 border rounded-lg
                    transition-all-smooth animate-slide-up
                    ${file.status === 'processing' || file.status === 'analyzing' 
                      ? 'border-blue-300 bg-blue-50/50 processing-indicator' 
                      : file.status === 'warning'
                      ? 'border-orange-300 bg-orange-50/50'
                      : file.status === 'complete'
                      ? 'border-green-300 bg-green-50/50'
                      : 'border-gray-200'
                    }
                  `}
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    {file.type.includes('image') ? (
                      <Image className="w-5 h-5 text-blue-600" />
                    ) : file.type.includes('sheet') ? (
                      <FileSpreadsheet className="w-5 h-5 text-blue-600" />
                    ) : file.type.includes('video') ? (
                      <Video className="w-5 h-5 text-blue-600" />
                    ) : file.type.includes('audio') ? (
                      <Mic className="w-5 h-5 text-blue-600" />
                    ) : (
                      <FileText className="w-5 h-5 text-blue-600" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900 truncate">{file.name}</p>
                    <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                    
                    {file.processingStage && file.status !== 'complete' && (
                      <p className="text-xs text-blue-600 mt-1 flex items-center gap-1">
                        <Loader2 className="w-3 h-3 animate-spin" />
                        {file.processingStage}
                      </p>
                    )}
                    
                    {file.warning && (
                      <p className="text-xs text-orange-600 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {file.warning}
                      </p>
                    )}
                    
                    {(file.status === 'uploading' || file.status === 'processing' || file.status === 'analyzing') && (
                      <Progress value={file.progress} className="h-1 mt-2" />
                    )}
                  </div>

                  <Badge
                    variant={
                      file.status === 'complete'
                        ? 'default'
                        : file.status === 'warning'
                        ? 'secondary'
                        : file.status === 'error'
                        ? 'destructive'
                        : 'outline'
                    }
                    className={
                      file.status === 'warning'
                        ? 'bg-orange-100 text-orange-700 border-orange-300'
                        : ''
                    }
                  >
                    {file.status === 'complete' && <CheckCircle className="w-3 h-3 mr-1" />}
                    {file.status === 'warning' && <AlertCircle className="w-3 h-3 mr-1" />}
                    {(file.status === 'processing' || file.status === 'analyzing') && (
                      <Loader2 className="w-3 h-3 mr-1 animate-spin" />
                    )}
                    {file.status}
                  </Badge>

                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeFile(file.id)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
