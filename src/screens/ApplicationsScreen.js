import { useContext } from 'react';
import { View, Text, FlatList } from 'react-native';
import { UserContext } from '../contexts/UserContext';
import { ThemeContext } from '../contexts/ThemeContext';
import { getGlobalStyles } from '../styles/globalStyles'; // importando os estilos globais
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ApplicationsScreen() {
  const { userData } = useContext(UserContext);
  const { theme } = useContext(ThemeContext);
  const isDarkMode = theme === 'dark';
  const styles = getGlobalStyles(isDarkMode); // Usa os estilos globais

  const getStatusColor = (status) => {
    switch (status) {
      case 'Aceito': return '#10b981';
      case 'Rejeitado': return '#ef4444';
      case 'Em Análise': default: return '#f59e0b';
    }
  };

  const renderApplication = ({ item }) => (
    <View style={styles.applicationCard}>
      <View style={styles.applicationHeader}>
        <Text style={styles.applicationRole}>{item.role}</Text>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) }]}>
          <Text style={styles.statusText}>{item.status}</Text>
        </View>
      </View>
      <Text style={styles.company}>{item.company}</Text>
      <Text style={styles.date}>Aplicado em: {item.date}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={{flex: 1, paddingTop: 20, paddingHorizontal: 20}}>
        <Text style={styles.title}>Candidaturas</Text>
        <FlatList
          data={userData.applications}
          renderItem={renderApplication}
          keyExtractor={item => item.id}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      </View>
    </SafeAreaView>
  );
}

