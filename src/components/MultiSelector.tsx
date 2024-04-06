import { Multiselect } from "multiselect-react-dropdown";
import { useState } from "react";
import { tagType } from "../types/tagType";

const tags: Array<tagType> = [
  {
    Type: "Technology",
  },
  {
    Type: "Lifestyle",
  },
  {
    Type: "Foodie",
  },
  {
    Type: "Music",
  },
  {
    Type: "Other",
  },
];
export const MultiSelector = ({
  addTags,
  removeTags,
}: {
  addTags(newTagValues: string): void;
  removeTags(tagToRemove: string): void;
}) => {
  const [tagOptions, setTagOptions] = useState(tags);
  return (
    <div style={{ color: "purple" }}>
      <Multiselect
        placeholder="Tags"
        selectionLimit={2}
        onSelect={(list, item) => {
          addTags(item.Type);
        }}
        onRemove={(list, item) => {
          removeTags(item.Type);
        }}
        options={tagOptions}
        displayValue="Type"
        style={{
          chips: {
            background: "purple",
          },
          multiselectContainer: {
            border: "1px solid white",
            borderRadius: "10px",
            color: "black",
            fontSize: "14px",
          },
          searchBox: {
            color: "white",
            border: "1px solid white",
            borderRadius: "10px",
            fontSize: "14px",
          },
        }}
      />
    </div>
  );
};
