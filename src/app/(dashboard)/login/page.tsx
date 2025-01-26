// "use client";
import { login } from "@/lib/actions";
// import { useActionState } from "react";

function Page() {
  // const [state, action, pending] = useActionState(login, undefined);

  // async function handleSubmit(e) {
  //   e.preventDefault();
  //   const x = await login();
  // }

  return (
    <form
      action={login}
      className=" flex flex-col gap-2 justify-center w-full items-center bg-black [&>label]:text-white"
    >
      <label>
        Email
        <input name="email" type="email" />
      </label>
      <label>
        Password
        <input name="password" type="password" />
      </label>
      <button className=" bg-purple-50 h-10 w-20">Sign In</button>
    </form>
  );
}

export default Page;
