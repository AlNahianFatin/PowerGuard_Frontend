import MyServiceRequestList from "@/components/modules/my-service-request/my-service-request-list";

export default function SchedulesPage() {
  
  return (
    <section className="p-5">
      <div>
        <h1 className="text-2xl">My Service Requests</h1>
        <p>View and manage records of service requests</p>
      </div>
      <MyServiceRequestList />
    </section>
  );
}
