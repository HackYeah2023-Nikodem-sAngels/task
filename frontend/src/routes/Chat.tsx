import { Prompt } from "@/components/Prompt";
import { Messages } from "@/components/Messages";
import { Card } from "@/components/ui/card";
// import { IconMinusVertical } from "@tabler/icons-react";
// import { useTextAnimation } from "@/hooks/useTextAnimation";
// import { useRef } from "react";

export function Chat() {
    // const ref = useRef<HTMLDivElement>(null);
    // useTextAnimation(ref.current!, "tu bedzie jakis tekst");

    return (
        <div className="grid-row mx-auto grid h-full gap-4 md:grid-cols-[5fr_2fr]">
            <Card className="order-1 mx-auto flex flex-col gap-4">
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

            {/* <div ref={ref}></div> */}

            {/* Jak będzie czas to może resize zrobimy */}
            {/* <IconMinusVertical */}
            {/*     size={60} */}
            {/*     className="-m-4 text-gray-400 hover:text-gray-800 hover:cursor-col-resize" */}
            {/* /> */}

            <Card className="p-6 md:order-1">uczelnie</Card>
        </div>
    );
}
