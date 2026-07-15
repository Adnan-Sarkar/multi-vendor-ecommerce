import {
  ShieldCheck,
  Envelope,
  Phone,
  CalendarBlank,
} from "@phosphor-icons/react/dist/ssr";

type CustomerProfile = {
  date_of_birth: string | null;
  gender: string | null;
};

type Profile = {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  role: string;
  avatar: string | null;
  is_active: boolean;
  email_verified_at: string | null;
  created_at: string;
  customer_profile: CustomerProfile | null;
};

type Props = {
  profile: Profile;
};

function getInitials(name: string): string {
  return name
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function ProfileHeader({ profile }: Props) {
  const initials = getInitials(profile.name);
  const memberSince = formatDate(profile.created_at);

  return (
    <div className="glass overflow-hidden rounded-3xl shadow-xl shadow-indigo-500/10">
      <div className="flex flex-col items-center gap-6 p-8 text-center sm:flex-row sm:items-center sm:text-left sm:p-9">
        <div className="relative flex-none">
          <div className="bg-brand-gradient absolute -inset-1.5 rounded-full opacity-60 blur-md" />
          {profile.avatar ? (
            <img
              src={profile.avatar}
              alt={profile.name}
              className="relative h-24 w-24 rounded-full border-4 border-white object-cover shadow-lg"
            />
          ) : (
            <div className="bg-brand-gradient relative flex h-24 w-24 items-center justify-center rounded-full border-4 border-white shadow-lg">
              <span className="text-3xl font-bold tracking-wide text-white">
                {initials}
              </span>
            </div>
          )}
        </div>

        <div className="flex flex-1 flex-col gap-3">
          <div className="flex flex-wrap items-center justify-center gap-2 sm:justify-start">
            <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">
              {profile.name}
            </h1>

            {profile.email_verified_at && (
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-700 ring-1 ring-emerald-200">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                Verified
              </span>
            )}

            <span className="inline-flex items-center gap-1 rounded-full bg-indigo-50 px-2.5 py-0.5 text-[11px] font-semibold capitalize text-indigo-700 ring-1 ring-indigo-200">
              <ShieldCheck size={12} weight="fill" />
              {profile.role.replace("_", " ")}
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 sm:justify-start">
            <span className="flex items-center gap-1.5 text-sm text-slate-600">
              <Envelope size={15} className="text-indigo-500" />
              {profile.email}
            </span>

            {profile.phone && (
              <>
                <span className="hidden h-3.5 w-px bg-slate-200 sm:block" />
                <span className="flex items-center gap-1.5 text-sm text-slate-600">
                  <Phone size={15} className="text-indigo-500" />
                  {profile.phone}
                </span>
              </>
            )}

            <span className="hidden h-3.5 w-px bg-slate-200 sm:block" />
            <span className="flex items-center gap-1.5 text-sm text-slate-500">
              <CalendarBlank size={15} className="text-indigo-500" />
              Joined {memberSince}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
