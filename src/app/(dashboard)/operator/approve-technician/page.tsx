import TechnicianApprovalTabs from "@/components/modules/technician-approval/technician-approval-tabs";

export default function page() {
  return (
    <section className="p-5">
      <div>
        <h1 className="text-2xl"> Technician approval </h1>
        <p>Review the technician application and approve or reject them.</p>
      </div>
      {/** biome-ignore lint/a11y/useValidAriaRole: <sdf> */}
      <TechnicianApprovalTabs role="OPERATOR" />
    </section>
  );
}
