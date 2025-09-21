import { useContext } from 'react';
import { Text, View, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { UserContext } from '../contexts/UserContext';
import { ThemeContext } from '../contexts/ThemeContext';
import { getGlobalStyles } from '../styles/globalStyles'; // importando os estilos globais
export default function ProfileScreen() {
  const { userData } = useContext(UserContext);
  const { theme } = useContext(ThemeContext);
  const isDarkMode = theme === 'dark';
  const styles = getGlobalStyles(isDarkMode); // Usa os estilos globais

  const openLink = (url) => {
    Linking.canOpenURL(url).then(supported => {
      if (supported) Linking.openURL(url);
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Sobre Mim</Text>
        <View style={styles.card}>
          <Text style={styles.aboutText}>{userData.about}</Text>
        </View>

        <Text style={styles.title}>Contato</Text>
        <View style={styles.card}>
          {userData.contact && (
            <>
              <TouchableOpacity style={styles.contactRow} onPress={() => openLink(`mailto:${userData.contact.email}`)}>
                <Ionicons name="mail-outline" size={24} color="#3b82f6" />
                <Text style={styles.contactText}>{userData.contact.email}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.contactRow} onPress={() => openLink(userData.contact.linkedin)}>
                <Ionicons name="logo-linkedin" size={24} color="#3b82f6" />
                <Text style={styles.contactText}>LinkedIn</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.contactRow} onPress={() => openLink(userData.contact.github)}>
                <Ionicons name="logo-github" size={24} color="#3b82f6" />
                <Text style={styles.contactText}>GitHub</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}


