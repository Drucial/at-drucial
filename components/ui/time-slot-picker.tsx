const TIME_SLOTS = [
  "9:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "1:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
] as const;

export type TimeSlot = (typeof TIME_SLOTS)[number];

export function TimeSlotPicker({
  selectedTime,
  onSelectTime,
}: {
  selectedTime: TimeSlot | null;
  onSelectTime: (time: TimeSlot) => void;
}) {
  return (
    <div className="border-border self-start border-t border-r border-l">
      <div className="border-border text-muted-foreground border-b px-4 py-2 text-xs uppercase tracking-widest">
        Select Time
      </div>
      <div className="grid grid-cols-2">
        {TIME_SLOTS.map((time, i) => {
          const isLastCol = i % 2 === 1;

          return (
            <button
              key={time}
              type="button"
              className={`border-border relative overflow-hidden border-b px-4 py-3 text-sm transition-colors ${
                !isLastCol ? "border-r" : ""
              } ${
                selectedTime === time
                  ? "bg-foreground text-background"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              onClick={() => onSelectTime(time)}
            >
              {time}
            </button>
          );
        })}
      </div>
    </div>
  );
}