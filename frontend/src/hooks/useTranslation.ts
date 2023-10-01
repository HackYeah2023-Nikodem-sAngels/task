import { translations } from "@/translations";
import { useParams } from "react-router";

export function useTranslation() {
    const { language } = useParams<{ language: "en" | "pl" }>();
    return (key: string) => translations[key][language!];
}
