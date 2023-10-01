import { useEffect, useState } from "react";
import { RegionStep } from "./setup/RegionStep";
import { StudiedStep } from "./setup/StudiedStep";
import { StudyLevelStep } from "./setup/StudyLevelStep";
import { InterestsStep } from "./setup/InterestsStep";
import { useNavigate, useParams } from "react-router";
import { useMutation } from "react-query";
import { useUserDataStore } from "@/zustand";

export interface StepProps {
    data: SetupData;
    onSubmit: (data: SetupData) => void;
}

export interface SetupData {
    regions?: string[];
    studyLevel?: 0 | 1 | 2 | 3;
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
    | "studied/regions/level/interests";

export function Setup() {
    const [step, setStep] = useState<Step>("studied");
    const { data, setData } = useUserDataStore();

    return (
        <main className="flex h-full items-center justify-center">
            <CurrentStep
                data={data}
                step={step}
                setStep={setStep}
                setData={setData}
            />
        </main>
    );
}

function CurrentStep(props: {
    data: SetupData;
    step: Step;
    setData: (data: SetupData) => void;
    setStep: React.Dispatch<React.SetStateAction<Step>>;
}) {
    const navigate = useNavigate();
    const { language } = useParams();
    const mutation = useMutation(["setup"], () =>
        fetch("/api/session", {
            method: "POST",
            body: JSON.stringify(props.data),
            credentials: "include",
        }),
    );

    useEffect(() => {
        // @ts-expect-error dont care anymore
        props.setData({ ...props.data, language });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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
                            data.studyLevel === 1
                                ? "studied/regions/level/interests"
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
                        props.setStep("studied/regions/level/interests");
                    }}
                />
            );
        }
        case "studied/regions/level/interests": {
            return (
                <InterestsStep
                    data={props.data}
                    onSubmit={async () => {
                        await mutation.mutateAsync();
                        navigate(`/${language}/chat`);
                    }}
                />
            );
        }
    }
}
