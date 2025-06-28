import clsx from "clsx";
import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  Bold,
  Code,
  Code2,
  Highlighter,
  Image as ImageIcon,
  Italic,
  LetterText,
  Link,
  List,
  ListOrdered,
  Palette,
  Quote,
  Redo,
  Strikethrough,
  Trash2,
  Type,
  Underline,
  Undo,
  Upload,
} from "lucide-react";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { api } from "@/trpc/react";
import type { ButtonProps } from "@/components/ui/button";
import type { Editor } from "@tiptap/core";

interface BlogEditorMenuProps {
  editor: Editor;
  postId?: string;
}

interface EditorButtonProps extends ButtonProps {
  onClick: () => void;
  isActive?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
  tooltip?: string;
}

// Reusable button component for editor actions
const EditorButton = ({
  onClick,
  isActive,
  disabled,
  children,
  tooltip,
  ...props
}: EditorButtonProps) => (
  <Button
    variant="ghost"
    size="sm"
    className={clsx(
      "hover:bg-muted size-8 p-0",
      isActive && "bg-muted border-primary text-primary border",
    )}
    onClick={onClick}
    disabled={disabled}
    title={tooltip}
    type="button"
    {...props}
  >
    {children}
  </Button>
);

// Color palette options
const TEXT_COLORS = [
  "#000000",
  "#374151",
  "#6B7280",
  "#9CA3AF",
  "#D1D5DB",
  "#EF4444",
  "#F97316",
  "#EAB308",
  "#22C55E",
  "#3B82F6",
  "#8B5CF6",
  "#EC4899",
  "#06B6D4",
  "#10B981",
  "#F59E0B",
];

const HIGHLIGHT_COLORS = [
  "#FEF3C7",
  "#FECACA",
  "#D1FAE5",
  "#DBEAFE",
  "#E0E7FF",
  "#F3E8FF",
  "#FCE7F3",
  "#F0F9FF",
  "#ECFDF5",
  "#FEF7CD",
];

