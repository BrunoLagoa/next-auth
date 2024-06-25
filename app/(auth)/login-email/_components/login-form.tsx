'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Mail } from 'lucide-react';
import emailLogin from '../_actions/emailLogin';

export default function LoginForm() {
  return (
    <Card className='mx-auto max-w-96'>
      <CardHeader>
        <CardTitle>Login email</CardTitle>
        <CardDescription>Login com magic link</CardDescription>
      </CardHeader>
      <CardContent>
        <form action={emailLogin} className='text-left '>
          <div className='grid w-full max-w-sm items-center gap-1.5'>
            <Label htmlFor='email'>Email</Label>
            <Input name='email' type='email' id='email' placeholder='Email' />
          </div>
          <Button size={'lg'} type='submit' className='w-full mt-8 '>
            <Mail className='inline-block mr-2' />
            Login com Email
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
