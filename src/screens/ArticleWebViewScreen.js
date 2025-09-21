import { useContext } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { WebView } from 'react-native-webview';
import { ThemeContext } from '../contexts/ThemeContext';
import { getGlobalStyles } from '../styles/globalStyles'; // importando os estilos globais

export default function ArticleWebViewScreen({ route }) {
  const { url } = route.params;
  const { theme } = useContext(ThemeContext);
  const isDarkMode = theme === 'dark';
  const styles = getGlobalStyles(isDarkMode); // Usa os estilos globais

  return (
    <SafeAreaView style={styles.webViewSafeArea}>
      <WebView source={{ uri: url }} style={styles.webview} />
    </SafeAreaView>
  );
}

