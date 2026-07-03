import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import { useState, useEffect } from "react";
import "@blocknote/core/fonts/inter.css";
import "@blocknote/mantine/style.css";

// Cloudinary image upload handler
async function uploadFile(file) {
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

  if (!cloudName || !uploadPreset) {
    alert("Cloudinary configuration missing. Please check your .env file.");
    return "https://via.placeholder.com/800x400?text=Cloudinary+Not+Configured";
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", uploadPreset);

  try {
    const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
      method: "POST",
      body: formData,
    });
    
    if (!response.ok) throw new Error("Upload failed");
    
    const data = await response.json();
    return data.secure_url;
  } catch (error) {
    console.error("Error uploading image:", error);
    return "https://via.placeholder.com/800x400?text=Upload+Failed";
  }
}

export default function Editor({ initialHTML, onChange }) {
  const editor = useCreateBlockNote({
    uploadFile,
  });

  const [ready, setReady] = useState(false);

  useEffect(() => {
    async function loadInitial() {
      if (initialHTML && editor) {
        const blocks = await editor.tryParseHTMLToBlocks(initialHTML);
        editor.replaceBlocks(editor.document, blocks);
      }
      setReady(true);
    }
    
    // Only load initial HTML once when it mounts/is provided
    if (initialHTML !== undefined && !ready) {
      loadInitial();
    } else if (initialHTML === undefined) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setReady(true);
    }
  }, [initialHTML, editor, ready]);

  if (!ready) return <div className="p-4 text-muted">Loading editor...</div>;

  return (
    <div className="border border-border rounded-xl bg-surface min-h-[500px]">
      <BlockNoteView 
        editor={editor} 
        theme="dark" // Assuming portfolio is mostly dark
        onChange={async () => {
          const html = await editor.blocksToHTMLLossy(editor.document);
          onChange(html);
        }} 
      />
    </div>
  );
}
