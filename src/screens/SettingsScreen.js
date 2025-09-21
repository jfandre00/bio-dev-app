import { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, Switch, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { UserContext } from '../contexts/UserContext';
import { ThemeContext } from '../contexts/ThemeContext';
import { getGlobalStyles } from '../styles/globalStyles'; // importando os estilos globais

export default function SettingsScreen() {
  const { userData, setUserData } = useContext(UserContext);
  const { theme, toggleTheme } = useContext(ThemeContext);
  
  const [name, setName] = useState(userData.name);
  const [role, setRole] = useState(userData.role);
  const [summary, setSummary] = useState(userData.summary);
  const [githubUser, setGithubUser] = useState(userData.githubUsername);
  const [devtoUser, setDevtoUser] = useState(userData.devtoUsername);

  // primeiro definimos se o modo escuro está ativo.
  const isDarkMode = theme === 'dark';
  // depois passamos o valor booleano (true/false) para a função de estilos.
  const styles = getGlobalStyles(isDarkMode);

  const handleSaveChanges = () => {
    // verificando se algum dos campos foi realmente alterado
    const hasChanged = 
      name !== userData.name ||
      role !== userData.role ||
      summary !== userData.summary ||
      githubUser !== userData.githubUsername ||
      devtoUser !== userData.devtoUsername;

    if (hasChanged) {
      // ee houveram mudanças, ai sim atualiza os dados
      setUserData(prevData => ({
        ...prevData,
        name,
        role,
        summary,
        githubUsername: githubUser,
        devtoUsername: devtoUser,
      }));
      // e finaliza mostrando o alerta de sucesso
      Alert.alert("Sucesso", "Alterações salvas com sucesso!");
    } else {
      // se nada mudou, apenas mostra um aviso
      Alert.alert("Aviso", "Nenhuma alteração para salvar.");
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Configurações</Text>

        <View>
          <Text style={styles.settingsSectionTitle}>Perfil</Text>
          <Text style={styles.label}>Nome</Text>
          <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="Seu nome" placeholderTextColor={isDarkMode ? "#9ca3af" : "#6b7280"} />
          <Text style={styles.label}>Cargo</Text>
          <TextInput style={styles.input} value={role} onChangeText={setRole} placeholder="Seu cargo" placeholderTextColor={isDarkMode ? "#9ca3af" : "#6b7280"} />
            <Text style={styles.label}>Resumo</Text>
          <TextInput style={[styles.input, styles.textArea]} value={summary} onChangeText={setSummary} placeholder="Seu resumo" multiline placeholderTextColor={isDarkMode ? "#9ca3af" : "#6b7280"} />
        </View>

        <View style={{marginTop: 25}}>
          <Text style={styles.settingsSectionTitle}>Contas</Text>
          <Text style={styles.label}>Usuário GitHub</Text>
          <TextInput style={styles.input} value={githubUser} onChangeText={setGithubUser} placeholder="Usuário GitHub" autoCapitalize="none" placeholderTextColor={isDarkMode ? "#9ca3af" : "#6b7280"} />
          <Text style={styles.label}>Usuário Dev.to</Text>
          <TextInput style={styles.input} value={devtoUser} onChangeText={setDevtoUser} placeholder="Usuário Dev.to" autoCapitalize="none" placeholderTextColor={isDarkMode ? "#9ca3af" : "#6b7280"} />
        </View>

        <TouchableOpacity style={styles.saveButton} onPress={handleSaveChanges}>
          <Text style={styles.saveButtonText}>Salvar Alterações</Text>
        </TouchableOpacity>

        <View style={{marginTop: 25}}>
          <Text style={styles.settingsSectionTitle}>Aparência</Text>
          <View style={styles.themeToggle}>
            <Text style={styles.themeText}>Modo Escuro</Text>
            <Switch
              trackColor={{ false: '#767577', true: '#81b0ff' }}
              thumbColor={isDarkMode ? '#3b82f6' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleTheme}
              value={isDarkMode}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
