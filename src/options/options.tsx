import React from "react";
import { createRoot } from "react-dom/client";
import "./options.css";

const test = <p>Hello world</p>;

const root = document.createElement("div");
document.body.appendChild(root);

const rootElement = createRoot(root);
rootElement.render(test);
