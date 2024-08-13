import Logo from '@/components/Logo';
import ThemeSwitcher from '@/components/ThemeSwitcher';
import { SignIn } from '@clerk/nextjs';

export default function Page() {
  return (
    <div className='flex flex-col min-h-screen min-w-full bg-background max-h-screen'>
      <nav className='flex justify-between items-center border-b border-border h-[60px] px-4 py-2'>
        <Logo />
        <div className='flex gap-4 items-center'>
          <ThemeSwitcher />
        </div>
      </nav>
      <div className='flex w-full h-full flex-grow items-center justify-center'>
        <SignIn />
      </div>
    </div>
  );
}
