// --- DATA ---
const dashboardData = {
    kpis: {
        totalMunicipios: 417,
        municipiosComGCM: 270,
    },
    estruturaOperacional: {
        totalGCMs: 270,
        items: [
            { label: 'Lei de Criação', value: 129 },
            { label: 'Registra Ocorrência', value: 105 },
            { label: 'Sede ou Base Própria', value: 94 },
            { label: 'CNPJ Próprio', value: 56 },
            { label: 'Curso de Formação', value: 43 },
            { label: 'Corregedoria Própria', value: 39 },
            { label: 'Ouvidoria Própria', value: 37 },
            { label: 'Central 153', value: 34 },
            { label: 'Centro de Formação', value: 32 },
            { label: 'Porte de Arma de Fogo', value: 20 },
        ]
    },
    estruturaAdmin: {
        labels: ['Plano de Cargos e Salários', 'Conselho Municipal de Segurança', 'Secretaria Municipal de Segurança', 'Fundo Municipal de Segurança', 'Plano Municipal de Segurança'],
        data: [39, 35, 17, 15, 6]
    },
    salario: {
        labels: ['1 SM', '>1 a 1,5 SM', '>1,5 a 2 SM', '>2 a 2,5 SM', '>2,5 a 3 SM', '>3 SM'],
        data: [64.44, 23.70, 6.30, 2.59, 1.48, 1.48]
    },
    porteRegiao: {
        labels: ['Sul Baiano', 'Nordeste Baiano', 'Centro-Norte Baiano', 'Metropolitana de Salvador', 'Outras Regiões'],
        data: [25, 25, 20, 15, 15]
    },
    ranking: [
        { municipio: "Salvador", populacao: 2564204, efetivo: 1375, proporcao: 1865 },
        { municipio: "Feira de Santana", populacao: 660806, efetivo: 218, proporcao: 3031 },
        { municipio: "Vitória da Conquista", populacao: 396613, efetivo: 197, proporcao: 2013 },
        { municipio: "Juazeiro", populacao: 256122, efetivo: 169, proporcao: 1516 },
        { municipio: "Lauro de Freitas", populacao: 219564, efetivo: 121, proporcao: 1815 },
        { municipio: "Ilhéus", populacao: 196344, efetivo: 199, proporcao: 987 },
        { municipio: "Itabuna", populacao: 189149, efetivo: 188, proporcao: 1006 },
        { municipio: "Barreiras", populacao: 182630, efetivo: 121, proporcao: 1509 },
        { municipio: "Porto Seguro", populacao: 171634, efetivo: 145, proporcao: 1184 },
        { municipio: "Alagoinhas", populacao: 169201, efetivo: 164, proporcao: 1032 },
        { municipio: "Jequié", populacao: 161196, efetivo: 159, proporcao: 1014 },
        { municipio: "Teixeira de Freitas", populacao: 153738, efetivo: 175, proporcao: 879 },
        { municipio: "Simões Filho", populacao: 127093, efetivo: 45, proporcao: 2824 },
        { municipio: "Paulo Afonso", populacao: 121067, efetivo: 30, proporcao: 4036 },
        { municipio: "Eunápolis", populacao: 119418, efetivo: 47, proporcao: 2541 },
        { municipio: "Luís Eduardo Magalhães", populacao: 118382, efetivo: 57, proporcao: 2077 },
        { municipio: "Santo Antônio de Jesus", populacao: 109791, efetivo: 67, proporcao: 1639 }
    ]
};

// --- CHART CONFIGS & HELPERS ---
const defaultChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
        duration: 1200,
        easing: 'easeOutQuart',
    },
    plugins: {
        legend: { position: 'bottom', labels: { boxWidth: 15, padding: 20 } },
        tooltip: {
            backgroundColor: '#0f172a', // slate-900
            titleFont: { size: 14, weight: 'bold' },
            bodyFont: { size: 12 },
            padding: 12,
            cornerRadius: 8,
            callbacks: {
                title: (tooltipItems) => {
                    const item = tooltipItems[0];
                    let label = item.chart.data.labels[item.dataIndex];
                    return Array.isArray(label) ? label.join(' ') : label;
                }
            }
        }
    }
};

// --- RENDER FUNCTIONS ---

