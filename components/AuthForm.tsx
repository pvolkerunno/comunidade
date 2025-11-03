import React, { useState } from 'react';
import { useAuth } from './AuthProvider';
import { supabase } from '../supabaseClient';

const AuthForm: React.FC = () => {
  const { signIn, signUp, loading } = useAuth();
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setMessage(null);
    try {
      if (mode === 'signin') {
        await signIn(email, password);
      } else {
        await signUp(email, password);
        setMessage('Cadastro concluído. Se não estiver logado automaticamente, clique em Entrar.');
      }
    } catch (err: any) {
      setError(err?.message ?? 'Erro ao autenticar');
    }
  };

  // Seção de Acesso de Administrador removida

  const onResetPassword = async () => {
    setError(null);
    setMessage(null);
    try {
      if (!email) {
        setError('Informe seu e-mail para recuperar a senha.');
        return;
      }
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: window.location.origin,
      });
      if (error) throw error;
      setMessage('Enviamos um link de recuperação para seu e-mail.');
    } catch (err: any) {
      setError(err?.message ?? 'Erro ao iniciar recuperação de senha');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-primary text-light">
      <form onSubmit={onSubmit} className="w-full max-w-sm bg-gray-dark p-6 rounded-lg shadow">
        <div className="flex justify-center mb-6">
          <img 
            src="/logo.png" 
            alt="Logo da Comunidade" 
            className="h-16 w-auto object-contain"
          />
        </div>
        <h1 className="text-xl font-semibold mb-4 text-center">{mode === 'signin' ? 'Entrar' : 'Cadastrar'}</h1>
        <label className="block mb-2">
          <span className="text-sm">Email</span>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            className="mt-1 w-full p-2 rounded bg-primary border border-gray-700"
          />
        </label>
        <label className="block mb-4">
          <span className="text-sm">Senha</span>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            className="mt-1 w-full p-2 rounded bg-primary border border-gray-700"
          />
        </label>
        {error && <p className="text-red-400 mb-2">{error}</p>}
        {message && <p className="text-green-400 mb-2">{message}</p>}
        <div className="mb-3">
          <button type="button" onClick={onResetPassword} className="text-accent text-sm hover:underline">
            Esqueceu a sua senha?
          </button>
        </div>
        <button 
          type="submit" 
          disabled={loading} 
          className={`w-full py-2 rounded ${mode === 'signin' ? 'bg-green-600 hover:bg-green-700 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}
        >
          {loading ? 'Aguarde...' : (mode === 'signin' ? 'Entrar' : 'Cadastrar')}
        </button>
        <p className="mt-3 text-sm text-center">
          Não tem uma conta?{' '}
          <button
            type="button"
            className="text-accent hover:underline"
            onClick={() => setMode('signup')}
          >
            Crie uma
          </button>
        </p>
        
        {/* Seção de Acesso de Administrador removida */}
      </form>
    </div>
  );
};

export default AuthForm;