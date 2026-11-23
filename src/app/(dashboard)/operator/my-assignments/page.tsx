import MyAssignmentList from '../../../../components/modules/my-assignment/my-assignment-list';

const MyAssignmentsPage = () => {
  return (
    <section>
      <div>
        <h1 className="text-2xl">My Service Requests</h1>
        <p>View and manage records of service requests</p>
      </div>
      {/** biome-ignore lint/a11y/useValidAriaRole: <fgf> */}
      <MyAssignmentList role="OPERATOR" />
    </section>
  );
}

export default MyAssignmentsPage