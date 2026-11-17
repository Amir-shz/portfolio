import PageHeader from "@/components/dashboard/PageHeader";
import ReservationRowBtns from "@/components/dashboard/ReservationRowBtns";
import StatusPill from "@/components/dashboard/StatusPill";
import { planData } from "@/data/planData";
import dbConnect from "@/lib/mongoose";
import Reservation from "@/models/reservationModel";
import { getJalaliDetails } from "@/utils/utils";
import { digitsEnToFa } from "@persian-tools/persian-tools";
import { Metadata } from "next";
import { requireSession } from "@/lib/session";

export const metadata: Metadata = {
  title: "رزرو",
};

function Item({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-white bg-white/65 px-4 py-3.5">
      <dt className="text-xs font-bold text-ink-faint">{label}</dt>
      <dd className="mt-1 font-bold text-ink">{children}</dd>
    </div>
  );
}

async function page({ params }: { params: Promise<{ reservationId: string }> }) {
  await requireSession();
  const reservationId = (await params).reservationId;

  await dbConnect();

  const {
    _id,
    selectedDate,
    selectedTime,
    plan: planId,
    fullName,
    phone,
    description,
    status,
    createdAt,
  } = await Reservation.findById(reservationId);

  const plan = planData.filter((el) => el.id === Number(planId))[0];

  const { day, monthName, year, dayName } = getJalaliDetails(new Date(selectedDate));
  const {
    day: createdDay,
    monthName: createdMonthName,
    year: createdYear,
  } = getJalaliDetails(new Date(createdAt));

  return (
    <>
      <PageHeader
        title={fullName}
        backHref="/dashboard/reservations"
        description={
          <span dir="ltr" className="font-mono text-xs">
            #{reservationId}
          </span>
        }
      >
        <StatusPill status={status} />
      </PageHeader>

      <div className="glass rounded-[1.25rem] p-4 sm:p-6">
        <dl className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <Item label="شماره همراه">
            <a dir="ltr" href={`tel:${phone}`} className="hover:text-iris">
              {digitsEnToFa(phone)}
            </a>
          </Item>
          <Item label="تاریخ جلسه">
            {dayName} {day} {monthName} {year}
          </Item>
          <Item label="ساعت جلسه">{digitsEnToFa(selectedTime)}</Item>
          <Item label="زمان ثبت رزرو">
            {createdDay} {createdMonthName} {createdYear}
          </Item>
          <Item label="پلن">{plan?.title}</Item>
          <Item label="مدت جلسه">{plan?.time}</Item>
          <Item label="مبلغ">
            {plan?.off ? (
              <>
                {plan.off}{" "}
                <del className="text-xs font-semibold text-ink-faint">{plan.price}</del>
              </>
            ) : (
              plan?.price
            )}
          </Item>
          <Item label="وضعیت">{status === "new" ? "جدید" : "تمام شده"}</Item>
        </dl>

        <div className="mt-3 rounded-xl border border-white bg-white/65 px-4 py-4">
          <p className="text-xs font-bold text-ink-faint">توضیحات مراجع</p>
          <p className="mt-1.5 whitespace-pre-line leading-8 text-ink">
            {description || "توضیحی ثبت نشده است."}
          </p>
        </div>

        <div className="mt-5 flex justify-end">
          <ReservationRowBtns id={String(_id)} status={status} withLabels />
        </div>
      </div>
    </>
  );
}

export default page;
