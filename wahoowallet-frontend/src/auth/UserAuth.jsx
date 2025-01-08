import { createContext, useContext, useMemo, useState } from "react";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));

  const login = async (data) => {
    return new Promise((resolve, reject) => {
      if (data.username === 'username' && data.password === 'password') {
        setUser(userObj);
        localStorage.setItem('user', JSON.stringify(userObj));
        resolve();
      }
      reject('Invalid login!');
    })
  };

  const logout = () => {
    setUser(null);
    localStorage.setItem('user', JSON.stringify(null));
  };

  const data = useMemo(() => ({
    user,
    login,
    logout
  }), [user]);
  
  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  return useContext(AuthContext);
}

// Test profile until DB is setup
const userObj = {
  name: 'User',
  accounts: [
    {
      name: 'Bank Account 1',
      balance: '$1,234,567',
      details: {
        number: '123456789',
        routing: '987654321',
        rate: '1.5%',
      },
      transactions: [
        { id: 1, description: 'Grocery Purchase', amount: -45.67 },
        { id: 2, description: 'Salary Credit', amount: 5000.0 },
        { id: 3, description: 'Utility Bill', amount: -100.0 },
      ],
    },
    {
      name: 'Bank Account 2',
      balance: '$2,345,678',
      details: {
        number: '987654321',
        routing: '123456789',
        rate: '2.0%',
      },
      transactions: [
        { id: 4, description: 'Online Shopping', amount: -150.89 },
        { id: 5, description: 'Freelance Payment', amount: 1200.0 },
        { id: 6, description: 'Gym Membership', amount: -50.0 },
      ],
    },
    {
      name: 'Bank Account 3',
      balance: '$3,456,789',
      details: {
        number: '192837465',
        routing: '564738291',
        rate: '1.8%',
      },
      transactions: [
        { id: 7, description: 'Coffee Shop', amount: -5.25 },
        { id: 8, description: 'Bookstore Purchase', amount: -20.0 },
        { id: 9, description: 'Dividend Credit', amount: 250.0 },
      ],
    },
  ]
}