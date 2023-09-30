import { Prompt } from "@/components/Prompt";
import { Messages } from "@/components/Messages";
import { Card } from "@/components/ui/card";
// import { IconMinusVertical } from "@tabler/icons-react";

export function Chat() {
    return (
        <div className="grid mx-auto md:grid-cols-[5fr_2fr] grid-row gap-4 h-full">
            <Card className="flex flex-col mx-auto gap-4 order-1">
                <Messages
                    data={[
                        {
                            message:
                                "Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.",
                            type: "user",
                        },
                        {
                            message:
                                "Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.",
                            type: "ai",
                        },
                    ]}
                />
                <Prompt />
            </Card>

            {/* Jak będzie czas to może resize zrobimy */}
            {/* <IconMinusVertical */}
            {/*     size={60} */}
            {/*     className="-m-4 text-gray-400 hover:text-gray-800 hover:cursor-col-resize" */}
            {/* /> */}

            <Card className="p-6 md:order-1">uczelnie</Card>
        </div>
    );
}
