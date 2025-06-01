import DataStatisticsLayout from "./_layout/data-statistics";

export default function AdminPage({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-background">
      <DataStatisticsLayout>{children}</DataStatisticsLayout>
    </main>
  );
}