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
                    className={cn(response.type === "ai" ? "bg-blue-100" : "")}
                    key={i}
                >
                    <div className=" flex items-start gap-4 p-4 pe-6">
                        {/* max-w-[820px] */}
                        {response.type === "ai" ? (
                            <img className="h-8 w-8" src="/ai.gif" />
                        ) : (
                            <UserCircleIcon className="w-8 text-muted-foreground" />
                        )}
                        <span ref={ref} className="w-[80ch]">
                            {/* {response.message} */}
                        </span>
                    </div>
                    <div className="flex w-full items-center justify-between pb-4 pe-6 pl-16">
                        {/*  max-w-[820px] */}
                        {response.type === "ai" && isFinished ? (
                            response.actions?.map((el, i) => {
                                return (
                                    <React.Fragment key={i}>
                                        <div
                                            className={`mt-4 flex w-1/3 items-center justify-center`}
                                            // ${response.actions?.length}
                                        >
                                            <div className="min-h-10 flex h-max w-5/6 items-center justify-center rounded-2xl border border-solid border-gray-400 px-4 py-3 hover:bg-blue-200">
                                                {el}
                                            </div>
                                        </div>
                                    </React.Fragment>
                                );
                            })
                        ) : (
                            <></>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}
