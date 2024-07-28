"use client";
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

// Dynamically import CKEditor component only on the client side
const CKEditor = dynamic(() => import('@ckeditor/ckeditor5-react').then(mod => mod.CKEditor), {
  ssr: false
});

const MyEditor = () => {
  const [editorLoaded, setEditorLoaded] = useState(false);
  const [ClassicEditor, setClassicEditor] = useState(null);

  useEffect(() => {
    // Dynamically import ClassicEditor only on the client side
    import('@ckeditor/ckeditor5-build-classic')
      .then(editor => {
        setClassicEditor(editor);
        setEditorLoaded(true);
      })
      .catch(error => {
        console.error("Error loading ClassicEditor:", error);
      });
  }, []);

  const handleEditorChange = (event, editor) => {
    const data = editor.getData();
    console.log(data);
  };

  if (!editorLoaded) {
    return <p>Loading editor...</p>; // Show a loading message until ClassicEditor is loaded
  }

  return (
    <CKEditor
      editor={ClassicEditor}
      onChange={handleEditorChange}
    />
  );
};

export default MyEditor;
