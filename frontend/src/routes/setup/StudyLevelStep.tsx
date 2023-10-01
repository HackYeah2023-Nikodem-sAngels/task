import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { SetupData, StepProps } from "../Setup";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { useTranslation } from "@/hooks/useTranslation";

export function StudyLevelStep(props: StepProps) {
    const [studyLevel, setStudyLevel] = useState(1);
    const translate = useTranslation();

    return (
        <Card className="h-fit p-8 opacity-80">
            <form
                className="flex flex-col gap-4"
                onSubmit={(e) => {
                    e.preventDefault();
                    props.onSubmit({
                        ...props.data,
                        studyLevel: studyLevel as SetupData["studyLevel"],
                    });
                }}
            >
                <h1 className="text-center text-2xl font-medium">
                    {translate("study_level_title")}
                </h1>
                <RadioGroup
                    defaultValue={studyLevel.toString()}
                    value={studyLevel.toString()}
                    onValueChange={(value) => setStudyLevel(Number(value))}
                    className="mb-6 mt-4 flex flex-col gap-4"
                >
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="1" id="1" />
                        <Label htmlFor="1" className="text-lg">
                            {translate("study_level_1")}
                        </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="2" id="2" />
                        <Label htmlFor="2" className="text-lg">
                            {translate("study_level_2")}
                        </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="0" id="0" />
                        <Label htmlFor="0" className="text-lg">
                            {translate("study_level_0")}
                        </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="3" id="3" />
                        <Label htmlFor="3" className="text-lg">
                            {translate("study_level_3")}
                        </Label>
                    </div>
                </RadioGroup>

                <Button className="ml-auto flex gap-2 text-base" type="submit">
                    {translate("next")}
                    <ArrowRightIcon className="w-4" />
                </Button>
            </form>
        </Card>
    );
}
