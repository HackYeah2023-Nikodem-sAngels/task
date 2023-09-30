import { Prompt } from "@/components/Prompt";
import { Messages } from "@/components/Messages";
import { Card } from "@/components/ui/card";

export function Chat() {
    return (
        <div className="flex h-full">
            <div className="grid-row mx-auto grid h-full gap-4 md:grid-cols-[5fr_2fr]">
                <Card className="mb:w-[32ch] order-1 mx-auto flex flex-col gap-4 sm:w-[60ch]  xl:w-[80ch]">
                    <Messages
                        data={[
                            {
                                message:
                                    "Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.",
                                type: "ai",
                                actions: [
                                    "napisz mi mega skompliklopwany esej ale taki serio dobry",
                                    "ssd",
                                    "awaw efefege fefefef efef efeefsgrw efefrbre efefgs",
                                ],
                            },
                            {
                                message:
                                    "Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat. Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat. Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat. Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat. Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat",
                                type: "user",
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
        </div>
    );
}
