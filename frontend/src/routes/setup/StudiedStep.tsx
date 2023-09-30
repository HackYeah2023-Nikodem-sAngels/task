import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { StepProps } from "../Setup";
import { useState } from "react";

export function StudiedStep(props: StepProps) {
    const [studied, setStudied] = useState("no");

    return (
        <form
            className="flex flex-col gap-4"
            onSubmit={(e) => {
                e.preventDefault();
                props.onSubmit({
                    ...props.data,
                    studyLevel: studied === "no" ? "1" : undefined,
                });
            }}
        >
            <h1 className="text-center text-xl font-medium">
                Czy już studiowałeś/aś?
            </h1>
            <RadioGroup
                defaultValue={studied}
                value={studied}
                onValueChange={setStudied}
            >
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="yes" />
                    <Label htmlFor="yes">Tak</Label>
                </div>
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="no" />
                    <Label htmlFor="no">Nie</Label>
                </div>
            </RadioGroup>

            <Button className="ml-auto flex gap-2" type="submit">
                Dalej
                <ArrowRightIcon className="w-4" />
            </Button>
        </form>
    );
}
