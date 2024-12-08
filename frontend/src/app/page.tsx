'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AuthPage from '../components/AuthPage';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem('token');
    if (token) {
      router.push('/dashboard');
    }
  }, [router]);

  return <AuthPage />;
}