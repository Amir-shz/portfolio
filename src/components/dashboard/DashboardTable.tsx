import { digitsEnToFa } from "@persian-tools/persian-tools";
import DashboardTableBtns from "./DashboardTableBtns";
import { planData } from "@/data/planData";

function DashboardTable({
  reservations,
}: {
  reservations: {
    fullName: string;
    phone: string;
    status: string;
    plan: number;
    _id: string;
  }[];
}) {
  return (
    <div className=" col-span-4 shadow-md rounded-lg bg-violet-50 border border-violet-100 p-2 pl-3">
      <table className="w-full">
        <thead className=" font-semibold text-neutral-600 border-b">
          <tr className=" grid grid-cols-8 justify-items-center">
            <td className="col-span-2">نام</td>
            <td className="col-span-2">شماره</td>
            <td className="col-span-1">وضعیت</td>
            <td className="col-span-1">طرح</td>
            <td className="col-span-1">قیمت</td>
            <td></td>
          </tr>
        </thead>
        <tbody className=" flex flex-col gap-2">
          {reservations.map((reservation, index) => (
            <tr
              key={index}
              className=" first:mt-2 grid grid-cols-8 justify-items-center items-center text-sm text-neutral-500 font-semibold"
            >
              <td className=" col-span-2">{reservation.fullName}</td>
              <td className=" col-span-2">{digitsEnToFa(reservation.phone)}</td>
              <td
                className={`${
                  reservation.status === "new"
                    ? " text-green-600 bg-green-200 "
                    : " text-yellow-600 bg-yellow-200"
                } col-span-1 px-2 rounded-md leading-4`}
              >
                {reservation.status === "new" ? "جدید" : "تمام شده"}
              </td>
              <td className=" col-span-1">
                {planData.filter((el) => el.id === reservation.plan)[0].title}
              </td>
              <td className=" col-span-1">
                {planData.filter((el) => el.id === reservation.plan)[0].price}
              </td>
              <td className=" flex gap-1">
                <DashboardTableBtns
                  id={reservation._id}
                  status={reservation.status}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DashboardTable;
