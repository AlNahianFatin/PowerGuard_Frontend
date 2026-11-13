import type { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface AnalyticsCardProps {
    title: string;
    value: number | string;
    description: string;
    icon: LucideIcon;
    color?: "blue" | "green" | "yellow" | "red" | "purple" | "default";
}

const colorStyles = {
    blue: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
    green: "bg-green-500/10 text-green-600 dark:text-green-400",
    yellow: "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400",
    red: "bg-red-500/10 text-red-600 dark:text-red-400",
    purple: "bg-purple-500/10 text-purple-600 dark:text-purple-400",
    default: "bg-primary/10 text-primary",
};

export default function AnalyticsCard({
    title,
    value,
    description,
    icon: Icon,
    color = "default",
}: AnalyticsCardProps) {
    return (
        <Card className="border-border/70 bg-card shadow-sm">
            <CardContent className="flex items-start justify-between gap-4">
                <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">
                        {title}
                    </p>

                    <h3 className="text-2xl font-bold tracking-tight text-center">
                        {value}
                    </h3>

                    <p className="text-xs text-muted-foreground">
                        {description}
                    </p>
                </div>

                <div
                    className={`flex size-11 shrink-0 items-center justify-center rounded-xl ${colorStyles[color]}`}
                >
                    <Icon className="size-5" />
                </div>
            </CardContent>
        </Card>
    );
}