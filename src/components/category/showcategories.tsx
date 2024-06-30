"use client";

import React, { useState } from "react";
import { Input } from "../ui/input";

const ShowCollections = ({collections}: any) => {
  const [selectedCollection, setSelectedCollection] = useState("");

  // Function to handle collection click
  const handleCollectionClick = (collection: any) => {
    setSelectedCollection(collection);
  };

  return (
    <div>
      <div className="mb-2">
        <label className="block text-sm font-medium">
          Collections
        </label>
        <Input
          required
          name="collections"
          placeholder="Collections"
          value={selectedCollection} // Set the value of the collections field
        />
        <div className="w-full flex gap-3 text-md text-bold my-5 flex-wrap">
          {/* Map over collections and create clickable text */}
          {collections.map((collection: any, index: any) => (
            <span
              key={index}
              className={`bg-[#2F2F31] text-white py-2 px-3 rounded-full cursor-pointer ${
                selectedCollection === collection.collections
                  ? "bg-gray-300"
                  : ""
              }`}
              onClick={() => handleCollectionClick(collection.collections)} // Call handleCollectionClick when clicked
            >
              + {collection.collections}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShowCollections;
