import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { StepProps } from "../Setup";
import { useState } from "react";

export function StudyLevelStep(props: StepProps) {
    const [studyLevel, setStudyLevel] = useState("1");

    return (
        <form
            className="flex flex-col gap-4"
            onSubmit={(e) => {
                e.preventDefault();
                props.onSubmit({
                    ...props.data,
                    studyLevel: studyLevel as "1" | "2" | "3" | "1+2",
                });
            }}
        >
            <h1 className="text-center text-xl font-medium">
                Na jakie studia się wybierasz?
            </h1>
            <RadioGroup
                defaultValue={studyLevel}
                value={studyLevel}
                onValueChange={setStudyLevel}
            >
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="1" id="1" />
                    <Label htmlFor="1">1. stopnia</Label>
                </div>
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="2" id="2" />
                    <Label htmlFor="2">2. stopnia</Label>
                </div>
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="1+2" id="1+2" />
                    <Label htmlFor="1+2">Jednolite magisterskie</Label>
                </div>
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="3" id="3" />
                    <Label htmlFor="1+2">Doktorackie</Label>
                </div>
            </RadioGroup>

            <Button className="ml-auto flex gap-2" type="submit">
                Dalej
                <ArrowRightIcon className="w-4" />
            </Button>
        </form>
    );
}