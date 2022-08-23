import { useState } from 'react';
import { useLogin } from '../hooks/useLogin';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, error, isLoading } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await login(email, password);
  };

  return (
    <form className='login' onSubmit={handleSubmit}>
      <h3>Log in</h3>

      <label>Email:</label>
      <input
        type='email'
        name='email'
        id='email'
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <label>Password:</label>
      <input
        type='password'
        name='password'
        id='password'
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />

      {/* Message for anyone testing the application */}
      <div className='dev'>
        <p>
          To test the application either create a new user or feel free to use
          one that I have populated already.
        </p>
        <p>Email: test@email.com</p>
        <p>Password: ABCabc123!</p>
      </div>

      <button disabled={isLoading}>Log in</button>
      {error && <div className='error'>{error}</div>}
    </form>
  );
};
export default Login;
