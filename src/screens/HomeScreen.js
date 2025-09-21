import { useContext } from 'react';
import { Text, View, ScrollView, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { UserContext } from '../contexts/UserContext';
import { ThemeContext } from '../contexts/ThemeContext';
import { getGlobalStyles } from '../styles/globalStyles'; // importando os estilos globais

export default function HomeScreen({ navigation }) {
  const { userData } = useContext(UserContext);
  const { theme } = useContext(ThemeContext);
  const isDarkMode = theme === 'dark';
  const styles = getGlobalStyles(isDarkMode); // Usa os estilos globais

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.homeHeader}>
          <Text style={styles.mainName}>App Bio Desenvolvedor</Text>
          <Image
            source={{ uri: `https://github.com/${userData.githubUsername}.png` }}
            style={styles.avatar}
          />
          <Text style={styles.name}>{userData.name}</Text>
          <Text style={styles.role}>{userData.role}</Text>
        </View>

        <View style={styles.summaryCard}>
          <Text style={styles.summaryText}>{userData.summary}</Text>
        </View>

        <TouchableOpacity 
          style={styles.profileButton}
          onPress={() => navigation.navigate('Profile')}
        >
          <Text style={styles.profileButtonText}>Ver Perfil Completo</Text>
          <Ionicons name="arrow-forward" size={20} color="#fff" />
        </TouchableOpacity>

        <View style={styles.statsContainer}>
           <TouchableOpacity style={styles.statBox} onPress={() => navigation.navigate('Projetos')}>
            <Text style={styles.statNumber}>{userData.projects.length}</Text>
            <Text style={styles.statLabel}>Projetos</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.statBox} onPress={() => navigation.navigate('Artigos')}>
            <Text style={styles.statNumber}>{userData.articles.length}</Text>
            <Text style={styles.statLabel}>Artigos</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

