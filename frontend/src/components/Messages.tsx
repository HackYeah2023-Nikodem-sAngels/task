import { cn } from "@/lib/utils";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import { ApiResponse, Message } from "@/routes/Chat";
import { useMutation } from "react-query";

interface Props {
    data: Message[] | undefined;
    onSubmit: (userQuestion: Message) => void;
    onResponse: (aiResponse: Message) => void;
}
export function Messages(props: Props) {
    const submit = useMutation(() =>
        fetch("/api/questions", {
            method: "POST",
            body: JSON.stringify({ answer: prompt }),
        }),
    );

    async function handleSubmit(answer: string) {
        props.onSubmit({ message: answer, type: "user" });

        const res = await submit.mutateAsync();
        const json: ApiResponse = await res.json();

        props.onResponse({
            message: json.question.question,
            type: "ai",
            actions: json.question.answers,
        });
    }

    return (
        <div className="flex w-full flex-1 flex-col">
            {props.data?.map((response, i) => (
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
                                <span className="ai-response">
                                    {response.message}
                                </span>
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
                        response.actions?.map((el, i) => {
                            return (
                                <button
                                    key={i}
                                    disabled={
                                        submit.isLoading || submit.isSuccess
                                    }
                                    className={cn(
                                        "ml-12 flex items-center justify-center rounded-xl border border-solid border-gray-400 px-4 py-3",
                                        // !(
                                        //     submit.isLoading || submit.isSuccess
                                        // ) && "hover:bg-blue-200",
                                    )}
                                    onClick={async () => await handleSubmit(el)}
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
