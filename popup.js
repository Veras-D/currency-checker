// Variáveis globais
const API_BASE_URL = 'https://open.er-api.com/v6/latest';
let lastUpdateTimestamp = 0;
const CACHE_DURATION = 30 * 60 * 1000; // 30 minutos em milissegundos

// Elementos DOM
const usdElement = document.getElementById('usd');
const eurElement = document.getElementById('eur');
const updateTimeElement = document.getElementById('update-time');
const refreshButton = document.getElementById('refresh-btn');

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
  loadCachedRates();
  getExchangeRates();
  
  // Adicionar evento para o botão de atualização
  refreshButton.addEventListener('click', () => {
    getExchangeRates(true);
  });
});

// Carregar taxas em cache
function loadCachedRates() {
  chrome.storage.local.get(['usdRate', 'eurRate', 'lastUpdate'], (result) => {
    if (result.usdRate && result.eurRate && result.lastUpdate) {
      usdElement.textContent = parseFloat(result.usdRate).toFixed(2);
      eurElement.textContent = parseFloat(result.eurRate).toFixed(2);
      
      // Formatar e exibir o horário da última atualização
      const lastUpdate = new Date(result.lastUpdate);
      updateTimeElement.textContent = formatTime(lastUpdate);
      
      lastUpdateTimestamp = result.lastUpdate;
    }
  });
}

// Buscar as taxas de câmbio da API
async function getExchangeRates(forceUpdate = false) {
  const now = Date.now();
  
  // Verificar se é necessário atualizar (usando cache ou forçando atualização)
  if (!forceUpdate && lastUpdateTimestamp && now - lastUpdateTimestamp < CACHE_DURATION) {
    return; // Usar cache
  }
  
  // Mostrar estado de carregamento
  setLoadingState(true);
  
  try {
    // Buscando USD para BRL
    const resUSD = await fetch(`${API_BASE_URL}/USD`);
    const dataUSD = await resUSD.json();
    const usdToBrl = dataUSD.rates.BRL;
    
    // Buscando EUR para BRL
    const resEUR = await fetch(`${API_BASE_URL}/EUR`);
    const dataEUR = await resEUR.json();
    const eurToBrl = dataEUR.rates.BRL;
    
    // Atualizar a interface
    usdElement.textContent = usdToBrl.toFixed(2);
    eurElement.textContent = eurToBrl.toFixed(2);
    
    // Atualizar o horário
    const updateTime = new Date();
    updateTimeElement.textContent = formatTime(updateTime);
    
    // Armazenar no cache
    chrome.storage.local.set({
      usdRate: usdToBrl.toString(),
      eurRate: eurToBrl.toString(),
      lastUpdate: updateTime.getTime()
    });
    
    lastUpdateTimestamp = updateTime.getTime();
    
    // Animação para destacar os valores atualizados
    animateValueUpdate();
    
  } catch (error) {
    console.error("Erro ao buscar taxas de câmbio:", error);
    // Mostrar mensagem de erro na interface
    if (!lastUpdateTimestamp) {
      usdElement.textContent = "Erro";
      eurElement.textContent = "Erro";
      updateTimeElement.textContent = "Falha na conexão";
    }
  } finally {
    // Remover estado de carregamento
    setLoadingState(false);
  }
}

// Formatar o horário
function formatTime(date) {
  return date.toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit'
  }) + ' ' + formatRelativeTime(date);
}

// Formatar o tempo relativo (ex: "há 5 min")
function formatRelativeTime(date) {
  const now = new Date();
  const diffMinutes = Math.floor((now - date) / (1000 * 60));
  
  if (diffMinutes < 1) return "(agora)";
  if (diffMinutes === 1) return "(há 1 min)";
  if (diffMinutes < 60) return `(há ${diffMinutes} min)`;
  
  const diffHours = Math.floor(diffMinutes / 60);
  if (diffHours === 1) return "(há 1 hora)";
  if (diffHours < 24) return `(há ${diffHours} horas)`;
  
  return "";
}

// Definir estado de carregamento
function setLoadingState(isLoading) {
  const ratesContainer = document.getElementById('rates');
  
  if (isLoading) {
    ratesContainer.classList.add('loading');
    refreshButton.classList.add('spinning');
    refreshButton.disabled = true;
  } else {
    ratesContainer.classList.remove('loading');
    refreshButton.classList.remove('spinning');
    refreshButton.disabled = false;
  }
}

// Animar atualização de valores
function animateValueUpdate() {
  const values = document.querySelectorAll('.value');
  
  values.forEach(value => {
    value.style.transition = 'background-color 0.5s';
    value.style.backgroundColor = '#d4ffe4';
    
    setTimeout(() => {
      value.style.backgroundColor = '';
    }, 1500);
  });
}
