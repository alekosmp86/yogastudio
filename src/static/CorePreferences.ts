import { AppPreference } from "@/types/preferences/AppPreference";
import { PreferenceTypes } from "@/enums/PreferenceTypes";

export const CorePreferences: AppPreference[] = [
    {
        id: 1,
        name: "businessName",
        label: "Business Name",
        type: PreferenceTypes.TEXT,
        value: "GymStudio"
    },
    {
        id: 2,
        name: "businessWhatsappNumber",
        label: "Business Whatsapp Number",
        type: PreferenceTypes.TEXT,
        value: "94662337"
    },
    {
        id: 3,
        name: "businessEmail",
        label: "Business Email",
        type: PreferenceTypes.TEXT,
        value: "alekosmp86@gmail.com"
    },
    {
        id: 4,
        name: "timezone",
        label: "Timezone",
        type: PreferenceTypes.TEXT,
        value: "America/Montevideo"
    },
    {
        id: 5,
        name: "language",
        label: "Default Language",
        type: PreferenceTypes.TEXT,
        value: "es"
    },
    {
        id: 6,
        name: "usersRequireApproval",
        label: "Users require approval",
        type: PreferenceTypes.BOOLEAN,
        value: "true"
    },
    {
        id: 7,
        name: "penaltyMaxNoShowCount",
        label: "Max No Show Count",
        type: PreferenceTypes.NUMBER,
        value: "2"
    },
    {
        id: 8,
        name: "penaltyBlockDuration",
        label: "Penalty Block Duration (days)",
        type: PreferenceTypes.NUMBER,
        value: "3"
    }
];