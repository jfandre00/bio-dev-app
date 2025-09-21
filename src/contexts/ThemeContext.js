import { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // O tema padrão é escuro conforme o estilo inicial do app
  const [theme, setTheme] = useState('dark');

  // Efeito para carregar o tema salvo no AsyncStorage ao iniciar o app
  useEffect(() => {
    const loadTheme = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem('@DevBio:theme');
        if (savedTheme !== null) {
          setTheme(savedTheme);
        }
      } catch (e) {
        console.error("Erro ao carregar o tema do AsyncStorage", e);
      }
    };
    loadTheme();
  }, []);

  // Função para alternar o tema
  const toggleTheme = async () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    try {
      await AsyncStorage.setItem('@DevBio:theme', newTheme);
    } catch (e) {
      console.error("Erro ao salvar o tema no AsyncStorage", e);
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};