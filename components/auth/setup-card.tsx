import { Card } from "@/components/ui/card";

type SetupCardProps = {
  title: string;
};

export function SetupCard({ title }: SetupCardProps) {
  return (
    <Card className="p-6">
      <p className="text-lg font-semibold tracking-[-0.03em] text-[var(--color-text)]">
        {title}
      </p>
      <p className="mt-3 text-sm leading-7 text-[var(--color-text-soft)]">
        Supabase environment variables are not configured yet. Add
        `NEXT_PUBLIC_SUPABASE_URL` and
        `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` before using auth, saved
        calculations, or the protected dashboard.
      </p>
    </Card>
  );
}
