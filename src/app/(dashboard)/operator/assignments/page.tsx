import AssignmentList from "@/components/modules/assignment/assignment-list";

const AssignmentsPage = () => {
  return (
    <section>
      <div>
        <h1 className="text-2xl">All Assignments</h1>
        <p>View and manage all the assignments for all the service requests</p>
      </div>
      <AssignmentList />
    </section>
  );
}

export default AssignmentsPage