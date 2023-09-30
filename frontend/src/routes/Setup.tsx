import { useState } from "react";
import { SelectArea } from "./setup/SelectArea";

function CurrentStep(props: {
    step: Step;
    setData: React.Dispatch<React.SetStateAction<SetupData>>;
    setStep: React.Dispatch<React.SetStateAction<Step>>;
}) {
    switch (props.step) {
        case "regions": {
            return (
                <SelectArea
                    onSubmit={(prev) => {
                        props.setStep("regions/studied");
                        return props.setData(prev);
                    }}
                />
            );
        }
    }
}

export interface SetupData {
    regions?: string[];
    studyLevel: 1 | 2 | 3;
    interests?: string[];
    maturaResults?: string[];
    futureSkills?: string[];
    specialization?: string;
    language: "pl" | "en";
    lastStudies?: string;
}
type Step =
    | "regions"
    | "regions/studied"
    | "regions/studied/level"
    | "regions/studied/level(1or2)/interests"
    | "regions/studied/level(3)/specialization";

export function Setup() {
    const [step, setStep] = useState<Step>("regions");
    const [data, setData] = useState<SetupData>({
        studyLevel: 1,
        language: "pl",
    });
    console.log(data, step);

    return (
        <main className="grid grid-rows-[5rem_1rem] justify-center">
            <CurrentStep step={step} setStep={setStep} setData={setData} />
        </main>
    );
}
