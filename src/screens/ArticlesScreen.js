import { useContext } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { UserContext } from '../contexts/UserContext';
import { ThemeContext } from '../contexts/ThemeContext';
import { getGlobalStyles } from '../styles/globalStyles'; // importando os estilos globais

export default function ArticlesScreen() {
  const { userData, isLoadingArticles } = useContext(UserContext);
  const { theme } = useContext(ThemeContext);
  const navigation = useNavigation();
  const isDarkMode = theme === 'dark';
  const styles = getGlobalStyles(isDarkMode); // Usa os estilos globais

  const renderArticle = ({ item }) => (
    <TouchableOpacity 
      style={styles.articleCard}
      onPress={() => navigation.navigate('ArticleWebView', { url: item.url, title: item.title })}
    >
      <View style={{flex: 1}}>
        <View style={styles.articleHeader}>
          <Text style={styles.articleSource}>{item.source}</Text>
          <Text style={styles.articleReadTime}>{item.readTime} min de leitura</Text>
        </View>
        <Text style={styles.articleTitle}>{item.title}</Text>
        <Text style={styles.articleDescription} numberOfLines={3}>{item.description}</Text>
      </View>
      <Ionicons name="arrow-forward" size={24} color={isDarkMode ? '#9ca3af' : '#6b7280'} />
    </TouchableOpacity>
  );

  if (isLoadingArticles) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#3b82f6" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={{flex: 1, paddingTop: 20, paddingHorizontal: 20}}>
        <Text style={styles.title}>Artigos e Publicações</Text>
        <FlatList
          data={userData.articles}
          renderItem={renderArticle}
          keyExtractor={item => item.id}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      </View>
    </SafeAreaView>
  );
}
