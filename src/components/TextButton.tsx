import cn from "../utils";
import { EditorBubbleItem, useEditor, EditorInstance } from "novel";
import {
  BoldIcon,
  ItalicIcon,
  UnderlineIcon,
  StrikethroughIcon,
  CodeIcon,
  LucideIcon,
} from "lucide-react";
// import { Button } from "@/components/tailwind/ui/button";

export type SelectorItem = {
  name: string;
  icon: LucideIcon;
  command: (editor: ReturnType<typeof useEditor>["editor"]) => void;
  isActive: (editor: ReturnType<typeof useEditor>["editor"]) => boolean;
};

export const TextButtons = ({ editor }: { editor: any }) => {
  // const { editor } = useEditor();
  if (!editor) return null;
  const items: SelectorItem[] = [
    {
      name: "bold",
      isActive: (editor) => editor!.isActive("bold"),
      command: (editor) => editor!.chain().focus().toggleBold().run(),
      icon: BoldIcon,
    },
    {
      name: "italic",
      isActive: (editor) => editor!.isActive("italic"),
      command: (editor) => editor!.chain().focus().toggleItalic().run(),
      icon: ItalicIcon,
    },
    {
      name: "underline",
      isActive: (editor) => editor!.isActive("underline"),
      command: (editor) => editor!.chain().focus().toggleUnderline().run(),
      icon: UnderlineIcon,
    },
    {
      name: "strike",
      isActive: (editor) => editor!.isActive("strike"),
      command: (editor) => editor!.chain().focus().toggleStrike().run(),
      icon: StrikethroughIcon,
    },
    {
      name: "code",
      isActive: (editor) => editor!.isActive("code"),
      command: (editor) => editor!.chain().focus().toggleCode().run(),
      icon: CodeIcon,
    },
  ];
  return (
    <div className="flex bg-red-200 w-10">
      Buttons
      {items.map((item, index) => (
        <EditorBubbleItem
          key={index}
          onSelect={(editor) => {
            item.command(editor);
          }}
        >
          {/* <Button size="sm" className="rounded-none" variant="ghost"> */}
          <button>
            <item.icon
              className={cn("h-4 w-4", {
                "text-blue-500": item.isActive(editor),
              })}
            />
            {/* </Button> */}
          </button>
        </EditorBubbleItem>
      ))}
    </div>
  );
};
