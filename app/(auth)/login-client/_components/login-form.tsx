'use client';

import { Button, buttonVariants } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { signIn, useSession } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginForm() {
  const [error, setError] = useState<string | null>(null);

  const session = useSession();
  const router = useRouter();

  if (session.status === 'authenticated') {
    router.push('/dashboard');
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    // console.log({ email, password });
    signIn('credentials', {
      email,
      password,
      redirect: false,
      callbackUrl: '/dashboard',
    }).then((res) => {
      if (res && res.error === 'CredentialsSignin') {
        setError('Credenciais inválidas');
      }

      router.push('/dashboard');
    });
  }

  return (
    <Card className='mx-auto max-w-96'>
      <CardHeader>
        <CardTitle>Login Client</CardTitle>
        <CardDescription>Entre com email e senha</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className='text-left'>
          <div className='space-y-6'>
            <div className='grid w-full max-w-sm items-center gap-1.5'>
              <Label htmlFor='email'>Email</Label>
              <Input name='email' type='email' id='email' placeholder='Email' />
            </div>
            <div className='grid w-full max-w-sm items-center gap-1.5'>
              <Label htmlFor='password'>Senha</Label>
              <Input
                name='password'
                type='password'
                id='password'
                placeholder='password'
              />
            </div>
            {error && <p className='text-red-500'>{error}</p>}
          </div>
          <Button size={'lg'} type='submit' className='w-full mt-10 '>
            Login
          </Button>
        </form>
      </CardContent>
      <CardFooter>
        <Link
          className={cn(
            buttonVariants({ variant: 'link', size: 'sm' }),
            'mt-2 mx-auto'
          )}
          href='/register'
        >
          Não possui conta?
        </Link>
      </CardFooter>
    </Card>
  );
}
