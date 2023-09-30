import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Form } from "./routes/Form";
import { Homepage } from "./routes/Homepage";
import { Chat } from "./routes/Chat";

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
        {
            path: "/chat",
            element: <Chat />,
        },
    ]);

    return <RouterProvider router={router} />;
}

export default App;
