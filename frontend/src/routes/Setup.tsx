import { useState } from "react";
import { AreaStep } from "./setup/AreaStep";
import { StudiedStep } from "./setup/StudiedStep";
import { StudyLevelStep } from "./setup/StudyLevelStep";

function CurrentStep(props: {
    data: SetupData;
    step: Step;
    setData: React.Dispatch<React.SetStateAction<SetupData>>;
    setStep: React.Dispatch<React.SetStateAction<Step>>;
}) {
    switch (props.step) {
        case "studied": {
            return (
                <StudiedStep
                    data={props.data}
                    onSubmit={(data) => {
                        props.setData(data);
                        props.setStep(
                            data.studyLevel === "1"
                                ? "studied/regions"
                                : "studied/regions/level",
                        );
                    }}
                />
            );
        }
        case "studied/regions": {
            return (
                <AreaStep
                    data={props.data}
                    onSubmit={(data) => {
                        props.setData(data);
                        props.setStep("studied/regions/level");
                    }}
                />
            );
        }
        case "studied/regions/level": {
            return (
                <StudyLevelStep
                    data={props.data}
                    onSubmit={(data) => {
                        props.setData(data);
                        props.setStep(
                            data.studyLevel === "1" ||
                                data.studyLevel === "2" ||
                                data.studyLevel === "1+2"
                                ? "studied/regions/level(1or2)/interests"
                                : "studied/regions/level(3)/specialization",
                        );
                    }}
                />
            );
        }
        case "studied/regions/level(1or2)/interests": {
            return "1or2";
        }
        case "studied/regions/level(3)/specialization": {
            return "3";
        }
    }
}

export interface StepProps {
    data: SetupData;
    onSubmit: (data: SetupData) => void;
}

export interface SetupData {
    regions?: string[];
    studyLevel?: "1" | "2" | "3" | "1+2";
    interests?: string[];
    maturaResults?: string[];
    futureSkills?: string[];
    specialization?: string;
    language?: "pl" | "en";
    lastStudies?: string;
}
type Step =
    | "studied"
    | "studied/regions"
    | "studied/regions/level"
    | "studied/regions/level(1or2)/interests"
    | "studied/regions/level(3)/specialization";

export function Setup() {
    const [step, setStep] = useState<Step>("studied");
    const [data, setData] = useState<SetupData>({});
    console.log(data, step);

    return (
        <main className="grid grid-rows-[5rem_1rem] justify-center">
            <CurrentStep
                data={data}
                step={step}
                setStep={setStep}
                setData={setData}
            />
        </main>
    );
}
