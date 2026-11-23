import ServiceRequestList from "@/components/modules/service-request/service-request-list";

export default function ServiceRequestsPage() {
  
  return (
    <section>
      <div>
        <h1 className="text-2xl">All Service Requests</h1>
        <p>View and manage records of service requests</p>
      </div>
      <ServiceRequestList />
    </section>
  );
}
