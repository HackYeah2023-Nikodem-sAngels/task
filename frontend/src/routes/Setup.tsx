import { useState } from "react";
import { RegionStep } from "./setup/RegionStep";
import { StudiedStep } from "./setup/StudiedStep";
import { StudyLevelStep } from "./setup/StudyLevelStep";
import { InterestsStep } from "./setup/InterestsStep";
import { useNavigate, useParams } from "react-router";

function CurrentStep(props: {
    data: SetupData;
    step: Step;
    setData: React.Dispatch<React.SetStateAction<SetupData>>;
    setStep: React.Dispatch<React.SetStateAction<Step>>;
}) {
    const navigate = useNavigate();
    const { language } = useParams();

    switch (props.step) {
        case "studied": {
            return (
                <StudiedStep
                    data={props.data}
                    onSubmit={(data) => {
                        props.setData(data);
                        props.setStep("studied/regions");
                    }}
                />
            );
        }
        case "studied/regions": {
            return (
                <RegionStep
                    data={props.data}
                    onSubmit={(data) => {
                        props.setData(data);
                        props.setStep(
                            data.studyLevel === "1"
                                ? "studied/regions/level(1or2)-interests"
                                : "studied/regions/level",
                        );
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
                                ? "studied/regions/level(1or2)-interests"
                                : "studied/regions/level(3)-specialization",
                        );
                    }}
                />
            );
        }
        case "studied/regions/level(1or2)-interests": {
            return (
                <InterestsStep
                    data={props.data}
                    onSubmit={(data) => {
                        props.setData(data);
                        navigate(`/${language}/chat`);
                    }}
                />
            );
        }
        case "studied/regions/level(3)-specialization": {
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
    // maturaResults?: string[];
    // futureSkills?: string[];
    // specialization?: string;
    language?: "pl" | "en";
    // lastStudies?: string;
}
type Step =
    | "studied"
    | "studied/regions"
    | "studied/regions/level"
    | "studied/regions/level(1or2)-interests"
    | "studied/regions/level(3)-specialization";

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
