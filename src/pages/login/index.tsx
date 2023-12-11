import getSettings from '@/utils/getSettings';
import Banner from './banner';
import LoginForm from './login-form';

export default function LoginPage() {
  const settings = getSettings();
  return (
    <div className="w-screen h-screen space-center">
      <div className="absolute overflow-hidden w-full">
        <Banner />
      </div>
      <div className="relative -top-[64px] right-[400px]">
        <LoginForm settings={settings} />
      </div>
      <div className="w-full fixed bottom-0 text-center h-[48px] leading-[48px] text-[14px]">
        {settings?.copyright}
      </div>
    </div>
  );
}
