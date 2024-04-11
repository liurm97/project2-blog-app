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
  const [tagOptions, setTagOptions] = useState(tags);
  const preprocessedTagArr = selectedValues.map((ele) => {
    const o = new Object();
    o.Type = ele;
    return o;
  });
  // const [selectedValue, setSelectedValue] = useState(selectedValues);
  // const [selectedValues, setSelectedValues] = useState<
  //   Array<string> | undefined
  // >(undefined);
  // console.log(selectedValues);
  return (
    <>
      {dashboardState == "edit" && (
        <div style={{ color: "purple" }}>
          <Multiselect
            selectedValues={preprocessedTagArr}
            placeholder="Tags"
            selectionLimit={2}
            onSelect={(list, item) => {
              console.log("list", list);
              console.log("item", item);
              addTags(item.Type);
            }}
            onRemove={(list, item) => {
              console.log("list", list);
              console.log("item", item);
              console.log("passing in", item.Type, "to be removed");
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
      )}
    </>
  );
};
