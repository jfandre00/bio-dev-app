import { useContext } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { ThemeContext } from '../contexts/ThemeContext';
import { getGlobalStyles } from '../styles/globalStyles'; // importando os estilos globais

export default function ProjectDetailsScreen({ route }) {
  const { project } = route.params;
  const { theme } = useContext(ThemeContext);
  const isDarkMode = theme === 'dark';
  const styles = getGlobalStyles(isDarkMode); // Usa os estilos globais

  const openLink = (url) => {
    Linking.openURL(url).catch(err => console.error("Não foi possível abrir o link", err));
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>{project.name}</Text>
        
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Descrição</Text>
          <Text style={styles.detailsDescription}>{project.longDescription}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Tecnologias</Text>
          <View style={styles.techContainer}>
            {project.technologies.map((tech, index) => (
              <View key={index} style={styles.techBadge}>
                <Text style={styles.techText}>{tech}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.linksContainer}>
          <TouchableOpacity style={styles.linkButton} onPress={() => openLink(project.githubUrl)}>
            <Ionicons name="logo-github" size={20} color="#fff" />
            <Text style={styles.linkButtonText}>Ver no GitHub</Text>
          </TouchableOpacity>
          {project.liveUrl && (
            <TouchableOpacity style={[styles.linkButton, styles.liveButton]} onPress={() => openLink(project.liveUrl)}>
              <Ionicons name="globe-outline" size={20} color="#fff" />
              <Text style={styles.linkButtonText}>Ver Online</Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

