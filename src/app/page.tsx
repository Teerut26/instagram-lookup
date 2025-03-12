"use client";

import { useRouter } from "next/navigation";
import { useRef } from "react";

export default function Home() {
    const router = useRouter();
    const usernameInputRef = useRef<HTMLInputElement>(null);

    const handleClick = async () => {
        router.push(`/user?username=${usernameInputRef.current?.value}`);
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center">
            <div className="flex flex-col">
                <input ref={usernameInputRef} type="text" className="border rounded-3xl px-5 py-4" placeholder="Instagram Username" />
                <button onClick={handleClick} className="border rounded-3xl px-5 py-4 mt-3">
                    Lookup
                </button>
            </div>
        </div>
    );
}
