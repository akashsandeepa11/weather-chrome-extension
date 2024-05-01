import React from "react";
import { createRoot } from "react-dom/client";
import "./options.css";

const App: React.FC<{}> = () => {
  return (
    <div>
      <h1>Akash sandeepa</h1>
    </div>
  );
};

const rootElement = document.createElement("div");
rootElement.id = "root";
document.body.appendChild(rootElement);

const root = createRoot(rootElement);
root.render(<App />);