export function BlogEditorMenu({ editor, postId }: BlogEditorMenuProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const optimizeImageMutation = api.optimizeImage.optimizeImage.useMutation();
  const uploadFilesMutation = api.s3.uploadFiles.useMutation({
    onMutate: () => {
      toast({
        title: "Uploading image...",
        description: "Please wait while we upload your image.",
      });
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Image uploaded successfully.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  if (!editor) {
    return null;
  }

  // File upload handler
  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast({
        title: "Invalid file type",
        description: "Please select an image file.",
        variant: "destructive",
      });
      return;
    }

    const MAX_FILE_SIZE = 3 * 1024 * 1024; // 3MB
    if (file.size > MAX_FILE_SIZE) {
      toast({
        title: "File too large",
        description: "Image size should not exceed 3MB.",
        variant: "destructive",
      });
      return;
    }

    try {
      // Add loading placeholder
      editor
        .chain()
        .focus()
        .setImage({
          src: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' class='animate-pulse bg-muted' width='400' height='300' viewBox='0 0 400 300'%3E%3Crect width='400' height='300' fill='%23f3f4f6'/%3E%3C/svg%3E",
          alt: "Uploading...",
        })
        .run();

      // Convert file to base64
      const base64 = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });

      // Optimize image
      const optimizedBase64 = await optimizeImageMutation.mutateAsync({
        base64,
        quality: 70,
      });

      // Prepare file data for S3 upload
      const fileData = [
        {
          name: file.name.replace(/\.[^.]+$/, ".webp"),
          type: "image/webp",
          size: optimizedBase64.length,
          lastModified: file.lastModified,
          base64: optimizedBase64,
        },
      ];

      // Upload to S3
      const uploadedUrls = await uploadFilesMutation.mutateAsync({
        entityId: `blog-images/${postId ?? "new"}`,
        fileData,
      });

      // Replace loading placeholder with actual image
      if (uploadedUrls[0]) {
        editor
          .chain()
          .focus()
          .setImage({
            src: uploadedUrls[0],
            alt: file.name,
            title: file.name,
          })
          .run();
      }
    } catch (error) {
      toast({
        title: "Error",
        description:
          error instanceof Error ? error.message : "Failed to upload image",
        variant: "destructive",
      });
      // Remove loading placeholder on error
      editor.chain().focus().deleteSelection().run();
    }

    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Image URL handler
  const addImageUrl = () => {
    const url = window.prompt("Enter image URL:");
    if (url) {
      editor.chain().focus().setImage({ src: url, alt: "Blog image" }).run();
    }
  };

  // Link handler
  const addLink = () => {
    const url = window.prompt("Enter URL:");
    if (url) {
      editor.chain().focus().setLink({ href: url }).run();
    }
  };

  // Remove link
  const removeLink = () => {
    editor.chain().focus().unsetLink().run();
  };

  const MIN_FONT_SIZE = 10;
  const MAX_FONT_SIZE = 100;
  const DEFAULT_FONT_SIZES = [
    12, 14, 16, 18, 20, 24, 28, 32, 36, 40, 48, 56, 64, 72, 80, 88, 96,
  ];

  return (
    <div className="bg-muted/30 flex flex-wrap items-center gap-1 rounded-t-lg border-b p-2">
      <div className="flex items-center gap-1">
        <EditorButton
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
          tooltip="Undo"
        >
          <Undo className="size-4" />
        </EditorButton>
        <EditorButton
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
          tooltip="Redo"
        >
          <Redo className="size-4" />
        </EditorButton>
      </div>

      <Separator orientation="vertical" className="h-6" />

      <div className="flex items-center gap-1">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8">
              <Type className="mr-1 size-4" />
              Heading
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() => editor.chain().focus().setParagraph().run()}
            >
              Normal Text
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 1 }).run()
              }
            >
              Heading 1
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 2 }).run()
              }
            >
              Heading 2
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 3 }).run()
              }
            >
              Heading 3
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <Separator orientation="vertical" className="h-6" />

      <div className="flex items-center gap-1">
        <EditorButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          isActive={editor.isActive("bold")}
          tooltip="Bold"
        >
          <Bold className="size-4" />
        </EditorButton>
        <EditorButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          isActive={editor.isActive("italic")}
          tooltip="Italic"
        >
          <Italic className="size-4" />
        </EditorButton>
        <EditorButton
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          isActive={editor.isActive("underline")}
          tooltip="Underline"
        >
          <Underline className="size-4" />
        </EditorButton>
        <EditorButton
          onClick={() => editor.chain().focus().toggleStrike().run()}
          isActive={editor.isActive("strike")}
          tooltip="Strikethrough"
        >
          <Strikethrough className="size-4" />
        </EditorButton>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8">
              <LetterText className="mr-1 size-4" />
              Font Size
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-48">
            <div className="p-1">
              <p className="mb-2 flex items-center gap-1.5 text-sm font-medium">
                <span>Font Size</span>
                <small className="text-muted-foreground">
                  (max {MAX_FONT_SIZE})
                </small>
              </p>
              <div className="flex flex-col gap-1">
                <Input
                  type="number"
                  min={MIN_FONT_SIZE}
                  max={MAX_FONT_SIZE}
                  defaultValue="16"
                  placeholder="Font size"
                  onChange={(e) => {
                    const size = e.target.value;
                    if (size) {
                      editor.chain().focus().setFontSize(`${size}px`).run();
                    }
                  }}
                  className="w-full"
                />
                <div className="flex max-h-44 flex-col gap-1.5 overflow-y-auto">
                  {DEFAULT_FONT_SIZES.map((size) => (
                    <Button
                      key={size}
                      variant="ghost"
                      size="sm"
                      className={clsx(
                        "hover:bg-muted h-8 w-full p-1.5",
                        editor.isActive("textStyle", {
                          fontSize: `${size}px`,
                        }) && "bg-muted border-primary text-primary border",
                      )}
                      onClick={() =>
                        editor.chain().focus().setFontSize(`${size}px`).run()
                      }
                      title={`${size}px`}
                      type="button"
                    >
                      {size}px
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <Separator orientation="vertical" className="h-6" />

      <div className="flex items-center gap-1">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8">
              <Palette className="mr-1 size-4" />
              Text Color
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-48">
            <div className="p-2">
              <p className="mb-2 text-sm font-medium">Text Color</p>
              <div className="grid grid-cols-5 gap-1">
                {TEXT_COLORS.map((color) => (
                  <button
                    key={color}
                    className="size-6 cursor-pointer rounded border border-gray-300 transition-transform hover:scale-110"
                    style={{ backgroundColor: color }}
                    onClick={() => editor.chain().focus().setColor(color).run()}
                    title={color}
                  />
                ))}
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="mt-2 w-full"
                onClick={() => editor.chain().focus().unsetColor().run()}
              >
                Remove Color
              </Button>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8">
              <Highlighter className="mr-1 size-4" />
              Highlight
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-48">
            <div className="p-2">
              <p className="mb-2 text-sm font-medium">Highlight Color</p>
              <div className="grid grid-cols-5 gap-1">
                {HIGHLIGHT_COLORS.map((color) => (
                  <button
                    key={color}
                    className="size-6 cursor-pointer rounded border border-gray-300 transition-transform hover:scale-110"
                    style={{ backgroundColor: color }}
                    onClick={() =>
                      editor.chain().focus().setHighlight({ color }).run()
                    }
                    title={color}
                  />
                ))}
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="mt-2 w-full"
                onClick={() => editor.chain().focus().unsetHighlight().run()}
              >
                Remove Highlight
              </Button>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <Separator orientation="vertical" className="h-6" />

      <div className="flex items-center gap-1">
        <EditorButton
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          isActive={editor.isActive({ textAlign: "left" })}
          tooltip="Align Left"
        >
          <AlignLeft className="size-4" />
        </EditorButton>
        <EditorButton
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
          isActive={editor.isActive({ textAlign: "center" })}
          tooltip="Align Center"
        >
          <AlignCenter className="size-4" />
        </EditorButton>
        <EditorButton
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
          isActive={editor.isActive({ textAlign: "right" })}
          tooltip="Align Right"
        >
          <AlignRight className="size-4" />
        </EditorButton>
        <EditorButton
          onClick={() => editor.chain().focus().setTextAlign("justify").run()}
          isActive={editor.isActive({ textAlign: "justify" })}
          tooltip="Justify"
        >
          <AlignJustify className="size-4" />
        </EditorButton>
      </div>

      <Separator orientation="vertical" className="h-6" />

      <div className="flex items-center gap-1">
        <EditorButton
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          isActive={editor.isActive("bulletList")}
          tooltip="Bullet List"
        >
          <List className="size-4" />
        </EditorButton>
        <EditorButton
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          isActive={editor.isActive("orderedList")}
          tooltip="Numbered List"
        >
          <ListOrdered className="size-4" />
        </EditorButton>
      </div>

      <Separator orientation="vertical" className="h-6" />

      <div className="flex items-center gap-1">
        <EditorButton
          onClick={() => editor.chain().focus().toggleCode().run()}
          isActive={editor.isActive("code")}
          tooltip="Inline Code"
        >
          <Code className="size-4" />
        </EditorButton>
        <EditorButton
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          isActive={editor.isActive("codeBlock")}
          tooltip="Code Block"
        >
          <Code2 className="size-4" />
        </EditorButton>
        <EditorButton
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          isActive={editor.isActive("blockquote")}
          tooltip="Quote"
        >
          <Quote className="size-4" />
        </EditorButton>
      </div>

      <Separator orientation="vertical" className="h-6" />

      <div className="flex items-center gap-1">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <EditorButton
              onClick={() => null}
              isActive={editor.isActive("link")}
              tooltip="Link"
            >
              <Link className="size-4" />
            </EditorButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuItem onClick={addLink}>Add Link</DropdownMenuItem>
            {editor.isActive("link") && (
              <DropdownMenuItem onClick={removeLink}>
                Remove Link
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="hover:bg-muted size-8 p-0"
            >
              <ImageIcon className="size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuItem onClick={() => fileInputRef.current?.click()}>
              <Upload className="mr-2 size-4" />
              Upload Image
            </DropdownMenuItem>
            <DropdownMenuItem onClick={addImageUrl}>
              <Link className="mr-2 size-4" />
              Image URL
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
        />
      </div>

      <Separator orientation="vertical" className="h-6" />

      <EditorButton
        onClick={() =>
          editor.chain().focus().clearNodes().unsetAllMarks().run()
        }
        tooltip="Clear Formatting"
        variant="destructive"
        className="w-fit"
      >
        <span className="inline-flex w-fit items-center gap-1">
          Clear Formatting
          <Trash2 className="size-4" />
        </span>
      </EditorButton>
    </div>
  );
}
