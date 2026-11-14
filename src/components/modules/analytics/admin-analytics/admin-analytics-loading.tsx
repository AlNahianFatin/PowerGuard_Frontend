import AnalyticsSectionSkeleton from "../analytics-loader/analytics-section-skeleton";

const AdminAnalyticsLoading = () => {
    return (
        <div className="w-full space-y-8">
            <AnalyticsSectionSkeleton cards={4} />

            <AnalyticsSectionSkeleton cards={3} />

            <AnalyticsSectionSkeleton cards={6} />

            <AnalyticsSectionSkeleton cards={2} />
        </div>
    )
}

export default AdminAnalyticsLoading;