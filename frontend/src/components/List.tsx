import { FormFieldProps } from "@/lib/utils";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { TrashIcon } from "@heroicons/react/24/outline";

export function List(props: FormFieldProps<string[]>) {
    return (
        <div className="flex flex-col gap-2">
            {props.value.map((v, i) => (
                <div key={i} className="flex gap-2">
                    <Input
                        id="list-input"
                        value={v}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                e.preventDefault();
                                const newValue = [...props.value];
                                newValue.push("");
                                props.onChange(newValue);
                            }
                        }}
                        onChange={(e) => {
                            const newValue = [...props.value];
                            newValue[i] = e.target.value;
                            props.onChange(newValue);
                        }}
                    />
                    <Button
                        variant={"simple"}
                        onClick={() => {
                            const newValue = [...props.value];
                            newValue.pop();
                            props.onChange(newValue);

                            console.log(
                                document.querySelectorAll("#list-input"),
                            );
                            const newInput = document.querySelectorAll(
                                "#list-input",
                            )[i + 1] as HTMLInputElement;
                            newInput.focus();
                        }}
                    >
                        <TrashIcon className="w-5 text-destructive" />
                    </Button>
                </div>
            ))}
            <Button
                size={"sm"}
                variant={"secondary"}
                onClick={() => props.onChange([...props.value, ""])}
            >
                Dodaj
            </Button>
        </div>
    );
}
