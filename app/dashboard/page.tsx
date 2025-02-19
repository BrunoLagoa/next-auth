import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import logout from '../(auth)/_actions/logout';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import Image from 'next/image';

export default async function Dashboard() {
  const session = await auth();

  if (!session) {
    redirect('/');
  }

  return (
    <main className='container p-20 mx-auto text-center'>
      <div>
        <h1 className='font-extrabold text-slate-600 dark:text-transparent text-7xl dark:bg-gradient-to-r dark:from-slate-50 dark:via-slate-400 dark:to-slate-200 bg-clip-text'>
          Dashboard
        </h1>
        {session.user?.image && (
          <Image
            src={session.user?.image}
            alt={session.user?.name || 'User Image'}
            width={150}
            height={150}
            className='rounded-full mx-auto mt-8'
          />
        )}
        <h3 className='mt-4 font-bold text-muted-foreground'>Boas vindas!</h3>
        <p className='mt-4 text-lg text-muted-foreground'>
          Nome: {session.user?.name}
        </p>
        <p className='text-lg text-muted-foreground'>
          Email: {session.user?.email}
        </p>
        <p className='text-lg text-muted-foreground'>
          Seguidores: {session.user.githubProfile.followers}
        </p>
        <p className='text-lg text-muted-foreground'>
          Bio: {session.user.githubProfile.bio}
        </p>
        <hr className='w-1/4 mx-auto mt-5 mb-16' />

        <section className='flex flex-wrap items-center justify-center gap-3'>
          <form action={logout}>
            <Button>Logout</Button>
          </form>
          <Link href='/' className={cn(buttonVariants({ variant: 'outline' }))}>
            Home
          </Link>
        </section>
      </div>
    </main>
  );
}
