import MyAssignmentList from "@/components/modules/my-assignment/my-assignment-list";

const MyAssignmentsPage = () => {
  return (
    <section>
      <div>
        <h1 className="text-2xl">My Assignments</h1>
        <p>View and manage all the assignments appointed to you</p>
      </div>
      {/** biome-ignore lint/a11y/useValidAriaRole: <fgf> */}
      <MyAssignmentList role="TECHNICIAN" />
    </section>
  );
}

export default MyAssignmentsPage