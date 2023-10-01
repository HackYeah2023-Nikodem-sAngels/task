import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useTranslation } from "@/hooks/useTranslation";
import { ArrowPathIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

export function Homepage() {
    const { language } = useParams();
    const navigate = useNavigate();
    const [authed, setAuthed] = useState(false);
    const getTranslation = useTranslation();

    useEffect(() => {
        if (!["pl", "en"].includes(language!)) {
            navigate("/en");
        }
        if (Cookies.get("hackyeah")) {
            setAuthed(true);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="flex h-full items-center">
            <Select
                defaultValue={language}
                onValueChange={(value) => navigate(`/${value}`)}
            >
                <SelectTrigger className="absolute right-4 top-4 w-[130px] opacity-80">
                    <SelectValue placeholder="Język" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="pl">Polski</SelectItem>
                    <SelectItem value="en">English</SelectItem>
                </SelectContent>
            </Select>

            <div className="mx-auto flex flex-col items-center gap-10">
                <h1 className="text-center text-6xl font-bold leading-tight tracking-tighter ">
                    <span>{getTranslation("homepage_hero_1")}</span>{" "}
                    <span className="text-primary">
                        {getTranslation("homepage_hero_2")}
                    </span>{" "}
                    <span>{getTranslation("homepage_hero_3")}</span>
                </h1>

                <div className="flex gap-6">
                    <Button
                        size={"lg"}
                        className="flex gap-3 px-6 py-7 text-2xl font-medium"
                        onClick={() => navigate(`/${language}/setup`)}
                    >
                        {authed
                            ? getTranslation("homepage_continue")
                            : getTranslation("homepage_cta")}
                        <ArrowRightIcon className="w-6" />
                    </Button>

                    {authed && (
                        <Button
                            size={"lg"}
                            variant={"secondary"}
                            className="flex gap-3 px-6 py-7 text-2xl font-medium"
                            onClick={() => {
                                Cookies.remove("hackyeah");
                                navigate("/");
                            }}
                        >
                            {getTranslation("homepage_reset")}
                            <ArrowPathIcon className="w-6" />
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
}
