import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import {AuthProvider} from "./contexts/AuthContext";
import {RouterProvider} from "react-router-dom";
import {router} from "./utils/Router";
import {ApiProvider} from "./contexts/ApiContext";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);
root.render(
    <React.StrictMode>
        <AuthProvider>
            <ApiProvider>
                <RouterProvider router={router}/>
            </ApiProvider>
        </AuthProvider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
