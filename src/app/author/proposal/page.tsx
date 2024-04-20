"use client";
import React, { useRef } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

function Proposal() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="flex w-full flex-col">
      <div className="flex flex-col gap-4 bg-[#E0F2FE] rounded-lg">
        <div className="flex flex-col text-center  justify-center items-center p-48 ">
          <h1 className="p-1">
            Drag and Drop your files
            <br />
            or
            <br />
          </h1>
          <Input
            ref={fileInputRef}
            type="file"
            className="hidden"
            id="fileInput"
          />
          <Button
            onClick={handleButtonClick}
            className="btn btn-primary bg-none cursor-pointer"
          >
            Choose File
          </Button>
        </div>
      </div>
      <div className="mt-7">
        <Label className="font-semibold text-lg" htmlFor="email">
          Keywords<span className="text-red-500">*</span>
        </Label>
        <Input
          type="text"
          placeholder="neural networks, artificial intelligence"
          required
        />
        <p className="text-sm mt-2">Keywords should be comma separated.</p>
      </div>
      <div className="mt-7">
        <Button>Submit</Button>
      </div>
    </div>
  );
}

export default Proposal;
