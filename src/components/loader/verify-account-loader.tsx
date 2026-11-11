
import { Skeleton } from "@/components/ui/skeleton";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "@/components/ui/card";

export default function VerifyAccountLoader() {
    return (
        <Card className="w-full">
            <CardHeader>
                <Skeleton className="h-6 w-36" />
                <Skeleton className="mt-2 h-4 w-64 max-w-full" />
            </CardHeader>

            <CardContent>
                <div className="space-y-3">
                    <Skeleton className="h-4 w-10" />

                    <div className="flex justify-between gap-2">
                        {Array.from({ length: 6 }).map((_, index) => (
                            <Skeleton
                                // biome-ignore lint/suspicious/noArrayIndexKey: <sgsw>
                                key={index}
                                className="h-10 w-10 rounded-md"
                            />
                        ))}
                    </div>

                    <Skeleton className="h-4 w-28" />
                </div>
            </CardContent>

            <CardFooter className="flex justify-between gap-3">
                <Skeleton className="h-9 w-20" />
                <Skeleton className="h-9 w-24" />
            </CardFooter>
        </Card>
    );
}
