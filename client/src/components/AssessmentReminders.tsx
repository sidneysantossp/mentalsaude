import { ArrowRight, CalendarClock, CircleCheck, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AssessmentReminder, formatReminderTiming } from "@/lib/assessmentReminders";

type AssessmentRemindersProps = {
  reminders: AssessmentReminder[];
  onStart: (assessmentId: number) => void;
};

export default function AssessmentReminders({ reminders, onStart }: AssessmentRemindersProps) {
  if (!reminders.length) return null;

  const due = reminders.filter(reminder => reminder.status === "due");
  const visibleReminders = reminders.slice(0, 3);

  return (
    <section className="mt-6 overflow-hidden rounded-3xl border border-[#b8ddd3] bg-[#eaf7f3]" aria-labelledby="assessment-reminders-title">
      <div className="flex flex-col gap-5 p-6 sm:p-7 lg:flex-row lg:items-start lg:justify-between">
        <div className="flex gap-4">
          <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-[#0a7066] text-white shadow-[0_10px_22px_-16px_rgba(8,79,73,.8)]">
            <CalendarClock className="h-5 w-5" aria-hidden="true" />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-[.15em] text-[#0a7066]">Seu próximo check-in</p>
            <h2 id="assessment-reminders-title" className="mt-2 font-display text-2xl font-semibold tracking-[-.03em] text-[#123f3b]">Um convite para se observar novamente.</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-[#4f716a]">Refazer um mesmo teste em momentos diferentes pode ajudar você a perceber mudanças. É apenas um lembrete educativo — escolha o momento que fizer sentido para você.</p>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-2 rounded-full bg-white/70 px-3 py-2 text-xs font-semibold text-[#0a7066]">
          <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
          {due.length ? `${due.length} lembrete${due.length > 1 ? "s" : ""} disponível${due.length > 1 ? "eis" : ""}` : "Próximo momento se aproxima"}
        </div>
      </div>

      <div className="grid gap-3 border-t border-[#cce6df] bg-white/45 p-4 sm:grid-cols-2 sm:p-5 lg:grid-cols-3">
        {visibleReminders.map(reminder => (
          <article key={reminder.assessmentId} className={`flex flex-col justify-between rounded-2xl border p-4 ${reminder.status === "due" ? "border-[#e8c6a8] bg-[#fff8ef]" : "border-[#d4e8e2] bg-[#fffefa]"}`}>
            <div>
              <div className="flex items-center justify-between gap-2">
                <span className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-[.1em] ${reminder.status === "due" ? "bg-[#ffe8c9] text-[#9a641b]" : "bg-[#e3f4ef] text-[#0a7066]"}`}>
                  {reminder.status === "due" ? "Pode retomar" : "Em breve"}
                </span>
                {reminder.status === "due" ? <CircleCheck className="h-4 w-4 text-[#b66a2e]" aria-hidden="true" /> : <CalendarClock className="h-4 w-4 text-[#0b7167]" aria-hidden="true" />}
              </div>
              <h3 className="mt-4 text-sm font-bold leading-5 text-[#244943]">{reminder.title}</h3>
              <p className="mt-2 text-xs leading-5 text-[#68857e]">{formatReminderTiming(reminder)}</p>
            </div>
            <Button type="button" onClick={() => onStart(reminder.assessmentId)} className="mt-4 h-9 w-full rounded-xl bg-[#0a615a] px-3 text-xs font-bold text-white hover:bg-[#074d47]">
              Refazer teste <ArrowRight className="ml-2 h-3.5 w-3.5" aria-hidden="true" />
            </Button>
          </article>
        ))}
      </div>
      {reminders.length > visibleReminders.length && <p className="border-t border-[#cce6df] px-5 py-3 text-center text-xs font-semibold text-[#5b7972]">Há mais {reminders.length - visibleReminders.length} lembrete{reminders.length - visibleReminders.length > 1 ? "s" : ""} no seu histórico.</p>}
    </section>
  );
}
