import { useContext } from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// importando os providers
import { UserProvider } from './src/contexts/UserContext';
import { ThemeProvider, ThemeContext } from './src/contexts/ThemeContext';

// importando o navegador e as telas
import MainTabNavigator from './src/navigation/MainTabNavigator';
import ProfileScreen from './src/screens/ProfileScreen';
import ProjectDetailsScreen from './src/screens/ProjectDetailsScreen';
import ArticleWebViewScreen from './src/screens/ArticleWebViewScreen';

// cria o navegador Stack
const Stack = createNativeStackNavigator();

// componente para acessar o contexto de tema e configura a navegação
function AppContent() {
  const { theme } = useContext(ThemeContext);
  
  // temas customizados para combinar com o estilo
  const MyDarkTheme = {
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
      primary: '#3b82f6',
      background: '#111827',
      card: '#1f2937',
      text: '#ffffff',
      border: '#374151',
    },
  };

  const MyLightTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: '#3b82f6',
      background: '#f9fafb',
      card: '#ffffff',
      text: '#111827',
      border: '#e5e7eb',
    },
  };

  return (
    <NavigationContainer theme={theme === 'dark' ? MyDarkTheme : MyLightTheme}>
      {/* O Stack Navigator agora é o container principal */}
      <Stack.Navigator>
        {/* A tela principal é o nosso navegador de abas, sem cabeçalho */}
        <Stack.Screen 
          name="Main" 
          component={MainTabNavigator} 
          options={{ headerShown: false }} 
        />
        {/* Telas que podem ser empurradas por cima das abas */}
        <Stack.Screen 
          name="Profile" 
          component={ProfileScreen} 
          options={{ title: 'Perfil Completo' }} 
        />
        <Stack.Screen 
          name="ProjectDetails" 
          component={ProjectDetailsScreen} 
          options={{ title: 'Detalhes do Projeto' }} 
        />
        <Stack.Screen 
          name="ArticleWebView" 
          component={ArticleWebViewScreen} 
          options={({ route }) => ({ title: route.params.title || 'Artigo' })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    // envolver com os dois Providers
    <ThemeProvider>
      <UserProvider>
        <AppContent />
      </UserProvider>
    </ThemeProvider>
  );
}



