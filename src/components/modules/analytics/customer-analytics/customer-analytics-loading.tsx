import AnalyticsSectionSkeleton from "../analytics-loader/analytics-section-skeleton";

export default function CustomerAnalyticsLoading() {
    return (
        <div className="w-full space-y-8">
            <AnalyticsSectionSkeleton cards={5} />

            <AnalyticsSectionSkeleton cards={2} />
        </div>
    );
}
