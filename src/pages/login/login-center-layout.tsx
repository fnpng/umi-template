import useSettings from '@/utils/useSettings';
import LoginForm from './login-form';

export default function Page() {
  const settings = useSettings();

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <img
        src={require('@/assets/light_bg.jpg')}
        alt="Image"
        className="absolute -z-10 inset-0 h-full w-full object-cover"
      />
      <div className="w-full max-w-sm">
        <LoginForm settings={settings} />
      </div>
    </div>
  );
}
