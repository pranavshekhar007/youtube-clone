import React from "react";

// List of categories to be displayed as filter buttons
const categories = [
  "All", "React", "Song", "JavaScript", "Node.js", "MongoDB", "CSS", "Python", "Django"
];

// Component to render filter buttons
const FilterButtons = ({ selectedCategory, setCategory }) => {
  return (
    <div className="p-3 mt-6 mb-6 flex gap-3 overflow-x-auto bg-white sticky top-14 z-10">
      {/* Iterate over categories array to create buttons dynamically */}
      {categories.map((category) => (
        <button
          key={category} // Unique key for each button
          className={`px-4 py-2 text-sm font-semibold rounded-full transition-all duration-300
          ${selectedCategory === category ? "bg-black text-white" : "bg-gray-200 hover:bg-gray-300 text-black"}
          `} // Apply different styles based on selected category
          onClick={() => setCategory(category)} // Update the selected category when clicked
        >
          {category} {/* Display category name on button */}
        </button>
      ))}
    </div>
  );
};

export default FilterButtons;
