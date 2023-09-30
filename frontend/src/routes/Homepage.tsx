import { useNavigate } from "react-router-dom";

export function Homepage() {
    const navigate = useNavigate();

    return (
        <div
            className="w-full h-full items-center justify-center"
            onClick={() => navigate("/map")}
        >
            <h1 className="scroll-m-20 text-9xl tracking-tighter font-extrabold text-center mt-32 ">
                <span className="bg-gradient-to-r bg-clip-text text-transparent from-indigo-600 to-cyan-500 capitalize">
                    education
                </span>{" "}
                <span>
                    {/* className="bg-gradient-to-r bg-clip-text text-transparent from-purple-600 to-fuchsia-700"> */}
                    in
                </span>{" "}
                <span className="capitalize">
                    {/* className="bg-gradient-to-r bg-clip-text text-transparent from-orange-500 to-yellow-600"> */}
                    innovation
                </span>
            </h1>
        </div>
    );
}
