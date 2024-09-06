import React from "react";
//ReactDOM used only once in the app
//It is used to hook React into
//native HTML world.
//Open index.html and read the notes
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min"

//The create.Root() method expects the HTML element (see index.html) that
//is used to instantiate React. we are using JavaScript's built-in
//getElementById() method to return the HTML element that we have
//seen in the index.html file

//Once we have the root object, we can call render() on the
//returned "root" object with JSX as parameter. The "root"
//object is the entry point which is called "root component"

//Document.getElementById("root")).render( - means get an html element
//with an ID of "root" (defined in index.html) and then render it.
//Strict Mode enables the following checks in development:

// 1.Your components will re-render an extra time to find bugs caused by impure rendering.
// 2.Your components will re-run Effects an extra time to find bugs caused by missing Effect cleanup.
// 3. Your components will be checked for usage of deprecated APIs.
//All of these checks are development-only and do not impact the
//production build.
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
