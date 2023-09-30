import { cn } from "@/lib/utils";
import { UserCircleIcon } from "@heroicons/react/24/outline";

interface Props {
    data: Array<{
        message: string;
        type: "user" | "ai";
    }>;
}
export function Messages(props: Props) {
    return (
        <div className="flex flex-col flex-1">
            {props.data.map((response, i) => (
                <div
                    key={i}
                    className={cn(
                        response.type === "ai" ? "bg-blue-100" : "",
                        "p-4 flex items-center gap-2",
                    )}
                >
                    {response.type === "ai" ? (
                        <img className="w-8 h-8" src="/ai.gif" />
                    ) : (
                        <UserCircleIcon className="w-8 text-muted-foreground" />
                    )}
                    {response.message}
                </div>
            ))}
        </div>
    );
}
