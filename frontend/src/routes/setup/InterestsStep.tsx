import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { StepProps } from "../Setup";
import { useState } from "react";
import { List } from "@/components/List";
import { Card } from "@/components/ui/card";
import { useTranslation } from "@/hooks/useTranslation";
import { Loader } from "@/components/Loader";

export function InterestsStep(
    props: StepProps & {
        loading: boolean;
    },
) {
    const [entries, setEntries] = useState<string[]>([]);
    const [whichButton, setWhichButton] = useState<"next" | "skip">();
    const translate = useTranslation();

    return (
        <Card className="flex h-fit max-h-[75vh] w-[400px] items-center justify-center overflow-auto p-8 opacity-80">
            <form
                className="flex w-80 flex-col gap-4"
                onSubmit={(e) => {
                    e.preventDefault();
                    setWhichButton("next");
                    props.onSubmit({
                        ...props.data,
                        interests: entries,
                    });
                }}
            >
                <h1 className="text-center text-2xl font-medium">
                    {translate("interests_title")}
                </h1>
                <div className="mb-6 mt-4">
                    <List value={entries} onChange={setEntries} />
                </div>
                <div className="flex justify-between">
                    <Button
                        className="flex gap-2 text-base"
                        variant={"secondary"}
                        disabled={props.loading}
                        onClick={() => {
                            setWhichButton("skip");
                            props.onSubmit(props.data);
                        }}
                    >
                        {translate("skip")}
                        {props.loading && whichButton === "skip" && <Loader />}
                    </Button>
                    <Button
                        disabled={entries.length === 0 || props.loading}
                        className="ml-auto flex gap-2 text-base"
                        type="submit"
                    >
                        {translate("next")}
                        {!props.loading && whichButton === "next" && (
                            <ArrowRightIcon className="w-4" />
                        )}
                        {props.loading && whichButton === "next" && <Loader />}
                    </Button>
                </div>
            </form>
        </Card>
    );
}
