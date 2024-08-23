import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/router';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent) => {

    console.log(email,password)
    event.preventDefault();
    const result = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });

    if (result?.ok) {
      router.push('/');
    } else {
      console.error('Failed to login');
    }
  };

  return (
    <div style={{ maxWidth: '600px', paddingLeft: '400px', paddingBottom:"50px", border: '5px solid #ddd', borderRadius: '50px', marginLeft:"200px", marginTop:"50px" }} >
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <br />
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <br />
        <button type="submit" style={{border:"1px solid", marginLeft:"50px"}} >Sign in</button>
      </form>
    </div>
  );
};

export default LoginPage;
