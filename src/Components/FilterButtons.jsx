import React from "react";

const categories = ["All", "React", "JavaScript", "Node.js", "MongoDB", "CSS", "Python", "Django"];

const FilterButtons = ({ selectedCategory, setCategory }) => {
  return (
    <div className="p-3 mt-6 mb-6 flex gap-3 overflow-x-auto bg-white sticky top-14 z-10 ">
      {categories.map((category) => (
        <button
          key={category}
          className={`px-4 py-2 text-sm font-semibold rounded-full transition-all duration-300
          ${selectedCategory === category ? "bg-black text-white" : "bg-gray-200 hover:bg-gray-300 text-black"}
          `}
          onClick={() => setCategory(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default FilterButtons;
