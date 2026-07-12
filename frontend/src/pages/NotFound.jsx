import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => (
  <div className="mx-auto flex min-h-[60vh] max-w-lg flex-col items-center justify-center px-5 text-center">
    <p className="text-6xl">🥀</p>
    <h1 className="mt-4 font-display text-3xl italic">Page not found</h1>
    <p className="mt-2 text-plum/60">This page doesn't exist — but the stories are still waiting.</p>
    <Link to="/" className="btn-primary mt-6">Back home</Link>
  </div>
);

export default NotFound;
