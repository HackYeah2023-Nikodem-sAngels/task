import { Map } from "@/components/Map";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { StepProps } from "../Setup";
import { Card } from "@/components/ui/card";
import { ArrowRightIcon } from "@heroicons/react/24/outline";

export function RegionStep(props: StepProps) {
    const [regions, setRegions] = useState<string[]>([]);

    return (
        <Card className="h-auto w-auto p-8 opacity-80 sm:h-[660px] sm:w-[540px] md:h-[720px] md:w-[640px]">
            <form
                className="flex h-full w-full flex-col gap-4"
                onSubmit={(e) => {
                    e.preventDefault();
                    props.onSubmit({
                        ...props.data,
                        regions: regions,
                    });
                }}
            >
                <h1 className="text-center text-2xl font-medium">
                    Wybierz województwa uczelni
                </h1>
                <div className=" md:h-[calc(100% - 32px)] md:w-[calc(100% - 32px)] my-4">
                    <Map value={regions} onChange={setRegions} />
                </div>
                <div className="flex justify-between">
                    <Button
                        className="text-base"
                        variant={"secondary"}
                        onClick={() => props.onSubmit(props.data)}
                    >
                        Pomiń
                    </Button>
                    <Button
                        className="ml-auto flex gap-2 text-base"
                        type="submit"
                        disabled={regions.length === 0}
                    >
                        Dalej
                        <ArrowRightIcon className="w-5" />
                    </Button>
                </div>
            </form>
        </Card>
    );
}
