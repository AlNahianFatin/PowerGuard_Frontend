import {
  BadgeCheck,
  Briefcase,
  FileText,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  User,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import type { ApproveTechnicianPayload, Role, TechnicianParams } from "@/types";
import { useApproveTechnician, useGetAllTechnicians } from "@/hooks";
import { toast } from "@/components/ui/toast";

interface Props extends TechnicianParams {
  role?: Role;
  selectedId: string;
  onClose: () => void;
}

export default function TechnicianReviewSheet({
  role = "OPERATOR",
  selectedId,
  onClose,
  ...params
}: Props) {
  const [confirmRejection, setConfirmRejection] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");

  const { data } = useGetAllTechnicians(params);
  const { mutate: verify, isPending } = useApproveTechnician();

  const selectedTechnician = data?.data?.find((technician) => technician.id === selectedId);

  const handleClose = () => {
    setConfirmRejection(false);
    setRejectionReason("");
    onClose();
  };

  const handleReviewAction = (status: "APPROVED" | "REJECTED") => {
    const reviewData: ApproveTechnicianPayload = {
      technicianId: selectedId,
      verificationStatus: status,
      rejectionReason: rejectionReason,
    };

    verify(reviewData, {
      // biome-ignore lint/suspicious/noExplicitAny: <sdf>
      onSuccess: (res: any) => {
        if (!res.success) {
          toast.add({
            title: "Technician application management failure",
            description: res.data?.message || res?.message || "Something went wrong. Please try again",
            type: "failure",
          });
        }
        toast.add({
          title: "Technician application managed",
          description: res?.message || `Application ${status.toLowerCase()} successfully`,
          type: "success",
        });

        handleClose();
      },
      // biome-ignore lint/suspicious/noExplicitAny: <sd>
      onError: (error: any) => {
        toast.add({
          title: "Application management failure",
          description: error.data?.message || "Something went wrong. Please try again",
          type: "failure",
        });
      },
    });
  };

  if (!selectedTechnician) {
    return null;
  }

  if (role !== "ADMIN") {
    return null;
  }

  // const detailRow = (label: string, value?: string | number | null, children?: ReactNode) => (
  //   <div className="flex items-start justify-between gap-4 text-sm">
  //     <div className="flex shrink-0 text-muted-foreground gap-3">
  //       {children}
  //       <span className="text-muted-foreground">{label}</span>
  //     </div>
  //     <span className="text-right font-medium wrap-break-words">
  //       {value || <span className="font-normal text-muted-foreground">—</span>}
  //     </span>
  //   </div>
  // );

  return (
    <Sheet open={!!selectedId} onOpenChange={handleClose}>
      <SheetContent side="bottom" className="gap-0  w-full">
        <SheetHeader className="border-b">
          <SheetTitle>Review technician application</SheetTitle>
          <SheetDescription>
            Verify the details below before approving or rejecting. This action
            cannot be undone.
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 space-y-5 overflow-y-auto px-4 py-5">
          <div className="flex items-start gap-3">
            <span className="rounded-full bg-primary/10 p-2.5">
              <User className="size-5 text-primary" />
            </span>
            <div className="min-w-0">
              <p className="truncate font-semibold mt-2">{selectedTechnician.name}</p>
              {/* <p className="text-sm text-muted-foreground">
                {selectedTechnician.specialization}
              </p> */}
            </div>
          </div>

          <Separator />

          <div className="space-y-3">
            <p className="text-xs font-semibold tracking-wide uppercase">
              Contact
            </p>

            <div className="flex items-center gap-2 text-sm">
              <Mail className="size-4 shrink-0 text-muted-foreground" />
              <span className="truncate" title={selectedTechnician.email}>
                {selectedTechnician.email}
              </span>
            </div>

            <div className="flex items-center gap-2 text-sm">
              <MapPin className="size-4 shrink-0 text-muted-foreground" />
              <span>{selectedTechnician.address || "—"}</span>
            </div>

            <div className="flex items-center gap-2 text-sm">
              <Phone className="size-4 shrink-0 text-muted-foreground" />
              <span>{selectedTechnician.contactNumber || "—"}</span>
            </div>
          </div>

          <Separator />

          <div className="space-y-3">
            <p className="text-xs font-semibold tracking-wide uppercase">
              Credentials
            </p>
            {/* {detailRow("License no.", selectedTechnician.licenseNumber)}
            {detailRow("Qualifications", selectedTechnician.qualifications)} */}
            <div className="flex items-center gap-2 text-sm">
              <Briefcase className="size-4 shrink-0 text-muted-foreground" />
              <span>{selectedTechnician.experienceYears || 0}&nbsp;years</span>
            </div>
          </div>

          {selectedTechnician.bio && (
            <>
              <Separator />
              <div className="space-y-2">
                <p className="text-xs font-semibold tracking-wide uppercase">
                  Bio
                </p>

                <div className="flex items-center gap-1 text-sm overflow-visible">
                  <FileText className="size-4 shrink-0 text-muted-foreground" />
                  <span title={selectedTechnician.bio}></span>
                  <dd>{selectedTechnician.bio || "—"}</dd>
                </div>
              </div>
            </>
          )}

          <Separator />

          <div className="space-y-3">
            <p className="text-xs font-semibold tracking-wide uppercase">
              Verification
            </p>
            <div className="flex items-center gap-2 text-sm">
              <ShieldCheck className="size-4 shrink-0 text-muted-foreground" />
              <span>{selectedTechnician.verificationStatus}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <BadgeCheck className="size-4 shrink-0 text-muted-foreground" />
              <span>
                {selectedTechnician.user.emailVerified
                  ? "Email verified"
                  : "Email not verified"}
              </span>
            </div>
          </div>
        </div>

        <SheetFooter className="border-t">
          {confirmRejection ? (
            <div className="flex w-full flex-col gap-3">
              <Textarea
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                placeholder="Let the technician know why this application is being rejected…"
                rows={4}
                disabled={isPending}
                autoFocus
              />
              <div className="flex gap-2 justify-center">
                <Button
                  onClick={handleClose}
                  variant="outline"
                  size="lg"
                  className="flex-1 max-w-50"
                  disabled={isPending}
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => handleReviewAction("REJECTED")}
                  variant="destructive"
                  size="lg"
                  className="flex-1 max-w-50"
                  disabled={!rejectionReason.trim() || isPending}
                >
                  {isPending ?
                    <><Spinner /> Rejecting</> : "Confirm Rejection"}
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex w-full gap-2 justify-center">
              <Button
                onClick={() => setConfirmRejection(true)}
                variant="destructive"
                size="lg"
                className="flex-1 max-w-50"
                disabled={isPending}
              >
                Reject
              </Button>
              <Button
                onClick={() => handleReviewAction("APPROVED")}
                variant="default"
                size="lg"
                className="flex-1 max-w-50"
                disabled={isPending}
              >
                {isPending ?
                  <><Spinner /> Approving</> : "Approve"}
              </Button>
            </div>
          )}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
