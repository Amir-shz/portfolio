import ChangePassForm from "@/components/dashboard/ChangePassForm";
import ChangeUserDataForm from "@/components/dashboard/ChangeUserDataForm";
import PageHeader from "@/components/dashboard/PageHeader";
import SignupForm from "@/components/dashboard/SignupForm";
import UserDelBtn from "@/components/dashboard/UserDelBtn";
import { getCurrentUser } from "@/lib/session";
import User from "@/models/userModel";
import { digitsEnToFa } from "@persian-tools/persian-tools";
import { KeyRound, UserRoundPen, UserRoundPlus, UsersRound } from "lucide-react";
import { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import { redirect } from "next/navigation";
import { requireSession } from "@/lib/session";

export const metadata: Metadata = {
  title: "تنظیمات کاربر",
};

function Card({
  icon: Icon,
  title,
  description,
  children,
  className = "",
}: {
  icon: typeof KeyRound;
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={`glass rounded-[1.25rem] p-4 sm:p-5 ${className}`}>
      <div className="mb-4 flex items-center gap-2.5">
        <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-iris-tint text-iris">
          <Icon className="size-4" aria-hidden />
        </span>
        <div>
          <h2 className="text-[0.9375rem] font-bold text-ink">{title}</h2>
          {description && <p className="text-[0.75rem] text-ink-faint">{description}</p>}
        </div>
      </div>
      {children}
    </section>
  );
}

async function Page() {
  await requireSession();
  const currentUser = await getCurrentUser();
  if (!currentUser) redirect("/login");

  // the users list is only needed (and only shown) for the OWNER
  const users = currentUser.role === "OWNER" ? await User.find() : [];

  return (
    <>
      <PageHeader title="تنظیمات حساب" description="اطلاعات حساب، رمزعبور و کاربران پنل" />

      <div className="grid grid-cols-1 items-start gap-4 sm:gap-5 lg:grid-cols-2">
        <SessionProvider>
          <Card icon={UserRoundPen} title="اطلاعات حساب" description="نام و ایمیل شما">
            <ChangeUserDataForm />
          </Card>
          <Card icon={KeyRound} title="تغییر رمزعبور">
            <ChangePassForm />
          </Card>
        </SessionProvider>

        <Card
          icon={UserRoundPlus}
          title="ایجاد حساب جدید"
          description="برای دسترسی یک مدیر دیگر به پنل"
          className="lg:col-span-2 xl:col-span-1"
        >
          <SignupForm />
        </Card>

        {currentUser.role === "OWNER" && (
          <Card
            icon={UsersRound}
            title="کاربران پنل"
            description={`${digitsEnToFa(users.length)} کاربر`}
            className="min-w-0 lg:col-span-2 xl:col-span-1"
          >
            <ul className="grid gap-2">
              {users.map(
                (user: {
                  _id: string;
                  name: string;
                  email: string;
                  createdAt: Date;
                  role: "ADMIN" | "OWNER";
                }) => (
                  <li
                    key={String(user._id)}
                    className="flex items-center gap-3 rounded-xl border border-white bg-white/65 p-3"
                  >
                    <span
                      aria-hidden
                      className="grid size-10 shrink-0 place-items-center rounded-full bg-gradient-to-br from-iris to-iris-soft font-bold text-white"
                    >
                      {user.name?.[0]}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="flex flex-wrap items-center gap-2 font-bold text-ink">
                        {user.name}
                        <span
                          className={`chip py-0.5 text-xs ${
                            user.role === "OWNER"
                              ? "bg-iris text-white"
                              : "bg-iris-wash text-iris-deep"
                          }`}
                        >
                          {user.role === "OWNER" ? "مدیر کل" : "مدیر"}
                        </span>
                      </p>
                      <p dir="ltr" className="truncate text-right text-sm text-ink-soft">
                        {user.email}
                      </p>
                      <p className="text-xs text-ink-faint">
                        ساخته شده در{" "}
                        {new Date(user.createdAt).toLocaleString("fa-IR", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                    <UserDelBtn id={String(user._id)} role={user.role} />
                  </li>
                ),
              )}
            </ul>
          </Card>
        )}
      </div>
    </>
  );
}

export default Page;
