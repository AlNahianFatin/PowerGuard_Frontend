import ScheduleList from "@/components/modules/schedule/schedule-list";

export default function SchedulesPage() {
  return (
    <section className="p-5">
      <div>
        <h1 className="text-2xl">All schedules</h1>
        <p>Create schedules, publish them for booking, or delete drafts.</p>
      </div>
      <ScheduleList />
    </section>
  );
}
