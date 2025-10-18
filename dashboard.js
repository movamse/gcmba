const dadosDashboard = {
    // Dados para os KPIs
    kpis: {
        totalGCM: 270,
        cobertura: 64.7,
        efetivoTotal: 9838
    },
    [cite_start]// Dados para Efetivo por Sexo [cite: 14, 15]
    efetivo: [
        { valor: 89.9, label: 'Masculino', count: 8845 },
        { valor: 10.1, label: 'Feminino', count: 993 }
    ],
    [cite_start]// Dados para Salário Base [cite: 44, 46, 48, 50, 52, 54]
    salarioBase: [
        { label: '1 Salário Mínimo (SM)', percentual: 64.44 },
        { label: '+1 até 1,5 SM', percentual: 23.70 },
        { label: '+1,5 até 2 SM', percentual: 6.30 },
        { label: '+2,0 até 2,5 SM', percentual: 2.59 },
        { label: '+2,5 até 3 SM', percentual: 1.48 },
        { label: '+3 SM', percentual: 1.48 }
    ],
    [cite_start]// Dados para Estrutura [cite: 131, 134, 63, 74, 77, 80, 143]
    estrutura: [
        { label: 'CNPJ Próprio', percentual: 20.74, count: 56 },
        { label: 'Curso de Formação', percentual: 15.93, count: 43 },
        { label: 'Corregedoria Própria', percentual: 14.44, count: 39 },
        { label: 'Ouvidoria Própria', percentual: 13.7, count: 37 },
        { label: 'Central 153', percentual: 12.59, count: 34 },
        { label: 'Centro de Formação', percentual: 11.85, count: 32 },
        { label: 'Porte de Arma', percentual: 7.41, count: 20 },
    ],
    [cite_start]// Dados para Ranking [cite: 160]
    rankingHabitantes: [
        { municipio: 'Ilhéus', populacao: 196344, efetivo: 199, proporcao: 987 },
        { municipio: 'Itabuna', populacao: 189149, efetivo: 188, proporcao: 1006 },
        { municipio: 'Jequié', populacao: 161196, efetivo: 159, proporcao: 1014 },
        { municipio: 'Alagoinhas', populacao: 169201, efetivo: 164, proporcao: 1032 },
        { municipio: 'Porto Seguro', populacao: 171634, efetivo: 145, proporcao: 1184 },
        { municipio: 'Barreiras', populacao: 182630, efetivo: 121, proporcao: 1509 },
        { municipio: 'Juazeiro', populacao: 256122, efetivo: 169, proporcao: 1516 },
        { municipio: 'Santo Antônio de Jesus', populacao: 109791, efetivo: 67, proporcao: 1639 },
        { municipio: 'Lauro de Freitas', populacao: 219564, efetivo: 121, proporcao: 1815 },
        { municipio: 'Salvador', populacao: 2564204, efetivo: 1375, proporcao: 1865 },
        { municipio: 'Vitória da Conquista', populacao: 396613, efetivo: 197, proporcao: 2013 },
        { municipio: 'Luís Eduardo Magalhães', populacao: 118382, efetivo: 57, proporcao: 2077 },
        { municipio: 'Eunápolis', populacao: 119418, efetivo: 47, proporcao: 2541 },
        { municipio: 'Simões Filho', populacao: 127093, efetivo: 45, proporcao: 2824 },
        { municipio: 'Feira de Santana', populacao: 660806, efetivo: 218, proporcao: 3031 },
        { municipio: 'Paulo Afonso', populacao: 121067, efetivo: 30, proporcao: 4036 }
    ]
};

