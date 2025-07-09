import { useDropzone } from 'react-dropzone';
import axios from 'axios';

function ImageDropZone({ onUpload }) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { 'image/*': [] },
    maxFiles: 1, //drop one at a time
    onDrop: async (acceptedFiles) => {
      if (acceptedFiles.length === 0) return;
      const file = acceptedFiles[0];
      
      const formData = new FormData();
      formData.append('image', file);

      try {
        console.log("Uploading image to server...");
        const response = await axios.post('http://localhost:3009/api/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });

        console.log("Upload success:", response.data);
        const imageUrl = response.data.imageUrl;
        onUpload(imageUrl);
      } catch (error) {
        console.error('Upload failed:', error);
        alert('Image upload failed');
      }
    }
  });

  return (
    <div
      {...getRootProps()}
      className="w-full p-6 bg-gray-700 text-center text-white border-2 border-dashed rounded cursor-pointer hover:bg-gray-600 transition"
    >
      <input {...getInputProps()} />
      {isDragActive ? <p>Drop the image here...</p> : <p>Drag & drop image here, or click to select</p>}
    </div>
  );
}

export default ImageDropZone;
