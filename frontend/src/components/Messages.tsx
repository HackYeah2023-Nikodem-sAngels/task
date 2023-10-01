import { cn } from "@/lib/utils";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import { useTextAnimation } from "@/hooks/useTextAnimation";
import { useEffect, useRef, useState } from "react";

interface Props {
    data: Array<{
        message: string;
        actions?: string[];
        type: "user" | "ai";
    }>;
}
export function Messages(props: Props) {
    const ref = useRef<HTMLSpanElement>();
    const completed = useTextAnimation(
        ref.current!,
        props.data[props.data.length - 1].message,
    );

    useEffect(() => {
        const responses = document.querySelectorAll(".ai-response");
        const lastResponse = responses[responses.length - 1] as
            | HTMLSpanElement
            | undefined;
        ref.current = lastResponse;
    }, [props.data]);

    return (
        <div className="flex w-full flex-1 flex-col">
            {props.data.map((response, i) => (
                <div
                    className={cn(
                        response.type === "ai" ? "bg-blue-100" : "",
                        "flex flex-col gap-4 p-8 ",
                    )}
                    key={i}
                >
                    <div className="mb-6 flex items-start gap-4">
                        {response.type === "ai" ? (
                            <>
                                <img className="h-8 w-8" src="/ai.gif" />
                                <span className="ai-response"></span>
                            </>
                        ) : (
                            <>
                                <div className="h-8 w-8">
                                    <UserCircleIcon className="h-8 w-8 text-muted-foreground" />
                                </div>
                                <span>{response.message}</span>
                            </>
                        )}
                    </div>
                    {response.type === "ai" &&
                        completed &&
                        response.actions?.map((el, i) => {
                            return (
                                <button
                                    key={i}
                                    className="ml-12 flex items-center justify-center rounded-xl border border-solid border-gray-400 px-4 py-3 hover:bg-blue-200"
                                >
                                    {el}
                                </button>
                            );
                        })}
                </div>
            ))}
        </div>
    );
}
