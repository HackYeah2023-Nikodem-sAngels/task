import { useEffect, useState } from "react";

export function useTextAnimation(ref: HTMLElement, text: string) {
    const [completed, setCompleted] = useState(false);

    useEffect(() => {
        const id = setTimeout(typeWriter, 1000);
        return () => clearTimeout(id);
    }, []);

    let i = 0;
    const typeWriter = () => {
        if (i < text.length) {
            const letter = text.charAt(i);
            ref.textContent += letter;
            setTimeout(typeWriter, [".", "!", "?"].includes(letter) ? 500 : 35);
            i++;
        } else setCompleted(true);
    };

    return completed;
}
