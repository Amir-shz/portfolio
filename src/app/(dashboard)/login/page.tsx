import { login } from "@/lib/actions";

function page() {
  return (
    <form
      action={login}
      className=" w-screen h-screen flex justify-center items-center"
    >
      <button className=" bg-purple-400 p-12">ورود</button>
    </form>
  );
}

export default page;
