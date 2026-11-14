import { Suspense } from "react";
import ChangePasswordForm from "@/components/form/change-password-form";
import VerifyAccountLoader from "@/components/loader/verify-account-loader";

export default function ResetPasswordPage() {
    return (
        <div className="flex justify-center items-center min-h-150">
            <div className="w-full max-w-md">
                <Suspense fallback={<VerifyAccountLoader />}>
                    <ChangePasswordForm />
                </Suspense>
            </div>
        </div>
    );
}