document.addEventListener('DOMContentLoaded', () => {
    // Definir as cores
    const corPrincipal = '#001f4c';
    const corSecundaria = '#007bff';
    const coresEfetivo = ['#4682B4', '#FFB6C1']; // Azul (Masculino), Rosa Claro (Feminino)
    const coresSalario = ['#1a79c2', '#3399ff', '#66b2ff', '#99ccff', '#cce5ff', '#e6f2ff']; // Gradiente de azul
    const corMelhor = '#28a745';
    const corPior = '#dc3545';

    // Função de formatação para Tooltip
    const formatPercent = (context) => `${context.formattedValue}%`;
    const formatCount = (context) => {
        const item = dadosDashboard.estrutura.find(d => d.label === context.label);
        return `${context.dataset.label}: ${context.formattedValue}% (${item.count} Municípios)`;
    };
    const formatRanking = (context) => `1 GCM para: ${context.formattedValue} Habitantes`;


    // =================================================================
    // 1. Gráfico: Efetivo por Sexo (Rosca)
    // =================================================================
    const ctxEfetivoSexo = document.getElementById('chartEfetivoSexo').getContext('2d');
    new Chart(ctxEfetivoSexo, {
        type: 'doughnut',
        data: {
            labels: dadosDashboard.efetivo.map(d => d.label),
            datasets: [{
                data: dadosDashboard.efetivo.map(d => d.valor),
                backgroundColor: coresEfetivo,
                hoverOffset: 8
            }]
        },
        options: {
            responsive: true,
            aspectRatio: 1,
            plugins: {
                legend: { 
                    position: 'bottom',
                    labels: {
                        generateLabels: (chart) => {
                            const data = chart.data.datasets[0].data;
                            return chart.data.labels.map((label, i) => ({
                                text: `${label}: ${data[i]}% (${dadosDashboard.efetivo[i].count} GCMs)`,
                                fillStyle: coresEfetivo[i],
                                strokeStyle: coresEfetivo[i],
                                lineWidth: 1,
                            }));
                        }
                    }
                },
                tooltip: {
                    callbacks: {
                        label: (context) => `${context.label}: ${context.formattedValue}% (${dadosDashboard.efetivo[context.dataIndex].count} GCMs)`
                    }
                }
            }
        }
    });

    // =================================================================
    // 2. Gráfico: Salário Base (Barras Horizontal)
    // =================================================================
    const ctxSalarioBase = document.getElementById('chartSalarioBase').getContext('2d');
    new Chart(ctxSalarioBase, {
        type: 'bar',
        data: {
            labels: dadosDashboard.salarioBase.map(d => d.label),
            datasets: [{
                label: 'Percentual de Municípios',
                data: dadosDashboard.salarioBase.map(d => d.percentual),
                backgroundColor: coresSalario,
            }]
        },
        options: {
            indexAxis: 'y',
            responsive: true,
            plugins: {
                legend: { display: false },
                tooltip: { callbacks: { label: formatPercent } }
            },
            scales: {
                x: {
                    title: { display: true, text: 'Percentual de Municípios (%)' },
                    beginAtZero: true,
                    max: 70 
                }
            }
        }
    });

    // =================================================================
    // 3. Gráfico: Estrutura (Barras Horizontal Invertido para Destaque)
    // =================================================================
    // Invertendo a ordem de exibição para começar com o maior percentual
    const estruturaDataInvertida = [...dadosDashboard.estrutura].reverse();
    const estruturaColors = estruturaDataInvertida.map(d => d.cor);
    
    const ctxEstrutura = document.getElementById('chartEstrutura').getContext('2d');
    new Chart(ctxEstrutura, {
        type: 'bar',
        data: {
            labels: estruturaDataInvertida.map(d => d.label),
            datasets: [{
                label: 'Cobertura',
                data: estruturaDataInvertida.map(d => d.percentual),
                backgroundColor: estruturaDataInvertida.map((d, i) => i === 0 ? corPior : corPrincipal), // Destaca o Porte de Arma como menor
                backgroundColor: estruturaDataInvertida.map(d => d.label === 'Porte de Arma' ? corPior : corSecundaria),
            }]
        },
        options: {
            indexAxis: 'y',
            responsive: true,
            plugins: {
                legend: { display: false },
                tooltip: { callbacks: { label: formatCount } }
            },
            scales: {
                x: {
                    title: { display: true, text: 'Percentual de Municípios com a Estrutura (%)' },
                    beginAtZero: true
                }
            }
        }
    });
    
    // =================================================================
    // 4. Gráfico: Ranking Proporção (Barras Horizontal)
    // =================================================================
    // A ordenação já está correta (melhor para pior)
    const rankingData = dadosDashboard.rankingHabitantes.map(d => d.proporcao);
    const rankingLabels = dadosDashboard.rankingHabitantes.map(d => d.municipio);

    const rankingColors = rankingData.map((d, i) => {
        if (i === 0) return corMelhor;
        if (i === rankingData.length - 1) return corPior;
        return corPrincipal;
    });

    const ctxRankingProporcao = document.getElementById('chartRankingProporcao').getContext('2d');
    new Chart(ctxRankingProporcao, {
        type: 'bar',
        data: {
            labels: rankingLabels,
            datasets: [{
                label: 'Proporção',
                data: rankingData,
                backgroundColor: rankingColors,
            }]
        },
        options: {
            indexAxis: 'y',
            responsive: true,
            plugins: {
                legend: { display: false },
                tooltip: { callbacks: { label: formatRanking } }
            },
            scales: {
                x: {
                    title: { display: true, text: 'Proporção (1 GCM para X Habitantes)' },
                    beginAtZero: true
                }
            }
        }
    });

    // =================================================================
    // 5. Preencher Tabela de Ranking
    // =================================================================
    const tbody = document.getElementById('rankingTableBody');
    dadosDashboard.rankingHabitantes.forEach((item, index) => {
        const row = tbody.insertRow();
        const celulas = [item.municipio, item.populacao, item.efetivo, item.proporcao];
        
        celulas.forEach(text => {
            const cell = row.insertCell();
            cell.textContent = text.toLocaleString('pt-BR');
        });
        
        // Destaque na tabela (Melhor e Pior)
        if (index === 0) {
            row.cells[3].classList.add('melhor-proporcao');
        } else if (index === dadosDashboard.rankingHabitantes.length - 1) {
            row.cells[3].classList.add('pior-proporcao');
        }
    });
});
