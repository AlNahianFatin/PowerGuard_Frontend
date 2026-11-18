import TechnicianApprovalTabs from "@/components/modules/technician-approval/technician-approval-tabs";

export default function AllTechniciansPage() {
  return (
    <section className="p-5">
      <div>
        <h1 className="text-2xl"> All Technicians </h1>
        <p>View all the technicians in the system.</p>
      </div>
      {/** biome-ignore lint/a11y/useValidAriaRole: <sdf> */}
      <TechnicianApprovalTabs role="OPERATOR" />
    </section>
  );
}
