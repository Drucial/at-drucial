export function CalendarGrid({
  selectedDate,
  onSelectDate,
}: {
  selectedDate: number | null;
  onSelectDate: (day: number) => void;
}) {
  // Simple calendar for current month
  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();
  const firstDay = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  const monthName = today.toLocaleString("default", { month: "long" });

  const days = [];
  // Add empty cells for days before the 1st
  for (let i = 0; i < firstDay; i++) {
    days.push(null);
  }
  // Add the days of the month
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  return (
    <div className="border-border border">
      <div className="border-border flex items-stretch border-b text-xs uppercase tracking-widest">
        <span className="text-muted-foreground flex-1 px-4 py-2">
          Select Date
        </span>
        <span className="border-border text-muted-foreground/50 border-l px-4 py-2">
          {monthName} {currentYear}
        </span>
      </div>
      <div className="grid grid-cols-7">
        {["S", "M", "T", "W", "T", "F", "S"].map((day, i) => (
          <div
            key={i}
            className={`border-border text-muted-foreground border-b p-2 text-center text-xs ${i < 6 ? "border-r" : ""}`}
          >
            {day}
          </div>
        ))}
        {days.map((day, i) => (
          <button
            key={i}
            disabled={day === null || day < today.getDate()}
            type="button"
            className={`border-border p-2 text-center text-sm transition-colors ${
              (i + 1) % 7 !== 0 ? "border-r" : ""
            } ${
              i < days.length - 7 ||
              (days.length % 7 !== 0 && i < days.length - (days.length % 7))
                ? "border-b"
                : ""
            } ${
              day === null
                ? "cursor-default"
                : day === selectedDate
                  ? "bg-foreground text-background"
                  : day < today.getDate()
                    ? "text-foreground/30 cursor-not-allowed"
                    : "text-foreground/60 hover:bg-muted hover:text-foreground"
            }`}
            onClick={() => day && onSelectDate(day)}
          >
            {day}
          </button>
        ))}
      </div>
    </div>
  );
}