import { useState } from "react";
import { Map } from "@/components/Map";

export function Form() {
    const [voivodeship, setVoivodeship] = useState<string[]>([]);

    return (
        <div className="w-full h-full">
            <h1 className="text-center scroll-m-20 text-4xl font-extrabold lg:text-5xl mt-4 mb-12">
                Wybierz województwo
            </h1>
            <div className="w-full flex justify-center">
                <div className="w-5/12">
                    <Map value={voivodeship} onChange={setVoivodeship} />
                </div>
            </div>
        </div>
    );
}
