const OperatorAnalyticsLoading = () => {
    return (
        <div className="space-y-8 p-5">
            {[1, 2, 3, 4].map((section) => (
                <div key={section} className="space-y-4">
                    <div className="h-6 w-48 animate-pulse rounded bg-muted" />
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                        {[1, 2, 3, 4].map((card) => (
                            <div
                                key={card}
                                className="h-32 animate-pulse rounded-xl border bg-muted/40"
                            />
                        ))}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default OperatorAnalyticsLoading;