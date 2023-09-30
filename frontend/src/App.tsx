import { Prompt } from "@/components/Prompt";
import { Responses } from "@/components/Responses";
import { Card } from "@/components/ui/card";

function App() {
    return (
        <Card className="flex flex-col h-full mx-auto w-screen p-8">
            <Responses
                responses={[
                    "Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.",
                    "Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.",
                ]}
            />
            <Prompt />
        </Card>
    );
}

export default App;
