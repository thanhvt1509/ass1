import React from "react";
import ReactDom from "react-dom"
import App from "./app";

const root = document.querySelector('#root')

const reactRoot = ReactDom.createRoot(root)

reactRoot.render(<App />)
