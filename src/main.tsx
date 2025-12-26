import ReactDOM from "react-dom/client";
import './index.css'

import {RouterProvider} from "react-router";
import {router} from "./routes/router.tsx";


const root = document.getElementById("root")!;

ReactDOM.createRoot(root).render(
    <RouterProvider router={router} />,
);
