import useSettings from '@/utils/useSettings';
import LoginForm from './login-form';

export default function LoginPage() {
  const settings = useSettings();
  return (
    <div className="grid min-h-svh lg:grid-cols-2 ">
      <div className="relative hidden bg-muted lg:block">
        <img
          src={require('@/assets/placeholder.svg').default}
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
      <div className="flex flex-col gap-4 p-6 md:p-10 overflow-hidden bg-gradient-to-t from-slate-100 to-white">
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-md">
            <LoginForm settings={settings} />
          </div>
        </div>
      </div>
    </div>
  );
}
