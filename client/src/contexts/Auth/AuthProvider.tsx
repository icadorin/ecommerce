import { useState } from 'react';
import { User } from '../../types/User';
import { AuthContext } from './AuthContext';

export const AuthProvider = ({ children }: { children: JSX.Element }) => {
  const [user, setUser] = useState<User | null>(null);

  const singin = (email: string, password: string) => {

  }

  const singout = () => {

  }

  // return (
  //   <AuthContext.Provider value={{ user, singin, singout }}>
  //     {children}
  //   </AuthContext.Provider>
  // );
}
