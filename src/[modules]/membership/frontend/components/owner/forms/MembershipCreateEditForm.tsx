"use client";

import Button from "@/components/shared/Button";
import { Card, CardContent } from "@/components/shared/Card";
import Container from "@/components/shared/Container";
import PageSectionWithHeader from "@/components/shared/PageSectionWithHeader";
import { ApiType } from "@/enums/ApiTypes";
import { RequestStatus } from "@/enums/RequestStatus";
import { ToastType } from "@/enums/ToastType";
import { useToast } from "@/lib/contexts/ToastContext";
import { http } from "@/lib/http";
import { Membership } from "@/modules/membership/backend/api/models/Membership";
import { ApiResponse } from "@/types/requests/ApiResponse";
import Link from "next/link";
import { useReducer, useState } from "react";
import { useTranslation } from "react-i18next";

type FormState = {
  name: string,
  durationDays: number,
  unlimited: boolean,
  maxActivities: number,
  isActive: boolean,
}

enum FormActionType {
  SET_NAME,
  SET_DURATION_DAYS,
  SET_UNLIMITED,
  SET_MAX_ACTIVITIES,
  SET_IS_ACTIVE,
}

const reducer = (state: FormState, action: { type: FormActionType, payload: string | number | boolean }) => {
  switch (action.type) {
    case FormActionType.SET_NAME:
      return { ...state, name: action.payload as string };
    case FormActionType.SET_DURATION_DAYS:
      return { ...state, durationDays: action.payload as number };
    case FormActionType.SET_UNLIMITED:
      return { ...state, unlimited: action.payload as boolean };
    case FormActionType.SET_MAX_ACTIVITIES:
      return { ...state, maxActivities: action.payload as number };
    case FormActionType.SET_IS_ACTIVE:
      return { ...state, isActive: action.payload as boolean };
    default:
      return state;
  }
}

export default function MembershipPlanCreateForm() {
  const { t } = useTranslation();
  const { showToast } = useToast();
  const [formState, setFormState] = useReducer(reducer, {
    name: "",
    durationDays: 30,
    unlimited: false,
    maxActivities: 1,
    isActive: true,
  });

  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (formState.durationDays <= 0) {
      setError(t("durationMustBeGreaterThanZero"));
      return;
    }

    if (!formState.unlimited && formState.maxActivities <= 0) {
      setError(t("maxActivitiesMustBeGreaterThanZero"));
      return;
    }

    const payload = {
      name: formState.name,
      durationDays: formState.durationDays,
      maxActivities: formState.unlimited ? -1 : formState.maxActivities,
      isActive: formState.isActive,
    };

    const { message } = await http.post<ApiResponse<Membership>>(
      "/owner/membership/create",
      ApiType.FRONTEND,
      payload
    );

    if (message === RequestStatus.SUCCESS) {
      showToast({
        type: ToastType.SUCCESS,
        message: t("membershipPlanCreatedSuccessfully"),
        duration: 3000,
      });
    }
  };

  return (
    <Container>
      <PageSectionWithHeader
        title={t("createMembershipPlan")}
        description={t("defineMembershipDetails")}
      >
        <Card className="max-w-xl mx-auto bg-white shadow-md rounded-2xl">
          <CardContent className="p-6 sm:p-8">
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              {/* Name */}
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-custom-300">
                  {t("name")}
                </label>
                <input
                  type="text"
                  value={formState.name}
                  onChange={(e) => setFormState({ type: FormActionType.SET_NAME, payload: e.target.value })}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-custom-200"
                  required
                />
              </div>

              {/* Duration */}
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-custom-300">
                  {t("duration")}
                </label>
                <input
                  type="number"
                  min={1}
                  value={formState.durationDays}
                  onChange={(e) => setFormState({ type: FormActionType.SET_DURATION_DAYS, payload: Number(e.target.value) })}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-custom-200"
                  required
                />
              </div>

              {/* Unlimited */}
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="unlimited"
                  checked={formState.unlimited}
                  onChange={(e) => setFormState({ type: FormActionType.SET_UNLIMITED, payload: e.target.checked })}
                  className="h-4 w-4 accent-custom-300"
                />
                <label
                  htmlFor="unlimited"
                  className="text-sm text-custom-300 cursor-pointer"
                >
                  {t("unlimitedActivities")}
                </label>
              </div>

              {/* Max activities (only if not unlimited) */}
              {!formState.unlimited && (
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-medium text-custom-300">
                    {t("maxActivities")}
                  </label>
                  <input
                    type="number"
                    min={1}
                    value={formState.maxActivities}
                    onChange={(e) => setFormState({ type: FormActionType.SET_MAX_ACTIVITIES, payload: Number(e.target.value) })}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-custom-200"
                    required
                  />
                </div>
              )}

              {/* Active */}
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="active"
                  checked={formState.isActive}
                  onChange={(e) => setFormState({ type: FormActionType.SET_IS_ACTIVE, payload: e.target.checked })}
                  className="h-4 w-4 accent-custom-300"
                />
                <label
                  htmlFor="active"
                  className="text-sm text-custom-300 cursor-pointer"
                >
                  {t("active")}
                </label>
              </div>

              {/* Error */}
              {error && (
                <p className="text-sm text-red-500 bg-red-50 p-2 rounded-md">
                  {error}
                </p>
              )}

              {/* Actions */}
              <div className="flex justify-end mt-4 gap-2">
                <Link href="/owner/membership">
                  <Button size="sm" variant="secondary">
                    {t("cancel")}
                  </Button>
                </Link>
                <Button type="submit" size="sm" variant="primary">
                  {t("create")}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </PageSectionWithHeader>
    </Container>
  );
}
