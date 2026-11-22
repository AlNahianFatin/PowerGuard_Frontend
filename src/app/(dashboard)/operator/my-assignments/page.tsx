import MyAssignmentList from '../../../../components/modules/my-assignment/my-assignment-list';

const MyAssignmentsPage = () => {
  return (
    <section>
      <div>
        <h1 className="text-2xl">My Service Requests</h1>
        <p>View and manage records of service requests</p>
      </div>
      <MyAssignmentList />
    </section>
  );
}

export default MyAssignmentsPage