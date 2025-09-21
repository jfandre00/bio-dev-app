import { useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from '../screens/HomeScreen';
import QualificationsScreen from '../screens/QualificationsScreen';
import ProjectsScreen from '../screens/ProjectsScreen';
import ApplicationsScreen from '../screens/ApplicationsScreen';
import ArticlesScreen from '../screens/ArticlesScreen';
// tela de Configurações
import SettingsScreen from '../screens/SettingsScreen'; 
// contexto de tema
import { ThemeContext } from '../contexts/ThemeContext';

const Tab = createBottomTabNavigator();

export default function MainTabNavigator() {
  // acessando o tema atual
  const { theme } = useContext(ThemeContext);
  const isDarkMode = theme === 'dark';

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Home') iconName = focused ? 'home' : 'home-outline';
          else if (route.name === 'Qualificações') iconName = focused ? 'ribbon' : 'ribbon-outline';
          else if (route.name === 'Projetos') iconName = focused ? 'folder-open' : 'folder-open-outline';
          else if (route.name === 'Candidaturas') iconName = focused ? 'briefcase' : 'briefcase-outline';
          else if (route.name === 'Artigos') iconName = focused ? 'newspaper' : 'newspaper-outline';
          // Ícone para a nova tela do exercício
          else if (route.name === 'Configurações') iconName = focused ? 'settings' : 'settings-outline';
          
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        // Estilos da barra de abas baseados no tema ternário
        tabBarActiveTintColor: isDarkMode ? '#3b82f6' : '#3b82f6',
        tabBarInactiveTintColor: isDarkMode ? '#9ca3af' : '#6b7280',
        tabBarStyle: {
          backgroundColor: isDarkMode ? '#1f2937' : '#ffffff',
          borderTopColor: isDarkMode ? '#374151' : '#e5e7eb',
        },
        headerShown: false,
      })}
    >
    <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen 
        name="Qualificações" 
        component={QualificationsScreen} 
        options={{ tabBarLabel: 'Skills' }} // Alterado pois nome estava muito grande e ficando com ...
      />
      <Tab.Screen name="Projetos" component={ProjectsScreen} />
      <Tab.Screen 
        name="Candidaturas" 
        component={ApplicationsScreen} 
        options={{ tabBarLabel: 'Vagas' }} // Alterado pois nome estava muito grande e ficando com ...
      />
      <Tab.Screen name="Artigos" component={ArticlesScreen} />
       <Tab.Screen 
        name="Configurações" 
        component={SettingsScreen} 
        options={{ tabBarLabel: 'Config' }} // Alterado pois nome estava muito grande e ficando com ...
      />
    </Tab.Navigator>
  );
}

