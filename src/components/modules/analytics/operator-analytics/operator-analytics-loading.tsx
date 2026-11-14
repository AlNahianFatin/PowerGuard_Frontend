import AnalyticsSectionSkeleton from "../analytics-loader/analytics-section-skeleton";

export default function OperatorAnalyticsLoading() {
    return (
        <div className="w-full space-y-8">
            <AnalyticsSectionSkeleton cards={2} />

            <AnalyticsSectionSkeleton cards={1} />

            <AnalyticsSectionSkeleton cards={6} />

            <AnalyticsSectionSkeleton cards={3} />
        </div>
    );
}
