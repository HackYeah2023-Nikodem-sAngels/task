import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { StepProps } from "../Setup";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { useTranslation } from "@/hooks/useTranslation";

export function StudiedStep(props: StepProps) {
    const [studied, setStudied] = useState("no");
    const translate = useTranslation();

    return (
        <div className="flex w-full items-center justify-center sm:items-baseline">
            <Card className="h-[320px] w-[440px] p-8 pb-6 opacity-80">
                <form
                    className="flex h-full flex-col gap-4"
                    onSubmit={(e) => {
                        e.preventDefault();
                        props.onSubmit({
                            ...props.data,
                            studyLevel: studied === "no" ? 1 : undefined,
                        });
                    }}
                >
                    <h1 className="text-center text-2xl font-medium">
                        {translate("studied_question")}
                    </h1>
                    <RadioGroup
                        defaultValue={studied}
                        value={studied}
                        onValueChange={setStudied}
                        className="h-full auto-rows-min gap-2 pt-4"
                    >
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="yes" id="yes" />
                            <Label htmlFor="yes" className="text-lg">
                                {translate("yes")}
                            </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="no" id="no" />
                            <Label htmlFor="no" className="text-lg">
                                {translate("no")}
                            </Label>
                        </div>
                    </RadioGroup>

                    <Button
                        className="ml-auto flex gap-2 text-base"
                        type="submit"
                    >
                        {translate("next")}
                        <ArrowRightIcon className="w-4" />
                    </Button>
                </form>
            </Card>
        </div>
    );
}
