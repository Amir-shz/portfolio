// import { auth } from "@/auth";
// import User from "@/models/userModel";
// import { NextResponse } from "next/server";

// export async function GET() {
//   const session = await auth();

//   if (session?.user) {
//     const users = await User.find();

//     return NextResponse.json({
//       status: "success",
//       length: users.length,
//       data: users,
//     });
//   }
//   return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
// }
