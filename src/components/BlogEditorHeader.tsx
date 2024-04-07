import { useState } from "react";
import { MultiSelector } from "./MultiSelector";
import { tagType } from "../types/tagType";

export const BlogEditorHeader = () => {
  const addTags = (newTagValue: string) => {
    setSelectedTags([...selectedTags, newTagValue]);
  };
  const removeTags = (tagToRemove: string) => {
    setSelectedTags(selectedTags.filter((val: string) => val !== tagToRemove));
  };
  const [title, setTitle] = useState<string>("");
  const [readTime, setReadTime] = useState<string>("");
  const [selectedTags, setSelectedTags] = useState<Array<string>>([]);

  console.log(selectedTags);
  return (
    <div>
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
              console.log(e.target.value);
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
              console.log(e.target.value);
              setReadTime(() => e.target.value);
            }}
          />
        </div>
        {/* Tags */}
        <MultiSelector addTags={addTags} removeTags={removeTags} />
      </div>
    </div>
  );
};