// 1. Render KPIs Chart
function renderKPIsChart() {
    const { totalMunicipios, municipiosComGCM } = dashboardData.kpis;
    new Chart(document.getElementById('municipiosChart'), {
        type: 'doughnut',
        data: {
            labels: ['Com GCM', 'Sem GCM'],
            datasets: [{
                data: [municipiosComGCM, totalMunicipios - municipiosComGCM],
                backgroundColor: ['#00AEEF', '#e2e8f0'],
                borderColor: '#ffffff',
                borderWidth: 3
            }]
        },
        options: { ...defaultChartOptions, cutout: '70%', plugins: { legend: { display: false }, tooltip: { ...defaultChartOptions.plugins.tooltip } } }
    });
}

// 2. Render Structure Indicators
function renderStructureIndicators() {
    const container = document.getElementById('progress-indicators-container');
    const { items, totalGCMs } = dashboardData.estruturaOperacional;
    container.innerHTML = ''; // Clear previous content
    items.forEach(({ label, value }) => {
        const percentage = (value / totalGCMs) * 100;
        const indicatorHTML = `
            <div>
                <div class="flex justify-between items-center mb-1">
                    <span class="text-sm font-medium text-slate-700">${label}</span>
                    <span class="text-sm font-semibold text-[#0A2F5B]">${value} / ${totalGCMs}</span>
                </div>
                <div class="w-full bg-slate-200 rounded-full h-3">
                    <div class="bg-[#00AEEF] h-3 rounded-full progress-bar-inner" data-percentage="${percentage}"></div>
                </div>
            </div>
        `;
        container.insertAdjacentHTML('beforeend', indicatorHTML);
    });
    
    // Animate the bars
    const bars = container.querySelectorAll('.progress-bar-inner');
    setTimeout(() => {
        bars.forEach(bar => {
            bar.style.width = `${bar.dataset.percentage}%`;
        });
    }, 100);
}

// 3. Render Admin Structure Chart
function renderAdminStructureChart() {
     const wrapLabel = (label, maxLength = 16) => {
        if (typeof label !== 'string' || label.length <= maxLength) return label;
        const words = label.split(' ');
        const lines = [];
        let currentLine = '';
        for (const word of words) {
            if ((currentLine + ' ' + word).trim().length > maxLength && currentLine.length > 0) {
                lines.push(currentLine);
                currentLine = '';
            }
            currentLine = (currentLine + ' ' + word).trim();
        }
        if (currentLine.length > 0) lines.push(currentLine);
        return lines.length > 1 ? lines : label;
    };

    new Chart(document.getElementById('estruturaAdminChart'), {
        type: 'bar',
        data: {
            labels: dashboardData.estruturaAdmin.labels.map(l => wrapLabel(l, 20)),
            datasets: [{
                label: 'Nº de Municípios',
                data: dashboardData.estruturaAdmin.data,
                backgroundColor: '#0A2F5B',
                borderRadius: 4
            }]
        },
        options: {
            ...defaultChartOptions,
            indexAxis: 'y',
            scales: { x: { beginAtZero: true, grid: { display: false } } },
            plugins: { legend: { display: false }, tooltip: { ...defaultChartOptions.plugins.tooltip } }
        }
    });
}

// 4. Render Salary Chart
function renderSalaryChart() {
    new Chart(document.getElementById('salarioChart'), {
        type: 'bar',
        data: {
            labels: dashboardData.salario.labels,
            datasets: [{
                label: '% do Efetivo',
                data: dashboardData.salario.data,
                backgroundColor: ['#0A2F5B', '#00AEEF', '#58B8E8', '#8CCDEB', '#B9E2F2', '#E60026'],
                borderRadius: 4
            }]
        },
        options: {
            ...defaultChartOptions,
            indexAxis: 'y',
            scales: {
                x: { beginAtZero: true, ticks: { callback: value => value + '%' } },
                y: { grid: { display: false } }
            },
            plugins: { 
                legend: { display: false }, 
                tooltip: { 
                    ...defaultChartOptions.plugins.tooltip,
                    callbacks: {
                        ...defaultChartOptions.plugins.tooltip.callbacks,
                        label: context => `${context.dataset.label}: ${context.raw.toFixed(2)}%`
                    }
                }
            }
        }
    });
}

