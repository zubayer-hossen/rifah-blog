import React from "react";

const Loader = ({ label = "Loading..." }) => (
  <div className="flex flex-col items-center justify-center gap-3 py-16" role="status">
    <div className="h-10 w-10 animate-spin rounded-full border-4 border-blush-light border-t-blush" />
    <p className="font-body text-plum/60">{label}</p>
  </div>
);

export default Loader;
