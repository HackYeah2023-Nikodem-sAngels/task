import { Map } from "@/components/Map";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { SetupData } from "../Setup";
import { Card } from "@/components/ui/card";
import { ArrowRightIcon } from "@heroicons/react/24/outline";

export function SelectArea(props: {
    onSubmit: React.Dispatch<React.SetStateAction<SetupData>>;
}) {
    const [areas, setAreas] = useState<string[]>([]);

    return (
        <Card className="h-fit p-8">
            <form
                className="flex flex-col gap-4"
                onSubmit={(e) => {
                    e.preventDefault();
                    props.onSubmit((data) => ({
                        ...(data ?? {}),
                        regions: areas,
                    }));
                }}
            >
                <h1 className="text-center text-lg">
                    Wybierz województwa twoich wymarzonych szkół
                </h1>
                <Map value={areas} onChange={setAreas} />

                <div className="flex justify-between">
                    <Button
                        className="text-base"
                        variant={"secondary"}
                        size={"lg"}
                        onClick={() => props.onSubmit((data) => ({ ...data }))}
                    >
                        Pomiń
                    </Button>
                    <Button
                        className="ml-auto flex gap-2"
                        type="submit"
                        disabled={areas.length === 0}
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
