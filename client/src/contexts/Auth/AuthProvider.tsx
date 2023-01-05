import React, { useState } from 'react';
import { useApi } from '../../hooks/useApi';
import { User } from '../../types/User';
import { AuthContext } from './AuthContext';

export const AuthProvider = ({ children }: { children: JSX.Element }) => {
  const [user, setUser] = useState<User | null>(null);
  const api = useApi();

  const singin = async (email: string, password: string) => {
    const data = await api.singin(email, password);
    if (data.user && data.token) {
      setUser(data.user);
      return true;
    }
    return false;
  }

  const singout = async () => {
    await api.logout();
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, singin, singout }}>
      {children}
    </AuthContext.Provider>
  );
}
