import { Prompt } from "@/components/Prompt";
import { Messages } from "@/components/Messages";
import { Card } from "@/components/ui/card";
import Cookies from "js-cookie";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useDataStore } from "@/zustand";

export interface Message {
    message: string;
    actions?: string[];
    type: "user" | "ai";
}

export interface ApiResponse {
    question: {
        question: string;
        answers: string[];
    };
    majors: string[];
}

export function Chat() {
    const questions = useQuery(["questions"], async () => {
        const res = await fetch("/api/questions");
        return (await res.json()) as Promise<ApiResponse>;
    });

    const [messages, setMessages] = useState<Message[]>([]);
    const { data } = useDataStore();
    console.log("data", data);

    const navigate = useNavigate();
    useEffect(() => {
        if (!Cookies.get("hackyeah")) {
            navigate("/");
            return;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="flex h-full">
            <div className="grid-row mx-auto grid h-full gap-4 md:w-[680px] md:grid-cols-[5fr_2fr] lg:w-[940px] xl:w-[1200px]">
                <Card className="order-1 mx-auto flex h-[480px] max-h-full !w-full flex-col gap-4 overflow-y-auto sm:w-[60ch] md:h-auto md:w-[52ch] lg:w-[72ch] xl:w-[92ch]">
                    <Messages
                        data={[
                            {
                                message:
                                    questions.data?.question?.question ?? "...",
                                type: "ai",
                                actions: questions.data?.question?.answers,
                            },
                            ...messages,
                        ]}
                        onSubmit={(user) =>
                            setMessages((prev) => [...prev, user])
                        }
                        onResponse={(ai) =>
                            setMessages((prev) => [...prev, ai])
                        }
                    />
                    <Prompt
                        onSubmit={(user) =>
                            setMessages((prev) => [...prev, user])
                        }
                        onResponse={(ai) =>
                            setMessages((prev) => [...prev, ai])
                        }
                    />
                </Card>

                <Card className="overflow-y-auto p-6 md:order-1">
                    Lorem ipsum dolor sit amet, qui minim labore adipisicing
                    minim sint cillum sint consectetur cupidatat.
                </Card>
            </div>
        </div>
    );
}
