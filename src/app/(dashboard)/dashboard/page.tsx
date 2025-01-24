import { Metadata } from "next";

export const metadata: Metadata = {
  title: "داشبورد",
};

async function page() {
  // const reservations = await fetch("http://localhost:3000/api/v1/plan")
  //   .then((data) => data.json())
  //   .then((data) => data.data);

  // console.log(reservations);
  return <div>داشبورد</div>;
}

export default page;
