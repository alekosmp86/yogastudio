import Button from "@/components/shared/Button";
import { Card, CardContent } from "@/components/shared/Card";
import { useState } from "react";
import ProfileReadOnly from "./ProfileReadOnly";
import EditProfileForm from "./EditProfileForm";
import { useTranslation } from "react-i18next";

type ProfileCardProps = {
  user: {
    name: string;
    email: string;
    phone?: string;
    createdAt: string;
  };
  onSave: (data: { name: string; email: string; phone?: string }) => void;
};

export default function ProfileCard({
  user,
  onSave,
}: ProfileCardProps) {
  const { t } = useTranslation();
  const [editing, setEditing] = useState(false);

  return (
    <Card>
      <CardContent className="p-6 flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold text-primary-800">
            {t("personalInformation")}
          </h2>

          {!editing && (
            <Button
              size="sm"
              variant="primary"
              onClick={() => setEditing(true)}
            >
              {t("edit")}
            </Button>
          )}
        </div>

        {editing ? (
          <EditProfileForm
            user={user}
            onCancel={() => setEditing(false)}
            onSave={(data) => {
              onSave(data);
              setEditing(false);
            }}
          />
        ) : (
          <ProfileReadOnly user={user} />
        )}
      </CardContent>
    </Card>
  );
}
