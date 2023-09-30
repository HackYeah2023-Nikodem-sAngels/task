import {
    RouterProvider,
    createBrowserRouter,
    Navigate,
} from "react-router-dom";
import { Form } from "./routes/Form";
import { Homepage } from "./routes/Homepage";
import { Chat } from "./routes/Chat";

function App() {
    const language = Intl.DateTimeFormat().resolvedOptions().locale.slice(0, 2);

    const router = createBrowserRouter([
        {
            path: "/",
            element: <Navigate to={`/${language}`} />,
        },
        {
            path: "/:language",
            element: <Homepage />,
        },
        {
            path: "/:language/map",
            element: <Form />,
        },
        {
            path: "/:language/chat",
            element: <Chat />,
        },
    ]);

    return <RouterProvider router={router} />;
}

export default App;
