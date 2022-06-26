import React from "react";

import { IFilterButtonProps } from "../interface";

const FilterButton: React.FC<IFilterButtonProps> = ({ isPressed, name, setFilter }) => {
  return (
    <button
      type="button"
      className="btn toggle-btn"
      aria-pressed={isPressed}
      onClick={() => setFilter(name)}
    >
      <span className="visually-hidden">Show </span>
      <span>{name}</span>
      <span className="visually-hidden"> tasks</span>
    </button>
  );
};

export default FilterButton;
