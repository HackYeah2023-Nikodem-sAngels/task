import { Button } from "@/components/ui/button";
import { ArrowPathIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

export function Homepage() {
    const { language } = useParams();
    const navigate = useNavigate();
    const [authed, setAuthed] = useState(false);

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
            <div className="mx-auto flex flex-col items-center gap-10">
                <h1 className="text-center text-6xl font-bold leading-tight tracking-tighter ">
                    <span>Znajdź</span>{" "}
                    <span className="text-primary">uczelnię</span>{" "}
                    <span>dla siebie</span>
                </h1>

                <div className="flex gap-6">
                    <Button
                        size={"lg"}
                        className="flex gap-3 px-6 py-7 text-2xl font-medium"
                        onClick={() => navigate(`/${language}/setup`)}
                    >
                        {authed ? "Kontynuuj" : "Rozpocznij"}
                        <ArrowRightIcon className="w-6" />
                    </Button>

                    {authed && (
                        <Button
                            size={"lg"}
                            variant={"secondary"}
                            className="flex gap-3 px-6 py-7 text-2xl font-medium"
                            onClick={() => Cookies.remove("hackyeah")}
                        >
                            Nowy profil
                            <ArrowPathIcon className="w-6" />
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
}
