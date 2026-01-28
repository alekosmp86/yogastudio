import { GoogleIcon } from "../shared/GoogleIcon";
import { useTranslation } from "react-i18next";

export default function LoginPageOAuth() {
  const { t } = useTranslation();

  const onGoogleSignIn = () => {
    window.location.href = "/api/auth/providers/google";
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-custom-400 via-custom-300 to-custom-200 px-4'>
      <div className='w-full max-w-md rounded-2xl bg-white shadow-xl p-8 text-custom-300'>
        {/* Logo / App name */}
        <div className='mb-6 text-center'>
          <h1 className='text-3xl font-bold'>{t("welcome")}</h1>
          <p className='mt-2 text-sm text-custom-300/70'>
            {t("signInToManageYourClassesAndMemberships")}
          </p>
        </div>

        {/* Google OAuth */}
        <button
          onClick={onGoogleSignIn}
          className='w-full flex items-center justify-center gap-3 rounded-xl border border-gray-200 bg-white py-3 text-sm font-medium shadow-sm transition hover:bg-gray-50 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-custom-300'
        >
          <GoogleIcon className='w-5 h-5' />
          {t("continueWithGoogle")}
        </button>

        {/* Divider */}
        <div className='my-6 flex items-center gap-3 text-xs text-gray-400'>
          <div className='h-px flex-1 bg-gray-200' />
          /
          <div className='h-px flex-1 bg-gray-200' />
        </div>

        {/* Info / future auth */}
        <div className='text-center text-sm text-custom-300/70'>
          <p>{t("secureLoginPoweredByGoogle")}</p>
          <p className='mt-1'>{t("noPasswordsToRemember")}</p>
        </div>
      </div>
    </div>
  );
}
