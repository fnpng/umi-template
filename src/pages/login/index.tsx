import useSettings from '@/utils/useSettings';
import LoginForm from './login-form';

export default function LoginPage() {
  const settings = useSettings();
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="relative hidden bg-muted lg:block drop-shadow-[0_20px_30px_rgba(0,0,0,0.20)]">
        <div className="bg-[#2b2b2b] w-full h-full space_center hue-rotate-[0deg]">
          <video autoPlay muted loop className="w-full">
            <source src={require('@/assets/login_bg.mp4')} type="video/mp4" />
          </video>
        </div>
        {/* <img
          src={require('@/assets/placeholder.svg').default}
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        /> */}
      </div>
      <div className="flex flex-col gap-4 p-6 md:p-10 overflow-hidden bg-gradient-to-t from-slate-200 to-white">
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-md">
            <LoginForm settings={settings} />
          </div>
        </div>
      </div>
    </div>
  );
}
