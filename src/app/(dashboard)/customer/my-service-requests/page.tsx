import MyServiceRequestList from "@/components/modules/my-service-request/my-service-request-list";

export default function SchedulesPage() {
  
  return (
    <section>
      <div>
        <h1 className="text-2xl">My Service Requests</h1>
        <p>View and manage records of service requests</p>
      </div>
      <MyServiceRequestList />
    </section>
  );
}
