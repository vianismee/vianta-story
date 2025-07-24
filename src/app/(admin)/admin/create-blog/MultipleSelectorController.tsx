"use client";
import React from "react";
import MultipleSelector, { Option } from "@/components/ui/multiple-selector";
import { Label } from "@/components/ui/label";

const CATEGORY: Option[] = [
  { label: "Caffe", value: "Caffe" },
  { label: "Cozy", value: "Cozy" },
];

const MultipleSelectorControlled = () => {
  const [value, setValue] = React.useState<Option[]>([]);
  return (
    <div className="flex flex-col gap-2">
      <Label>Category</Label>
      <MultipleSelector
        value={value}
        onChange={setValue}
        defaultOptions={CATEGORY}
        placeholder="Select Blog Category"
        className="bg-white"
        emptyIndicator={
          <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
            no results found.
          </p>
        }
      />
    </div>
  );
};

export default MultipleSelectorControlled;
