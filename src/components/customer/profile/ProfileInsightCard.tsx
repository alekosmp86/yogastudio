import { Card, CardContent } from "@/components/shared/Card";

type ProfileInsightCardProps = {
  label: string;
  value: number;
};

export default function ProfileInsightCard({ label, value }: ProfileInsightCardProps) {

  return (
    <Card>
      <CardContent className="p-4">
        <p className="text-sm text-primary-600">{label}</p>
        <p className="text-2xl font-bold text-primary-800">{value}</p>
      </CardContent>
    </Card>
  );
}