// 5. Render Regional Chart
function renderRegionalChart() {
    new Chart(document.getElementById('porteRegiaoChart'), {
        type: 'pie',
        data: {
            labels: dashboardData.porteRegiao.labels,
            datasets: [{
                label: 'Municípios com Porte',
                data: dashboardData.porteRegiao.data,
                backgroundColor: ['#0A2F5B', '#00AEEF', '#58B8E8', '#8CCDEB', '#E60026'],
                borderColor: '#ffffff',
                borderWidth: 3
            }]
        },
        options: {
            ...defaultChartOptions,
            plugins: {
                ...defaultChartOptions.plugins,
                tooltip: {
                     ...defaultChartOptions.plugins.tooltip,
                     callbacks: {
                        ...defaultChartOptions.plugins.tooltip.callbacks,
                        label: context => ` ${context.label}: ${context.raw}%`
                    }
                }
            }
        }
    });
}

// 6. Render Ranking Table (Static, no animation needed here)
function renderRankingTable() {
    let currentData = [...dashboardData.ranking];
    let currentSort = { key: 'populacao', asc: false };
    const tableBody = document.getElementById('rankingTableBody');
    const searchInput = document.getElementById('tableSearch');

    const render = (data) => {
        tableBody.innerHTML = '';
        if (data.length === 0) {
            tableBody.innerHTML = `<tr><td colspan="4" class="text-center p-6 text-slate-500">Nenhum município encontrado.</td></tr>`;
            return;
        }
        data.forEach(row => {
            const tr = document.createElement('tr');
            tr.className = 'hover:bg-slate-50 transition-colors';
            tr.innerHTML = `
                <td class="p-4 text-sm font-medium text-slate-800">${row.municipio}</td>
                <td class="p-4 text-sm text-slate-600 text-right">${row.populacao.toLocaleString('pt-BR')}</td>
                <td class="p-4 text-sm text-slate-600 text-right">${row.efetivo.toLocaleString('pt-BR')}</td>
                <td class="p-4 text-sm text-slate-600 text-right">${row.proporcao.toLocaleString('pt-BR')}</td>
            `;
            tableBody.appendChild(tr);
        });
    };

    const sortData = (key) => {
        const isAsc = currentSort.key === key ? !currentSort.asc : true;
        currentSort = { key, asc: isAsc };
        
        const sortedData = [...currentData].sort((a, b) => {
            if (a[key] < b[key]) return isAsc ? -1 : 1;
            if (a[key] > b[key]) return isAsc ? 1 : -1;
            return 0;
        });

        document.querySelectorAll('.table-sortable th').forEach(th => {
            th.classList.remove('sort-asc', 'sort-desc');
            if (th.dataset.sort === key) {
                th.classList.add(isAsc ? 'sort-asc' : 'sort-desc');
            }
        });

        render(sortedData);
    };

    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        currentData = dashboardData.ranking.filter(row =>
            row.municipio.toLowerCase().includes(searchTerm)
        );
        sortData(currentSort.key);
    });

    document.querySelectorAll('.table-sortable th').forEach(header => {
        header.addEventListener('click', () => sortData(header.dataset.sort));
    });
    
    sortData('populacao');
    // The initial render is now handled by the Intersection Observer, 
    // but we can sort the initial data state here.
    currentData = [...dashboardData.ranking];
    sortData(currentSort.key);
}

// --- ANIMATION ON SCROLL LOGIC ---
const animatedElements = [
    { id: 'municipiosChart', render: renderKPIsChart },
    { id: 'progress-indicators-container', render: renderStructureIndicators },
    { id: 'estruturaAdminChart', render: renderAdminStructureChart },
    { id: 'salarioChart', render: renderSalaryChart },
    { id: 'porteRegiaoChart', render: renderRegionalChart }
];

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const elementToRender = animatedElements.find(el => el.id === entry.target.parentElement.id || el.id === entry.target.id);
            if (elementToRender) {
                elementToRender.render();
                observer.unobserve(entry.target);
            }
        }
    });
}, { threshold: 0.1 });

animatedElements.forEach(elementInfo => {
    const element = document.getElementById(elementInfo.id);
    if(element) {
        // Observe the canvas element itself or the container for progress bars
        observer.observe(element);
    }
});

// --- INITIALIZE STATIC ELEMENTS ---
renderRankingTable();
