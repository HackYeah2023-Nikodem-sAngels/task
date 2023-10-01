import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { StepProps } from "../Setup";
import { useState } from "react";
import { List } from "@/components/List";
import { Card } from "@/components/ui/card";

export function InterestsStep(props: StepProps) {
    const [entries, setEntries] = useState<string[]>([]);

    return (
        <Card className="flex h-fit max-h-[75vh] w-[400px] items-center justify-center overflow-auto p-8 opacity-80">
            <form
                className="flex w-80 flex-col gap-4"
                onSubmit={(e) => {
                    e.preventDefault();
                    props.onSubmit({
                        ...props.data,
                        interests: entries,
                    });
                }}
            >
                <h1 className="text-center text-2xl font-medium">
                    Czym się interesujesz?
                </h1>
                <div className="mb-6 mt-4">
                    <List value={entries} onChange={setEntries} />
                </div>
                <div className="flex justify-between">
                    <Button
                        className="flex gap-2 text-base"
                        variant={"secondary"}
                        onClick={() => props.onSubmit(props.data)}
                    >
                        Pomiń
                    </Button>
                    <Button
                        disabled={entries.length === 0}
                        className="ml-auto flex gap-2 text-base"
                        type="submit"
                    >
                        Zakończ
                        <ArrowRightIcon className="w-4" />
                    </Button>
                </div>
            </form>
        </Card>
    );
}
