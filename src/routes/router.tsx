import { createBrowserRouter } from "react-router";
import App from '../App.tsx'
import Home from "../pages/Home.tsx";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        children:[
            {index: true, element : <Home/> }
        ]
    },
]);