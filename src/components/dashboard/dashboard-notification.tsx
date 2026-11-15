"use client";

import { useState } from "react";
import { X } from "lucide-react";
import Link from "next/link";

type NotificationImportance = "GENERAL" | "URGENT" | "WARNING";

interface NotificationProps {
    message: string;
    link?: string;
    importance?: NotificationImportance;
}

const importanceStyles: Record<
    NotificationImportance,
    {
        container: string;
        button: string;
        icon: string;
    }
> = {
    GENERAL: {
        container:
            "bg-primary/10 border-primary text-primary",
        button:
            "bg-primary/10 hover:bg-primary/20 hover:outline-primary",
        icon:
            "text-primary",
    },
    URGENT: {
        container:
            "bg-red-300/30 border-red-400 text-red-700",
        button:
            "bg-red-300/30 hover:bg-red-400/30 hover:outline-red-400",
        icon:
            "text-red-600",
    },
    WARNING: {
        container:
            "bg-amber-300/30 border-amber-400 text-amber-700",
        button:
            "bg-amber-300/30 hover:bg-amber-400/30 hover:outline-amber-400",
        icon:
            "text-amber-600",
    },
};

export const DashboardNotification = ({
    message,
    link,
    importance = "GENERAL",
}: NotificationProps) => {
    const [isVisible, setIsVisible] = useState(true);

    if (!isVisible) return null;

    const styles = importanceStyles[importance];

    return (
        <div className="flex justify-end m-2 animate-pulse">
            <div
                className={`relative flex items-center justify-center w-fit px-4 py-2 rounded-2xl border-2 ${styles.container}`}
            >
                <p>
                    {message}&nbsp;
                    {link && (
                        <Link
                            href={link}
                            className="underline hover:opacity-70"
                        >
                            Click here
                        </Link>
                    )}
                </p>

                <button
                    type="button"
                    onClick={() => setIsVisible(false)}
                    className={`absolute z-99 top-[-5] right-[-5] rounded-full p-1 transition hover:outline-1 ${styles.button}`}
                    aria-label="Dismiss notification"
                >
                    <X
                        className={`size-3 transition-colors ${styles.icon}`}
                    />
                </button>
            </div>
        </div>
    );
};
