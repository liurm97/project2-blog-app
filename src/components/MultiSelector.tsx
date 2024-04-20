import { Multiselect } from "multiselect-react-dropdown";
import { useState } from "react";
import { tagType } from "../types/tagType";

// const tags: tagType = ["Technology", "Lifestyle", "Foodie", "Music", "Other"];
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
  selectedValues,
  dashboardState,
}: {
  addTags(newTagValues: string): void;
  removeTags(tagToRemove: string): void;
  selectedValues: Array<string>;
  dashboardState: string;
}) => {
  const [tagOptions, _setTagOptions] = useState(tags);
  const preprocessedTagArr = selectedValues.map((ele) => {
    const o: any = new Object();
    o.Type = ele;
    return o;
  });
  return (
    <>
      {dashboardState == "edit" && (
        <div style={{ color: "purple" }}>
          <Multiselect
            selectedValues={preprocessedTagArr}
            placeholder="Tags"
            selectionLimit={2}
            onSelect={(_, item) => {
              addTags(item.Type);
            }}
            onRemove={(_, item) => {
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
      )}
      {dashboardState == "create" && (
        <div style={{ color: "purple" }}>
          <Multiselect
            placeholder="Tags"
            selectionLimit={2}
            onSelect={(_, item) => {
              addTags(item.Type);
            }}
            onRemove={(_, item) => {
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
      )}
    </>
  );
};
