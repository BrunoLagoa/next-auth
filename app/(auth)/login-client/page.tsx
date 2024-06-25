'use client';

import { useSession } from 'next-auth/react';
import LoginForm from './_components/login-form';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const session = useSession();
  const router = useRouter();

  if (session.status === 'authenticated') {
    router.push('/dashboard');
  }

  return <LoginForm />;
}
