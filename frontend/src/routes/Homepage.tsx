import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
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
        <div className="mx-auto flex flex-col items-center gap-12 ">
            <h1 className="mt-32 scroll-m-20 text-center text-6xl font-bold leading-tight tracking-tighter ">
                <span>Znajdź</span>{" "}
                <span className="text-primary">uczelnię</span>{" "}
                <span>dla siebie</span>
            </h1>
            <Button
                size={"lg"}
                className="flex gap-2 text-lg font-medium"
                onClick={() => navigate(`/${language}/setup`)}
            >
                {authed ? "Kontynuuj" : "Rozpocznij"}
                <ArrowRightIcon className="w-5" />
            </Button>
        </div>
    );
}
