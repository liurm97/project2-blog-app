// import { testContent } from "../editorUtils/testContent";
import { defaultEditorContent } from "../editorUtils/originalContent";
import { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import {
  EditorRoot,
  EditorCommand,
  EditorCommandItem,
  EditorCommandEmpty,
  EditorContent,
  type JSONContent,
  EditorInstance,
  EditorCommandList,
} from "novel";
import { ImageResizer, handleCommandNavigation } from "novel/extensions";
import { blogEditorExtension } from "../editorUtils/blogEditorExtension";
import { uploadFn } from "../editorUtils/image-upload";
import { MultiSelector } from "./MultiSelector";

/*
 * OPTIONAL EDITOR ADD-ONs

// import { Separator } from "./ui/separator";
// import { NodeSelector } from "./selectors/node-selector";
// import { LinkSelector } from "./selectors/link-selector";
// import { ColorSelector } from "./selectors/color-selector";
*/

import { slashCommand, suggestionItems } from "./slashCommands";
import { handleImageDrop, handleImagePaste } from "novel/plugins";
import { useEditor } from "@tiptap/react";
import { json, useParams } from "react-router-dom";
import { set } from "firebase/database";
import { ref, updateMetadata, uploadString } from "firebase/storage";
import { storage, database } from "../firebase";
// import { BlogEditorHeader } from "./BlogEditorHeader";
import { saveBlog } from "../editorUtils/saveBlog";
import { postType } from "../types/postType";
import { getBlogMetadata } from "../editorUtils/getBlogMetadata";
import { updateBlog } from "../editorUtils/updateBlog";

type updateDashBoardStateFunctionType = (state: string) => void;

// const extensions = [...BlogEditorExtension, slashCommand];
const extensions = [...blogEditorExtension, slashCommand];

const AdvancedEditor = ({
  updateDashBoardState,
  dashboardState,
  editBloggerId,
  editPostId,
}: {
  updateDashBoardState: updateDashBoardStateFunctionType;
  dashboardState: string;
  editBloggerId?: string;
  editPostId?: string;
}) => {
  // get bloggerID from URL
  const { bloggerId } = useParams();

  // create random postID
  const [postMetadata, setPostMetadata] = useState<postType | undefined>(
    undefined
  );
  if (postMetadata) console.log("jsonContent", postMetadata!["jsonContent"]);

  const [postId, setPostId] = useState<string | null>(null);
  const [htmlPost, setHtmlPost] = useState<string | null>(null);
  const [jsonPost, setJsonPost] = useState<JSONContent | null>(null);

  // State for Title, Readtime, Tags
  const addTags = (newTagValue: string) => {
    setSelectedTags([...selectedTags, newTagValue]);
  };
  const removeTags = (tagToRemove: any) => {
    setSelectedTags(selectedTags.filter((val: string) => val !== tagToRemove));
  };
  const [title, setTitle] = useState<string>("");
  const [readTime, setReadTime] = useState<string>("");
  const [selectedTags, setSelectedTags] = useState<Array<string>>([]);

  useEffect(() => {
    // post Id
    setPostId(crypto.randomUUID().toString());

    const executeGetMetadata = async () => {
      const postMetadata = await getBlogMetadata(editBloggerId!, editPostId!);
      if (dashboardState == "edit") {
        if (postMetadata) {
          console.log("exec1");
          setInitialContent(JSON.parse(postMetadata!["jsonContent"]));
          setJsonPost(JSON.parse(postMetadata!["jsonContent"]));
        } else {
          console.log("exec2");
          setInitialContent({
            type: "doc",
            content: [
              {
                type: "heading",
                attrs: { level: 1 },
                content: [{ type: "text", text: "Untitled" }],
              },
            ],
          });
        }
      }
      setPostMetadata(postMetadata);
      setTitle(postMetadata!["title"]);
      setReadTime(postMetadata!["readTime"]);
      setSelectedTags([...postMetadata!["tags"]]);
    };
    if (editBloggerId !== undefined && editPostId !== undefined) {
      executeGetMetadata();
    }
  }, []);
  // set initial post content and disable automaticSave status update as this is a create
  const [initialContent, setInitialContent] = useState<null | JSONContent>(
    null
  );

  const debouncedUpdates = useDebouncedCallback(
    async (editor: EditorInstance) => {
      const json = editor.getJSON();
      const html = editor.getHTML();
      setHtmlPost(html);
      setJsonPost(json);
    },
    500
  );

  useEffect(() => {
    if (dashboardState == "create") {
      setInitialContent(defaultEditorContent);
    }
  }, []);

  if (!initialContent) return null;

  return (
    <div className="relative w-full max-w-screen-lg mx-auto my-0 z-0 flex flex-col gap-2">
      <div className="flex py-auto justify-start gap-6 items-center">
        <div>
          <label htmlFor="title">Title: </label>
          <input
            value={title}
            className="text-white bg-[#2e1139]"
            type="text"
            name="title"
            id="title"
            onChange={(e) => {
              setTitle(() => e.target.value);
            }}
          />
        </div>
        <div>
          <label htmlFor="readTime">Read Time: </label>
          <input
            value={readTime}
            className="text-white bg-[#2e1139]"
            type="text"
            name="readTime"
            id="readTime"
            onChange={(e) => {
              setReadTime(() => e.target.value);
            }}
          />
        </div>
        <MultiSelector
          addTags={addTags}
          removeTags={removeTags}
          selectedValues={selectedTags}
          dashboardState={dashboardState}
        />
      </div>
      <div className="absolute right-5 top-5 z-0 mb-5 rounded-lg bg-accent px-2 py-1 text-sm text-muted-foreground">
        {/* {saveStatus} */}
      </div>
      <EditorRoot>
        <EditorContent
          initialContent={initialContent}
          extensions={extensions}
          className="relative min-h-[500px] w-full max-w-screen-lg border-muted bg-background sm:rounded-lg sm:border sm:shadow-lg bg-[#2e1139] z-0"
          editorProps={{
            handleDOMEvents: {
              keydown: (_view, event) => handleCommandNavigation(event),
            },
            handlePaste: (view, event) =>
              handleImagePaste(view, event, uploadFn),
            handleDrop: (view, event, _slice, moved) =>
              handleImageDrop(view, event, moved, uploadFn),
            attributes: {
              class: `prose prose-lg dark:prose-invert prose-headings:font-title font-default focus:outline-none max-w-full z-0`,
            },
          }}
          onUpdate={({ editor }) => {
            debouncedUpdates(editor);
            // setSaveStatus("Unsaved");
          }}
          slotAfter={<ImageResizer />}
        >
          <EditorCommand className="z-50 h-auto max-h-[330px] overflow-y-auto rounded-md border border-muted bg-background px-1 py-2 shadow-md transition-all">
            <EditorCommandEmpty className="px-2 text-muted-foreground z-50">
              No results
            </EditorCommandEmpty>
            <EditorCommandList>
              {suggestionItems.map((item) => (
                <EditorCommandItem
                  value={item.title}
                  onCommand={(val) => item.command!(val)}
                  className={`flex w-full items-center space-x-2 rounded-md px-2 py-1 text-left text-sm hover:bg-accent aria-selected:bg-accent z-50`}
                  key={item.title}
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-md border border-muted bg-background z-50">
                    {item.icon}
                  </div>
                  <div>
                    <p className="font-medium z-50">{item.title}</p>
                    <p className="text-xs text-muted-foreground z-50">
                      {item.description}
                    </p>
                  </div>
                </EditorCommandItem>
              ))}
            </EditorCommandList>
          </EditorCommand>
        </EditorContent>
        <button
          className="border"
          onClick={() => {
            if (dashboardState == "edit") {
              console.log("edit state - save draft");
              // const { content, jsonContent } = {
              //   ...postMetadata,
              // };
              const newDraftDate = new Date().toLocaleDateString("sv-SE");
              updateBlog(editBloggerId!, editPostId!, {
                bloggerId: bloggerId,
                postId: editPostId,
                content: htmlPost,
                jsonContent: JSON.stringify(jsonPost),
                draftDate: newDraftDate,
                publishedDate: "",
                title: title,
                readTime: readTime,
                tags: selectedTags,
                status: "draft",
              }).then(() => {
                updateDashBoardState("");
              });
            } else {
              const draftDate = new Date().toLocaleDateString("sv-SE");
              saveBlog(
                bloggerId!,
                postId!,
                htmlPost!,
                jsonPost!,
                "draft",
                title,
                readTime,
                selectedTags,
                draftDate,
                ""
              );
              updateDashBoardState("");
            }
          }}
        >
          Save Draft
        </button>
        <button
          className="border"
          onClick={() => {
            if (dashboardState == "edit") {
              const newPublishedDate = new Date().toLocaleDateString("sv-SE");
              updateBlog(editBloggerId!, editPostId!, {
                bloggerId: bloggerId,
                postId: editPostId,
                content: htmlPost,
                jsonContent: JSON.stringify(jsonPost),
                draftDate: "",
                publishedDate: newPublishedDate,
                title: title,
                readTime: readTime,
                tags: selectedTags,
                status: "published",
              }).then(() => {
                updateDashBoardState("");
              });
            } else {
              const publishedDate = new Date().toLocaleDateString("sv-SE");
              saveBlog(
                bloggerId!,
                postId!,
                htmlPost!,
                jsonPost!,
                "published",
                title,
                readTime,
                selectedTags,
                "",
                publishedDate
              );
              updateDashBoardState("");
            }
          }}
        >
          Publish
        </button>
      </EditorRoot>
    </div>
  );
};

export default AdvancedEditor;