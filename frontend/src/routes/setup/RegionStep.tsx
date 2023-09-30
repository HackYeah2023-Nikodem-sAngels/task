import { Map } from "@/components/Map";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { StepProps } from "../Setup";
import { Card } from "@/components/ui/card";
import { ArrowRightIcon } from "@heroicons/react/24/outline";

export function RegionStep(props: StepProps) {
    const [regions, setRegions] = useState<string[]>([]);

    return (
        <Card className="h-fit p-8">
            <form
                className="flex flex-col gap-4"
                onSubmit={(e) => {
                    e.preventDefault();
                    props.onSubmit({
                        ...props.data,
                        regions: regions,
                    });
                }}
            >
                <h1 className="text-center text-lg font-medium">
                    Wybierz województwa twoich wymarzonych szkół
                </h1>
                <Map value={regions} onChange={setRegions} />

                <div className="flex justify-between">
                    <Button
                        className="text-base"
                        variant={"secondary"}
                        size={"lg"}
                        onClick={() => props.onSubmit(props.data)}
                    >
                        Pomiń
                    </Button>
                    <Button
                        className="ml-auto flex gap-2"
                        type="submit"
                        disabled={regions.length === 0}
                        size={"lg"}
                    >
                        Dalej
                        <ArrowRightIcon className="w-5" />
                    </Button>
                </div>
            </form>
        </Card>
    );
}
