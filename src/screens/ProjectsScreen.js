import { useContext } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { UserContext } from '../contexts/UserContext';
import { ThemeContext } from '../contexts/ThemeContext';
import { getGlobalStyles } from '../styles/globalStyles'; // importando os estilos globais

export default function ProjectsScreen() {
  const { userData, isLoadingProjects } = useContext(UserContext);
  const { theme } = useContext(ThemeContext);
  const navigation = useNavigation();
  const isDarkMode = theme === 'dark';
  const styles = getGlobalStyles(isDarkMode); // Usa os estilos globais

  const renderProject = ({ item }) => (
    <TouchableOpacity 
      style={styles.listItemCard}
      onPress={() => navigation.navigate('ProjectDetails', { project: item })}
    >
      <View style={styles.listItemHeader}>
        <Ionicons name="folder-open-outline" size={24} color="#3b82f6" />
        <Text style={styles.listItemName}>{item.name}</Text>
      </View>
      <Text style={styles.listItemDescription} numberOfLines={2}>
        {item.description}
      </Text>
      <View style={styles.techContainer}>
        {item.technologies.map((tech, index) => (
          <View key={index} style={styles.techBadge}>
            <Text style={styles.techText}>{tech}</Text>
          </View>
        ))}
      </View>
    </TouchableOpacity>
  );

  if (isLoadingProjects) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#3b82f6" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={{flex: 1, paddingTop: 20, paddingHorizontal: 20}}>
        <Text style={styles.title}>Meus Projetos</Text>
        <FlatList
          data={userData.projects}
          renderItem={renderProject}
          keyExtractor={item => item.id}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      </View>
    </SafeAreaView>
  );
}
