import React from "react";

const Card = ({ children }) => {
  return (
    <div class="max-w-sm mx-2 mr-2 rounded overflow-hidden shadow-lg  md:mx-auto lg:mx-auto max-w-2xl w-full">
      <div class="px-6 py-4">{children}</div>
    </div>
  );
};

export default Card;
