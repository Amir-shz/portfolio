// Reservation status, used in every table, card and detail view.
function StatusPill({ status }: { status: string }) {
  const isNew = status === "new";
  return (
    <span className={isNew ? "status-new" : "status-done"}>
      <span
        aria-hidden
        className={`size-1.5 rounded-full ${isNew ? "bg-ok" : "bg-warn"}`}
      />
      {isNew ? "جدید" : "تمام شده"}
    </span>
  );
}

export default StatusPill;
