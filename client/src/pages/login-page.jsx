import { LoginForm } from '../../components/login-form';

export function LoginPage() {
  return (
    <div className="relative flex min-h-screen flex-col bg-black">
      <main className="flex-1 flex items-center justify-center py-12 px-4 bg-black">
        <div className="w-full max-w-md">
          <LoginForm />
        </div>
      </main>
    </div>
  );
}

export default LoginPage;

