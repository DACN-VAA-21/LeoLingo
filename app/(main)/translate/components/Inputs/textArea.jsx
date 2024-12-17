import React from "react";

const TextArea = ({ id, value, onChange, placeholder }) => {
  return (
    <textarea
      rows={5}
      id={id}
      className="py-2.5 px-4 border-none focus:outline-none block w-full border-transparent rounded-lg dark:bg-neutral-900 dark:border-transparent dark:text-neutral-600 "
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
};

export default TextArea;
