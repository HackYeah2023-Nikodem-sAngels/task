import { cn } from "@/lib/utils";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import { useTextAnimation } from "@/hooks/useTextAnimation";
import React, { useRef } from "react";

interface Props {
    data: Array<{
        message: string;
        actions?: string[];
        type: "user" | "ai";
    }>;
}
export function Messages(props: Props) {
    const ref = useRef<HTMLElement>(null);
    const isFinished = useTextAnimation(
        ref.current!,
        props.data[props.data.length - 1].message,
    );

    return (
        <div className="flex flex-1 flex-col">
            {props.data.map((response, i) => (
                <div
                    className={cn(
                        response.type === "ai" ? "bg-blue-100" : "",
                        "flex flex-col gap-4 p-8",
                    )}
                    key={i}
                >
                    <div className="flex items-start gap-4">
                        {response.type === "ai" ? (
                            <>
                                <img className="h-8 w-8" src="/ai.gif" />
                                <span ref={ref}></span>
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
                    <div className="flex w-full items-center justify-around gap-4 px-8 pt-6">
                        {response.type === "ai" &&
                            isFinished &&
                            response.actions?.map((el, i) => {
                                return (
                                    <button
                                        key={i}
                                        className="flex w-5/6 items-center justify-center rounded-2xl border border-solid border-gray-400 px-4 py-3 hover:bg-blue-200"
                                    >
                                        {el}
                                    </button>
                                );
                            })}
                    </div>
                </div>
            ))}
        </div>
    );
}
