import { FormFieldProps } from "@/lib/utils";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useState } from "react";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useTranslation } from "@/hooks/useTranslation";

export function List(props: FormFieldProps<string[]>) {
    const [newEntry, setNewEntry] = useState("");
    const [parent] = useAutoAnimate();
    const translate = useTranslation();

    return (
        <div className="flex flex-col gap-2" ref={parent}>
            {props.value.map((entry, i) => (
                <div className="flex gap-2" key={i}>
                    <div className="flex w-full items-center justify-between gap-2 px-2">
                        <span className="text-sm">{entry}</span>
                        <Button
                            className="text-sm"
                            variant={"link"}
                            onClick={() => {
                                props.onChange(
                                    props.value.filter((_, j) => i !== j),
                                );
                            }}
                        >
                            {translate("delete")}
                        </Button>
                    </div>
                </div>
            ))}

            <div className="flex gap-2">
                <Input
                    placeholder={translate("interests_placeholder")}
                    value={newEntry}
                    onChange={(e) => setNewEntry(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            e.preventDefault();
                            if (newEntry.trim() !== "") {
                                props.onChange([...props.value, newEntry]);
                                setNewEntry("");
                            }
                        }
                    }}
                />
                <Button
                    variant="secondary"
                    disabled={newEntry.trim() === ""}
                    onClick={() => {
                        props.onChange([...props.value, newEntry]);
                        setNewEntry("");
                    }}
                >
                    {translate("add")}
                </Button>
            </div>
        </div>
    );
}
