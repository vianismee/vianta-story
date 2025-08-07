"use client";
import React from "react";
import MultipleSelector, { Option } from "@/components/ui/multiple-selector";
import { Label } from "@/components/ui/label";

interface MultipleSelectorControlledProps {
  value: Option[];
  onChange: (value: Option[]) => void;
}

const CATEGORY: Option[] = [
  { label: "Coffeshop", value: "coffeshop" },
  { label: "Hidden Gem", value: "hidden-gem" },
  { label: "Travel", value: "travel" },
];

const MultipleSelectorControlled = ({
  value,
  onChange,
}: MultipleSelectorControlledProps) => {
  return (
    <div className="flex flex-col gap-2">
      <Label>Category</Label>
      <MultipleSelector
        value={value}
        onChange={onChange}
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
