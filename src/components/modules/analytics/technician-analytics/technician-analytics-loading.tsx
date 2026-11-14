import AnalyticsSectionSkeleton from "../analytics-loader/analytics-section-skeleton";

const TechnicianAnalyticsLoading = () => {
    return (
        <div className="w-full space-y-8">
            <AnalyticsSectionSkeleton cards={5} />

            <AnalyticsSectionSkeleton cards={2} />
        </div>
    )
}

export default TechnicianAnalyticsLoading;