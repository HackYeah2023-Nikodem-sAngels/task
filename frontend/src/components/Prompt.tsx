import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useTranslation } from "@/hooks/useTranslation";

export function Prompt() {
    const [isMultiline, setIsMultiline] = useState(false);
    const translate = useTranslation();

    return (
        <div className="sticky bottom-0 p-6 ">
            <Textarea
                className="mx-auto bg-white py-3 text-base font-normal shadow"
                placeholder={translate("prompt_placeholder")}
                maxRows={3}
                onHeightChange={(height) => {
                    setIsMultiline(height > 50);
                }}
                onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        console.log("submit");
                    }
                }}
            />
            <Button
                variant={isMultiline ? "default" : "ghost"}
                size={"icon"}
                className={cn(
                    "absolute bottom-[8px] right-3 -translate-x-1/2 -translate-y-1/2 transform",
                )}
            >
                <PaperAirplaneIcon className="w-5" />
            </Button>
        </div>
    );
}
