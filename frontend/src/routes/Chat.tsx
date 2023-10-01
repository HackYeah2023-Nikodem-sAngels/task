import { Prompt } from "@/components/Prompt";
import { Messages } from "@/components/Messages";
import { Card } from "@/components/ui/card";
import Cookies from "js-cookie";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useUserDataStore } from "@/zustand";
import { Loader } from "@/components/Loader";
import { cn } from "@/lib/utils";

export interface Message {
    message: React.ReactNode;
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

interface Uni {
    Id: number;
    Uni: string;
    Name: string; // kierunek
}

export function Chat() {
    const questions = useQuery(["questions"], async () => {
        const res = await fetch("/api/questions");
        return (await res.json()) as Promise<ApiResponse>;
    });

    const [messages, setMessages] = useState<Message[]>([]);
    const { data } = useUserDataStore();

    const unilist1 = useQuery(
        ["unis"],
        async () => {
            const res = await fetch("/api/uniList1");
            const json: Uni[] = await res.json();
            return json;
        },
        {
            enabled: false,
        },
    );
    const unilist2 = useQuery(
        ["unis"],
        async () => {
            const res = await fetch("/api/uniList2");
            const json: Uni[] = await res.json();
            return json;
        },
        {
            enabled: false,
        },
    );
    useEffect(() => {
        const aiMessages = messages.filter((el) => el.type === "ai");
        if (aiMessages.length % 3 === 0) {
            if (
                data.studyLevel === 1 ||
                data.studyLevel === 2 ||
                data.studyLevel === 0
            ) {
                unilist1.refetch();
            } else if (data.studyLevel === 3) {
                unilist2.refetch();
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [messages]);

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
                                message: questions.data?.question?.question ?? (
                                    <Loader />
                                ),
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

                <Card className="overflow-y-auto p-0 md:order-1">
                    <div className="flex flex-col text-sm">
                        {data.studyLevel === 3
                            ? unilist2.data?.map((el, i) => (
                                  <p
                                      className={cn(
                                          i % 2 === 0 ? "bg-blue-100" : "",
                                          "px-4 py-4",
                                      )}
                                  >
                                      {el.Uni}:{" "}
                                      <span className="text-primary">
                                          {el.Name}
                                      </span>
                                  </p>
                              )) ?? <Loader className="m-4" />
                            : unilist2.data?.map((el, i) => (
                                  <p
                                      className={cn(
                                          i % 2 === 0 ? "bg-blue-100" : "",
                                          "px-4 py-4",
                                      )}
                                  >
                                      {el.Uni}:{" "}
                                      <span className="text-primary">
                                          {el.Name}
                                      </span>
                                  </p>
                              )) ?? <Loader className="m-4" />}
                    </div>
                </Card>
            </div>
        </div>
    );
}
