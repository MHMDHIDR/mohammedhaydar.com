import { Color } from "@tiptap/extension-color";
import { Highlight } from "@tiptap/extension-highlight";
import { Image as TipTapImage } from "@tiptap/extension-image";
import { Link } from "@tiptap/extension-link";
import { ListItem } from "@tiptap/extension-list-item";
import { TextAlign } from "@tiptap/extension-text-align";
import { TextStyle } from "@tiptap/extension-text-style";
import { Underline } from "@tiptap/extension-underline";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import ImageResize from "tiptap-extension-resize-image";
import { BlogEditorMenu } from "./blog-editor-menu";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

interface BlogEditorProps {
  initialContent?: string;
  initialTitle?: string;
  onSubmit: (data: {
    title: string;
    content: string;
    published: boolean;
  }) => Promise<void>;
  submitButtonText?: string;
  postId?: string;
  isSubmitting?: boolean;
  isPublished?: boolean;
}

export function BlogEditor({
  initialContent = "",
  initialTitle = "",
  onSubmit,
  submitButtonText = "Submit",
  postId,
  isSubmitting = false,
  isPublished = false,
}: BlogEditorProps) {
  const [title, setTitle] = useState(initialTitle);
  const [published, setPublished] = useState(isPublished);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: {
          keepMarks: true,
          keepAttributes: false,
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: false,
        },
      }),
      TextStyle,
      Color.configure({ types: [TextStyle.name, ListItem.name] }),
      Highlight.configure({
        multicolor: true,
        HTMLAttributes: {
          class: "highlight",
        },
      }),
      Underline,

      // Text alignment
      TextAlign.configure({
        types: ["heading", "paragraph"],
        alignments: ["left", "center", "right", "justify"],
      }),

      // Image handling with better configuration
      TipTapImage.configure({
        inline: false,
        HTMLAttributes: {
          class: "max-w-full h-auto rounded-md mx-auto",
          style: "max-height: 500px; object-fit: contain;",
        },
      }),

      // Add image resize extension
      ImageResize.configure({
        HTMLAttributes: {
          class: "resizable-image",
        },
      }),

      // Link configuration
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-blue-600 underline hover:text-blue-800",
        },
      }),

      // List item configuration
      ListItem,
    ],
    content: initialContent,
    editorProps: {
      attributes: {
        class:
          "prose prose-lg max-w-none py-4 px-6 leading-relaxed focus:outline-none min-h-[400px] bg-white prose-headings:text-gray-900 prose-headings:font-bold prose-p:text-gray-700 prose-p:leading-relaxed prose-strong:text-gray-900 prose-strong:font-bold prose-em:text-gray-700 prose-em:italic prose-code:bg-gray-100 prose-code:px-1 prose-code:rounded prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:pl-4 prose-blockquote:italic prose-ul:list-disc prose-ol:list-decimal prose-li:text-gray-700",
      },
    },
    onCreate: (/*{ editor }*/) => {
      // Add custom styles for resizable images
      const style = document.createElement("style");
      style.textContent = `
        .resizable-image {
          position: relative;
          display: inline-block;
          transition: box-shadow 0.2s ease;
        }

        .resizable-image:hover {
          box-shadow: 0 0 0 2px #4a9eff;
        }

        .resizable-image .resize-handle {
          background: #4a9eff !important;
          border: 2px solid white !important;
          border-radius: 50% !important;
          opacity: 0;
          transition: opacity 0.2s ease;
        }

        .resizable-image:hover .resize-handle {
          opacity: 1;
        }

        .resizable-image.resizing {
          user-select: none;
          box-shadow: 0 0 0 2px #4a9eff;
        }

        .resizable-image.resizing .resize-handle {
          opacity: 1;
          background: #2563eb !important;
        }
      `;
      document.head.appendChild(style);
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!editor) return;

    const content = editor.getHTML();
    await onSubmit({
      title: title.trim(),
      content,
      published,
    });
  };

  if (!editor) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <Loader2 className="text-muted-foreground size-10 animate-spin" />
      </div>
    );
  }

  const TITLE_MIN_LENGTH = 5;
  const TITLE_MAX_LENGTH = 100;

  const isFormValid =
    title.trim().length >= TITLE_MIN_LENGTH &&
    title.trim().length <= TITLE_MAX_LENGTH &&
    editor.getText().trim().length > 0;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="blog-title" className="mb-2 block text-sm font-medium">
          Title
        </label>
        <Input
          id="blog-title"
          type="text"
          placeholder="Enter a catchy title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          minLength={TITLE_MIN_LENGTH}
          maxLength={TITLE_MAX_LENGTH}
          required
          className="w-full"
        />
        <p className="text-muted-foreground mt-1 text-xs">
          {title.length}/{TITLE_MAX_LENGTH} characters
        </p>
      </div>

      <div className="overflow-hidden rounded-lg border bg-white shadow-sm">
        <BlogEditorMenu editor={editor} postId={postId} />
        <div className="min-h-[400px]">
          <EditorContent editor={editor} />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={published}
            onChange={(e) => setPublished(e.target.checked)}
            className="size-4"
          />
          <span>Published</span>
        </label>

        <Button
          type="submit"
          disabled={!isFormValid || isSubmitting}
          className="ml-auto"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 size-4 animate-spin" />
              Submitting...
            </>
          ) : (
            submitButtonText
          )}
        </Button>
      </div>
    </form>
  );
}
