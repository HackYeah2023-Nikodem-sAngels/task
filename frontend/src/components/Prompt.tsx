import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useTranslation } from "@/hooks/useTranslation";
import { useMutation } from "react-query";
import { ApiResponse } from "@/routes/Chat";
import { Message } from "@/routes/Chat";

export function Prompt(props: {
    onSubmit: (userQuestion: Message) => void;
    onResponse: (aiResponse: Message) => void;
}) {
    const [isMultiline, setIsMultiline] = useState(false);
    const translate = useTranslation();
    const submit = useMutation(() =>
        fetch("/api/questions", {
            method: "POST",
            body: JSON.stringify({ answer: prompt }),
        }),
    );
    const [prompt, setPrompt] = useState("");

    async function handleSubmit() {
        setPrompt("");
        props.onSubmit({ message: prompt, type: "user" });

        const res = await submit.mutateAsync();
        const json: ApiResponse = await res.json();

        props.onResponse({
            message: json.question.question,
            type: "ai",
            actions: json.question.answers,
        });
    }

    return (
        <div className="sticky bottom-0 p-6 ">
            <Textarea
                className="mx-auto bg-white py-3 text-base font-normal shadow"
                placeholder={translate("prompt_placeholder")}
                maxRows={3}
                onHeightChange={(height) => {
                    setIsMultiline(height > 50);
                }}
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyDown={async (e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        await handleSubmit();
                    }
                }}
            />
            <Button
                variant={isMultiline ? "default" : "ghost"}
                size={"icon"}
                className={cn(
                    "absolute bottom-[8px] right-3 -translate-x-1/2 -translate-y-1/2 transform",
                )}
                onClick={async () => await handleSubmit()}
            >
                <PaperAirplaneIcon className="w-5" />
            </Button>
        </div>
    );
}
