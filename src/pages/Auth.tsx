import { handleLogin } from '@/app/actions/auth'

export default function AuthPage() {
  return (
    <main>
      <h1>Login or register</h1>

      <h2>Login</h2>
      <form action={async (formData: FormData) => {
        "use server";
        // todo - handle errors
        await handleLogin(formData);
      }}>
        <input name="email" type="email" placeholder="Email" />
        <input name="password" type="password" placeholder="Password" />
        <button type="submit">
          Login
        </button>
      </form>

      <h2>Register</h2>
      <form>
        <input type="email" placeholder="Email" />
        <input type="username" placeholder="Username" />
        <input type="password" placeholder="Password" />
        <input type="password" placeholder="Confirm Password" />
        <button type="submit">Register</button>
      </form>
    </main>
  );
}