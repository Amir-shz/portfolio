"use server";

const delay = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export async function createReservation(data: object) {
  await delay(5000);
  console.log(data);
}
