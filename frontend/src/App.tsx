import {
    RouterProvider,
    createBrowserRouter,
    Navigate,
} from "react-router-dom";
import { Homepage } from "./routes/Homepage";
import { Setup } from "./routes/Setup";
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
            path: "/:language/chat",
            element: <Chat />,
        },
        {
            path: "/:language/setup",
            element: <Setup />,
        },
    ]);

    return <RouterProvider router={router} />;
}

export default App;
