import ScheduleList from "@/components/modules/schedule/schedule-list";

export default function SchedulesPage() {
  return (
    <section>
      <div>
        <h1 className="text-2xl">All schedules</h1>
        <p>Create schedules, publish them for booking, or delete drafts.</p>
      </div>
      <ScheduleList />
    </section>
  );
}
