import { Skeleton } from "@/components/ui/skeleton";
import AnalyticsCardSkeleton from "./analytics-card-skeleton";

export default function AnalyticsSectionSkeleton({
    cards,
}: {
    cards: number;
}) {
    return (
        <section className="space-y-4">
            {/* Section Heading */}
            <div className="space-y-1">
                <Skeleton className="h-7 w-48" />
                <Skeleton className="h-4 w-72 max-w-full" />
            </div>

            {/* Analytics Cards */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {Array.from({ length: cards }).map((_, index) => (
                    // biome-ignore lint/suspicious/noArrayIndexKey: <sda>
                    <AnalyticsCardSkeleton key={index} />
                ))}
            </div>
        </section>
    );
}