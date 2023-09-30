import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";

export function Prompt() {
    return (
        <div className="relative">
            <Textarea className="shadow mx-auto py-3 text-base" />
            <Button
                variant={"ghost"}
                size={"icon"}
                className="absolute top-1/2 -right-3 transform -translate-x-1/2 -translate-y-1/2"
            >
                <PaperAirplaneIcon className="w-5" />
            </Button>
        </div>
    );
}
