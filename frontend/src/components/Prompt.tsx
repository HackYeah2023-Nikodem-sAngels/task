import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function Prompt() {
    const [isMultiline, setIsMultiline] = useState(false);

    return (
        <div className="relative p-6">
            <Textarea
                className="shadow mx-auto py-3 text-base font-normal"
                placeholder="Send a message..."
                maxRows={3}
                onHeightChange={(height) => {
                    setIsMultiline(height > 50);
                }}
            />
            <Button
                variant={isMultiline ? "default" : "ghost"}
                size={"icon"}
                className={cn(
                    "absolute bottom-[8px] right-3 transform -translate-x-1/2 -translate-y-1/2",
                    isMultiline && "right-6",
                )}
            >
                <PaperAirplaneIcon className="w-5" />
            </Button>
        </div>
    );
}
