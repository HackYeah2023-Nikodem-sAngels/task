import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Form } from "./routes/Form";
import { Homepage } from "./routes/Homepage";

function App() {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <Homepage />,
        },
        {
            path: "/map",
            element: <Form />,
        },
    ]);

    return <RouterProvider router={router} />;
}

export default App;
