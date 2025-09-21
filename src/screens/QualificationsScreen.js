import { useContext } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { UserContext } from '../contexts/UserContext';
import { ThemeContext } from '../contexts/ThemeContext';
import { getGlobalStyles } from '../styles/globalStyles'; // importando os estilos globais

export default function QualificationsScreen() {
  const { userData } = useContext(UserContext);
  const { theme } = useContext(ThemeContext);
  const isDarkMode = theme === 'dark';
  const styles = getGlobalStyles(isDarkMode); // Usa os estilos globais

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Qualificações</Text>

        <View>
          <Text style={styles.sectionTitle}>Habilidades</Text>
          {userData.skills.map((skill) => (
            <View key={skill.id} style={styles.qualificationsItem}>
              <Ionicons name="checkmark-circle-outline" size={24} color="#3b82f6" />
              <Text style={styles.qualificationsItemText}>{skill.name}</Text>
            </View>
          ))}
        </View>

        <View style={{marginTop: 25}}>
          <Text style={styles.sectionTitle}>Certificações</Text>
          {userData.certifications.map((cert) => (
            <View key={cert.id} style={styles.qualificationsItem}>
              <Ionicons name="school-outline" size={24} color="#3b82f6" />
              <View style={styles.qualificationsItemContent}>
                <Text style={styles.qualificationsItemText}>{cert.name}</Text>
                <Text style={styles.qualificationsItemIssuer}>{cert.issuer}</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}



