import type { ReactNode } from "react";

interface AnalyticsSectionProps {
    title: string;
    description: string;
    children: ReactNode;
}

export default function AnalyticsSection({
    title,
    description,
    children,
}: AnalyticsSectionProps) {
    return (
        <section className="space-y-4">
            <div className="space-y-1">

                <h1 className="text-2xl">
                    {title}
                </h1>

                <p className="text-muted-foreground">
                    {description}
                </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {children}
            </div>
        </section>
    );
}