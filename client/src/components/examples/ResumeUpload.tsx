import ResumeUpload from '../ResumeUpload';

export default function ResumeUploadExample() {
  return <ResumeUpload onUploadComplete={() => console.log('Upload complete')} />;
}
