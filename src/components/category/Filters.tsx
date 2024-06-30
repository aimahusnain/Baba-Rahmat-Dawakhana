import React from "react";
import { Button } from "../ui/button";

const Filters = ({ handleSort, handleResetSorting }: any) => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Filters</h1>
      <div className="flex flex-col gap-4">
        <Button variant="link" onClick={handleResetSorting}>Best Sort</Button>
        <Button onClick={() => handleSort("asc")}>Low to High</Button>
        <Button onClick={() => handleSort("desc")}>High to Low</Button>
      </div>
    </div>
  );
};

export default Filters;
