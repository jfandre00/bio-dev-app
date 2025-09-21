import { StyleSheet } from 'react-native';

// Refatoração: esta função única agora gera todos os estilos para o app - baseado no tema claro/escuro
export const getGlobalStyles = (isDarkMode) => {
  // Cores base do tema para facilitar
  const colors = {
    bg: isDarkMode ? '#111827' : '#f9fafb', // Fundo principal
    card: isDarkMode ? '#1f2937' : '#ffffff', // Fundo de cards e inputs
    text: isDarkMode ? '#ffffff' : '#111827', // Texto principal
    textSecondary: isDarkMode ? '#9ca3af' : '#6b7280', // Texto secundário/cinza
    textSubtle: isDarkMode ? '#d1d5db' : '#374151', // Texto sutil / títulos de seção
    border: isDarkMode ? '#374151' : '#e5e7eb', // Bordas
    primary: '#3b82f6', // Cor de destaque (azul)
    white: '#ffffff',
    black: '#000000',
  };

  return StyleSheet.create({
    //  Estilos Comuns 
    safeArea: {
      flex: 1,
      backgroundColor: colors.bg,
    },
    container: {
      padding: 20,
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.bg,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: colors.text,
      marginBottom: 20,
      textAlign: 'center',
    },
    sectionTitle: {
      fontSize: 20,
      fontWeight: '600',
      color: colors.textSubtle,
      marginBottom: 15,
      paddingBottom: 5,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    card: {
      backgroundColor: colors.card,
      borderRadius: 15,
      padding: 20,
      marginBottom: 20,
    },
    
    // HomeScreen 
    homeHeader: {
      alignItems: 'center',
      marginBottom: 20,
    },
    avatar: {
      width: 120,
      height: 120,
      borderRadius: 60,
      borderWidth: 3,
      borderColor: colors.primary,
    },
    name: {
      fontSize: 26,
      fontWeight: 'bold',
      marginTop: 15,
      color: colors.text,
    },
    mainName: {
      fontSize: 26,
      fontWeight: 'bold',
      marginTop: 15,
      marginBottom: 15,
      color: colors.text,
      textAlign: 'center',
    },
    role: {
      fontSize: 18,
      color: colors.textSecondary,
      marginTop: 5,
    },
    summaryCard: {
      backgroundColor: colors.card,
      borderRadius: 15,
      padding: 20,
      width: '100%',
      marginBottom: 20,
      shadowColor: colors.black,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    summaryText: {
      fontSize: 16,
      color: colors.textSubtle,
      textAlign: 'center',
      lineHeight: 24,
    },
    profileButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.primary,
      paddingVertical: 15,
      paddingHorizontal: 30,
      borderRadius: 30,
      width: '100%',
      marginBottom: 20,
    },
    profileButtonText: {
      color: colors.white,
      fontSize: 16,
      fontWeight: 'bold',
      marginRight: 10,
    },
    statsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      width: '100%',
    },
    statBox: {
      backgroundColor: colors.card,
      borderRadius: 15,
      padding: 20,
      alignItems: 'center',
      width: '48%',
      shadowColor: colors.black,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    statNumber: {
      fontSize: 24,
      fontWeight: 'bold',
      color: colors.text,
    },
    statLabel: {
      fontSize: 14,
      color: colors.textSecondary,
      marginTop: 5,
    },

    // ProfileScreen 
    aboutText: {
      fontSize: 16,
      lineHeight: 24,
      color: colors.textSubtle,
    },
    contactRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 15,
    },
    contactText: {
      fontSize: 16,
      color: colors.textSubtle,
      marginLeft: 15,
    },

    // QualificationsScreen 
    qualificationsItem: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.card,
      padding: 15,
      borderRadius: 10,
      marginBottom: 10,
    },
    qualificationsItemContent: {
      flex: 1,
      marginLeft: 15,
    },
    qualificationsItemText: {
      fontSize: 16,
      color: colors.text,
      marginLeft: 15,
    },
    qualificationsItemIssuer: {
      fontSize: 14,
      color: colors.textSecondary,
      marginTop: 2,
    },

    // Projects & Articles 
    listItemCard: {
      backgroundColor: colors.card,
      borderRadius: 15,
      padding: 20,
      marginBottom: 15,
    },
    listItemHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 10,
    },
    listItemName: {
      fontSize: 18,
      fontWeight: '600',
      color: colors.text,
      marginLeft: 10,
    },
    listItemDescription: {
      fontSize: 14,
      color: colors.textSecondary,
      marginBottom: 15,
      lineHeight: 20,
    },
    techContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    techBadge: {
      backgroundColor: colors.border,
      borderRadius: 15,
      paddingVertical: 5,
      paddingHorizontal: 10,
      marginRight: 5,
      marginBottom: 5,
    },
    techText: {
      fontSize: 12,
      color: colors.textSubtle,
      fontWeight: '500',
    },
    articleCard: {
      backgroundColor: colors.card,
      borderRadius: 15,
      padding: 20,
      marginBottom: 15,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    articleHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 10,
      alignItems: 'center',
    },
    articleSource: {
      fontSize: 14,
      fontWeight: 'bold',
      color: colors.primary,
    },
    articleReadTime: {
      fontSize: 12,
      color: colors.textSecondary,
    },
    articleTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: colors.text,
      marginBottom: 5,
      maxWidth: '90%',
    },
    articleDescription: {
      fontSize: 14,
      color: colors.textSecondary,
      lineHeight: 20,
      maxWidth: '90%',
    },

    // ProjectDetailsScreen
    detailsDescription: {
      fontSize: 16,
      lineHeight: 24,
      color: colors.textSecondary,
    },
    linksContainer: {
      marginTop: 10,
    },
    linkButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.textSubtle,
      padding: 15,
      borderRadius: 10,
      marginBottom: 10,
    },
    liveButton: {
      backgroundColor: colors.primary,
    },
    linkButtonText: {
      color: colors.white,
      fontSize: 16,
      fontWeight: 'bold',
      marginLeft: 10,
    },

    // ApplicationsScreen
    applicationCard: {
      backgroundColor: colors.card,
      borderRadius: 15,
      padding: 20,
      marginBottom: 15,
    },
    applicationHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 5,
    },
    applicationRole: {
      fontSize: 18,
      fontWeight: '600',
      color: colors.text,
      flex: 1,
    },
    statusBadge: {
      borderRadius: 15,
      paddingVertical: 5,
      paddingHorizontal: 12,
    },
    statusText: {
      color: colors.white,
      fontSize: 12,
      fontWeight: 'bold',
    },
    company: {
      fontSize: 16,
      color: colors.textSecondary,
      marginBottom: 10,
    },
    date: {
      fontSize: 14,
      color: isDarkMode ? '#6b7280' : '#9ca3af',
    },
    
    // ArticleWebViewScreen
    webViewSafeArea: {
        flex: 1,
        backgroundColor: colors.card,
    },
    webview: {
        flex: 1,
    },

    // SettingsScreen
    settingsSectionTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: colors.textSubtle,
      marginBottom: 15,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
      paddingBottom: 5,
    },
    label: {
      fontSize: 14,
      color: colors.textSecondary,
      marginBottom: 5,
    },
    input: {
      backgroundColor: colors.card,
      color: colors.text,
      paddingHorizontal: 15,
      paddingVertical: 12,
      borderRadius: 10,
      fontSize: 16,
      borderWidth: 1,
      borderColor: colors.border,
      marginBottom: 15,
    },
    textArea: {
      height: 100,
      textAlignVertical: 'top',
    },
    saveButton: {
      backgroundColor: colors.primary,
      padding: 15,
      borderRadius: 10,
      alignItems: 'center',
      marginBottom: 25,
    },
    saveButtonText: {
      color: colors.white,
      fontSize: 16,
      fontWeight: 'bold',
    },
    themeToggle: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: colors.card,
      padding: 15,
      borderRadius: 10,
    },
    themeText: {
      fontSize: 16,
      color: colors.text,
    },
  });
};