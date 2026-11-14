import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function AnalyticsCardSkeleton() {
    return (
        <Card className="border-border/70 bg-card shadow-sm">
            <CardContent className="flex items-start justify-between gap-4">
                {/* Card Information */}
                <div className="space-y-4">
                    {/* Title */}
                    <Skeleton className="h-4 w-32" />

                    {/* Value */}
                    <Skeleton className="h-8 w-20" />

                    {/* Description */}
                    <Skeleton className="h-3 w-36" />
                </div>

                {/* Icon */}
                <div className="mt-5 mr-5 flex size-11 shrink-0 items-center justify-center rounded-xl">
                    <Skeleton className="size-6 rounded-md" />
                </div>
            </CardContent>
        </Card>
    );
} 