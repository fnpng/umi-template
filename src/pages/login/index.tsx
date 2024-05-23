import getSettings from '@/utils/getSettings';
import LoginForm from './login-form';

export default function LoginPage() {
  const settings = getSettings();
  return (
    <div className="w-screen h-screen space_center">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.indigo.100),white)] opacity-20" />
      <div className="absolute inset-y-0 right-1/2 -z-10 mr-16 w-[200%] origin-bottom-left skew-x-[-30deg] bg-white shadow-xl shadow-indigo-600/10 ring-1 ring-indigo-50 sm:mr-28 lg:mr-0 xl:mr-16 xl:origin-center" />
      <div className="relative bottom-[60px]">
        <LoginForm settings={settings} />
      </div>
      <div className="w-full fixed bottom-0 text-center h-[48px] leading-[48px] text-[14px]">
        {settings?.copyright}
      </div>
    </div>
  );
}
