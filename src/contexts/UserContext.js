import { createContext, useState, useEffect } from 'react';
// AsyncStorage p/ armazenamento local
import AsyncStorage from '@react-native-async-storage/async-storage';

// Chave para salvar/carregar os dados no AsyncStorage.
// Alteração - Toda vez que eu precisar forçar o app a carregar a lista inicial daqui do código (em vez da que já está salva na memória do celular), basta incrementar a vX (v4, v5, v6)
const APPLICATIONS_STORAGE_KEY = '@DevBio:applications_v3';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState({
    name: 'André L. M. Ferreira',
    role: 'Desenvolvedor Full Stack',
    githubUsername: 'jfandre00',
    devtoUsername: 'jfandre00',
    summary: 'Apaixonado por criar aplicativos personalizados. Explore meu trabalho e minhas qualificações. Espero que goste do meu perfil!',
    about: 'Desenvolvedor com 3 anos de experiência em tecnologias web e mobile. Especializado em React e Python, com foco em criar aplicações performáticas, escaláveis e com interfaces de usuário ricas e agradáveis.',
    contact: {
      email: 'jfandre@gmail.com',
      linkedin: 'https://www.linkedin.com/in/andre-loureiro-montini-ferreira/',
      github: 'https://github.com/jfandre00',
    },
    skills: [
      { id: '1', name: 'React Native' },
      { id: '2', name: 'JavaScript' },
      { id: '3', name: 'Python' },
      { id: '4', name: 'C++'},
      { id: '5', name: 'HTML/CSS'}
    ],
    certifications: [
      { id: '1', name: 'Certified JavaScript Developer', issuer: 'Coursera' },
      { id: '2', name: 'Meta Backend Developer', issuer: 'Meta' },
      { id: '3', name: 'IBM Backend Developer', issuer: 'IBM' },
    ],
    // DADOS INICIAIS - Esta é a lista que será carregada na primeira vez que o app for aberto com a nova chave de armazenamento.
    applications: [
      { id: '1', company: 'Tech Solutions Inc.', role: 'Desenvolvedor Full Stack', status: 'Em Análise', date: '2025-09-01' },
      { id: '2', company: 'JMF Solutions Inc.', role: 'Desenvolvedor Python', status: 'Aceito', date: '2025-08-25' },
      { id: '3', company: 'B3WW Solutions Inc.', role: 'Desenvolvedor Full Stack', status: 'Rejeitado', date: '2025-07-20' },
    ],
    projects: [], // Começa vazio, será preenchido pela API do GitHub
    articles: [], // Começa vazio, será preenchido pela API do Dev.to
  });

  const [isLoadingProjects, setIsLoadingProjects] = useState(true);
  const [isLoadingArticles, setIsLoadingArticles] = useState(true);
  const [isStorageLoaded, setIsStorageLoaded] = useState(false);

  // armazenamento local (AsyncStorage)

  // useEffect para carregar as candidaturas do AsyncStorage na inicialização do app.
  useEffect(() => {
    const loadApplications = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem(APPLICATIONS_STORAGE_KEY);
        if (jsonValue !== null) {
          const storedApplications = JSON.parse(jsonValue);
          // Se encontrou dados salvos, usa eles no lugar do estado inicial.
          setUserData(prevData => ({ ...prevData, applications: storedApplications }));
        }
      } catch (e) {
        console.error("Erro ao carregar candidaturas do AsyncStorage", e);
      } finally {
        // Marca que o carregamento terminou, para que o app possa começar a salvar alterações.
        setIsStorageLoaded(true);
      }
    };
    loadApplications();
  }, []); // O array vazio [] p/ garantir que este efeito rode apenas uma vez.

  // useEffect para SALVAR as candidaturas no AsyncStorage sempre que a lista for alterada.
  useEffect(() => {
    // Só inicia o salvamento DEPOIS que o carregamento inicial do storage for concluído.
    // Isso previne que o estado inicial mockado sobrescreva os dados já salvos.
    if (isStorageLoaded) {
      const saveApplications = async () => {
        try {
          const jsonValue = JSON.stringify(userData.applications);
          await AsyncStorage.setItem(APPLICATIONS_STORAGE_KEY, jsonValue);
        } catch (e) {
          console.error("Erro ao salvar candidaturas no AsyncStorage", e);
        }
      };
      saveApplications();
    }
  }, [userData.applications, isStorageLoaded]); // Roda sempre que a lista de candidaturas ou o 'isStorageLoaded' mudar.

  // --- LÓGICA DE BUSCA DE DADOS EXTERNOS (APIs) ---

  // useEffect para buscar os projetos do GitHub
  useEffect(() => {
    const fetchGithubProjects = async () => {
      if (!userData.githubUsername) {
        setIsLoadingProjects(false);
        return;
      }
      try {
        const response = await fetch(`https://api.github.com/users/${userData.githubUsername}/repos?sort=updated&direction=desc`);
        const data = await response.json();
        const formattedProjects = data.map(repo => ({
          id: repo.id.toString(),
          name: repo.name,
          description: repo.description || 'Sem descrição fornecida.',
          longDescription: repo.description || 'Este projeto não possui uma descrição detalhada fornecida no GitHub.',
          technologies: repo.language ? [repo.language] : [],
          githubUrl: repo.html_url,
          liveUrl: repo.homepage || null,
        }));
        setUserData(prevData => ({ ...prevData, projects: formattedProjects }));
      } catch (error) {
        console.error("Erro ao buscar projetos do GitHub:", error);
      } finally {
        setIsLoadingProjects(false);
      }
    };
    fetchGithubProjects();
  }, [userData.githubUsername]);

  // useEffect para buscar artigos do Dev.to
  useEffect(() => {
    const fetchDevToArticles = async () => {
      if (!userData.devtoUsername) {
        setIsLoadingArticles(false);
        return;
      }
      try {
        const response = await fetch(`https://dev.to/api/articles?username=${userData.devtoUsername}`);
        const data = await response.json();
        const formattedArticles = data.map(article => ({
          id: article.id.toString(),
          title: article.title,
          description: article.description,
          url: article.url,
          source: 'Dev.to',
          readTime: article.reading_time_minutes,
        }));
        setUserData(prevData => ({ ...prevData, articles: formattedArticles }));
      } catch (error) {
        console.error("Erro ao buscar artigos do Dev.to:", error);
      } finally {
        setIsLoadingArticles(false);
      }
    };
    fetchDevToArticles();
  }, [userData.devtoUsername]);

  return (
    // Disponibiliza os dados e a função para alterar os dados para todos os componentes filhos
    <UserContext.Provider value={{ userData, setUserData, isLoadingProjects, isLoadingArticles }}>
      {children}
    </UserContext.Provider>
  );
};