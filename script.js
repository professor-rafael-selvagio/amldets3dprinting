// Função para formatar CEP
function formatarCEP(cep) {
    // Remove qualquer caractere que não seja número
    return cep.replace(/\D/g, '');
}

// Função para validar CEP
function validarCEP(cep) {
    const cepLimpo = formatarCEP(cep);
    return cepLimpo.length === 8 && /^\d+$/.test(cepLimpo);
}

// Função principal para consultar CEP
async function consultarCEP() {
    const cepInput = document.getElementById('cepInput');
    const resultadoDiv = document.getElementById('resultado');
    const loadingDiv = document.getElementById('loading');
    const botao = document.getElementById('consultarBtn');
    
    const cep = cepInput.value.trim();
    
    // Validar CEP
    if (!validarCEP(cep)) {
        mostrarErro('Por favor, digite um CEP válido com 8 dígitos (apenas números).');
        return;
    }
    
    const cepLimpo = formatarCEP(cep);
    
    try {
        // Mostrar loading
        mostrarLoading(true);
        botao.disabled = true;
        resultadoDiv.classList.add('hidden');
        
        // Fazer requisição para a API ViaCEP
        const response = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);
        
        if (!response.ok) {
            throw new Error('Erro na consulta do CEP');
        }
        
        const dados = await response.json();
        
        // Verificar se o CEP foi encontrado
        if (dados.erro) {
            throw new Error('CEP não encontrado');
        }
        
        // Mostrar resultado
        mostrarResultado(dados);
        
    } catch (error) {
        console.error('Erro ao consultar CEP:', error);
        mostrarErro('Erro ao consultar CEP. Verifique se o CEP está correto e tente novamente.');
    } finally {
        // Esconder loading
        mostrarLoading(false);
        botao.disabled = false;
    }
}

// Função para mostrar/esconder loading
function mostrarLoading(mostrar) {
    const loadingDiv = document.getElementById('loading');
    if (mostrar) {
        loadingDiv.classList.remove('hidden');
    } else {
        loadingDiv.classList.add('hidden');
    }
}

// Função para mostrar resultado
function mostrarResultado(dados) {
    const resultadoDiv = document.getElementById('resultado');
    
    // Calcular taxa de entrega (exemplo fictício)
    const taxaEntrega = calcularTaxaEntrega(dados.uf);
    const prazoEntrega = calcularPrazoEntrega(dados.uf);
    
    resultadoDiv.innerHTML = `
        <h3>📍 Endereço Encontrado</h3>
        <p><strong>CEP:</strong> ${dados.cep}</p>
        <p><strong>Logradouro:</strong> ${dados.logradouro || 'Não informado'}</p>
        <p><strong>Bairro:</strong> ${dados.bairro || 'Não informado'}</p>
        <p><strong>Cidade:</strong> ${dados.localidade}</p>
        <p><strong>Estado:</strong> ${dados.uf}</p>
        
        <hr style="margin: 1.5rem 0; border: 1px solid #eee;">
        
        <h3>🚚 Informações de Entrega</h3>
        <p><strong>Taxa de Entrega:</strong> R$ ${taxaEntrega.toFixed(2)}</p>
        <p><strong>Prazo de Entrega:</strong> ${prazoEntrega} dias úteis</p>
        <p style="margin-top: 1rem; padding: 1rem; background: #e8f5e8; border-radius: 5px; color: #2d5016;">
            ✅ <strong>Realizamos entregas para esta região!</strong><br>
            Entre em contato para finalizar seu pedido.
        </p>
    `;
    
    resultadoDiv.className = 'resultado sucesso';
    resultadoDiv.classList.remove('hidden');
}

// Função para mostrar erro
function mostrarErro(mensagem) {
    const resultadoDiv = document.getElementById('resultado');
    
    resultadoDiv.innerHTML = `
        <h3>❌ Erro na Consulta</h3>
        <p>${mensagem}</p>
    `;
    
    resultadoDiv.className = 'resultado erro';
    resultadoDiv.classList.remove('hidden');
}

// Funções auxiliares para calcular taxa e prazo (exemplos fictícios)
function calcularTaxaEntrega(uf) {
    const taxas = {
        'SP': 15.00,
        'RJ': 18.00,
        'MG': 22.00,
        'RS': 25.00,
        'SC': 25.00,
        'PR': 20.00,
        'GO': 28.00,
        'DF': 28.00,
        'ES': 25.00,
        'BA': 35.00,
        'PE': 40.00,
        'CE': 45.00,
        'AM': 55.00,
        'PA': 50.00
    };
    
    return taxas[uf] || 30.00; // Taxa padrão
}

function calcularPrazoEntrega(uf) {
    const prazos = {
        'SP': '2-3',
        'RJ': '3-4',
        'MG': '3-5',
        'RS': '4-6',
        'SC': '4-6',
        'PR': '3-5',
        'GO': '5-7',
        'DF': '5-7',
        'ES': '4-6',
        'BA': '6-8',
        'PE': '7-10',
        'CE': '8-12',
        'AM': '10-15',
        'PA': '8-12'
    };
    
    return prazos[uf] || '5-10'; // Prazo padrão
}

// Permitir consulta ao pressionar Enter
document.getElementById('cepInput').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        consultarCEP();
    }
});

// Formatação automática do CEP durante a digitação
document.getElementById('cepInput').addEventListener('input', function(event) {
    let valor = event.target.value.replace(/\D/g, ''); // Remove tudo que não é número
    
    if (valor.length > 8) {
        valor = valor.substring(0, 8); // Limita a 8 dígitos
    }
    
    event.target.value = valor;
});

// Smooth scroll para navegação
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

console.log('🚀 Amldets 3D Printing - Site carregado com sucesso!');

// Modal functionality
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('modalOrcamento');
    const ctaButton = document.querySelector('.cta-button');
    const closeBtn = document.querySelector('.close');

    // Abrir modal
    ctaButton.addEventListener('click', function() {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Impede scroll da página
    });

    // Fechar modal
    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Restaura scroll da página
    });

    // Fechar modal clicando fora
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // Fechar modal com ESC
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && modal.style.display === 'block') {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
});

// Gallery functionality
class Gallery {
    constructor() {
        this.images = [];
        this.currentImageIndex = 0;
        this.imagesPerLoad = 6;
        this.totalLoaded = 0;
        this.init();
    }

    async init() {
        await this.loadImages();
        this.setupEventListeners();
        this.renderImages();
    }

    async loadImages() {
        // Lista de imagens que devem estar na pasta images/print3d/
        const imageNames = [
            'image1.jpeg',
            'image2.JPG', 
            'image3.JPG',
            'image4.JPG',
            'image5.JPG',
            'image6.JPG',
            'image7.JPG',
            'image8.jpeg',
            'image9.jpeg',
            'image10.jpeg',
            'image11.jpeg',
            'image12.jpeg'
            // Adicione mais nomes conforme necessário
        ];

        // Verificar quais imagens existem
        for (const imageName of imageNames) {
            const imagePath = `images/print3d/${imageName}`;
            if (await this.imageExists(imagePath)) {
                this.images.push({
                    src: imagePath,
                    alt: `Impressão 3D AMLDETS - ${imageName.replace(/\.[^/.]+$/, "")}`
                });
            }
        }

        console.log(`${this.images.length} imagens encontradas na galeria`);
    }

    imageExists(src) {
        return new Promise((resolve) => {
            const img = new Image();
            img.onload = () => resolve(true);
            img.onerror = () => resolve(false);
            img.src = src;
        });
    }

    renderImages() {
        const galleryGrid = document.getElementById('galleryGrid');
        const loadMoreBtn = document.getElementById('loadMoreBtn');
        
        if (this.images.length === 0) {
            galleryGrid.innerHTML = `
                <div style="grid-column: 1/-1; text-align: center; padding: 2rem;">
                    <p>Em breve adicionaremos fotos dos nossos trabalhos!</p>
                </div>
            `;
            loadMoreBtn.style.display = 'none';
            return;
        }

        const imagesToShow = this.images.slice(this.totalLoaded, this.totalLoaded + this.imagesPerLoad);
        
        imagesToShow.forEach((image, index) => {
            const galleryItem = document.createElement('div');
            galleryItem.className = 'gallery-item';
            galleryItem.innerHTML = `
                <img src="${image.src}" alt="${image.alt}" loading="lazy">
                <div class="gallery-overlay">
                    <span class="gallery-overlay-icon">🔍</span>
                </div>
            `;
            
            galleryItem.addEventListener('click', () => {
                this.openModal(this.totalLoaded + index);
            });
            
            galleryGrid.appendChild(galleryItem);
        });

        this.totalLoaded += imagesToShow.length;

        // Esconder botão se não há mais imagens
        if (this.totalLoaded >= this.images.length) {
            loadMoreBtn.style.display = 'none';
        }
    }

    setupEventListeners() {
        // Load more button
        document.getElementById('loadMoreBtn').addEventListener('click', () => {
            this.renderImages();
        });

        // Modal events
        const modal = document.getElementById('galleryModal');
        const closeBtn = document.querySelector('.gallery-close');
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');

        closeBtn.addEventListener('click', () => this.closeModal());
        prevBtn.addEventListener('click', () => this.previousImage());
        nextBtn.addEventListener('click', () => this.nextImage());

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (modal.style.display === 'block') {
                switch(e.key) {
                    case 'Escape':
                        this.closeModal();
                        break;
                    case 'ArrowLeft':
                        this.previousImage();
                        break;
                    case 'ArrowRight':
                        this.nextImage();
                        break;
                }
            }
        });

        // Close on outside click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                this.closeModal();
            }
        });
    }

    openModal(imageIndex) {
        this.currentImageIndex = imageIndex;
        const modal = document.getElementById('galleryModal');
        const modalImage = document.getElementById('modalImage');
        const imageCounter = document.getElementById('imageCounter');
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');

        modalImage.src = this.images[imageIndex].src;
        modalImage.alt = this.images[imageIndex].alt;
        imageCounter.textContent = `${imageIndex + 1} / ${this.images.length}`;

        // Navigation buttons state
        prevBtn.disabled = imageIndex === 0;
        nextBtn.disabled = imageIndex === this.images.length - 1;

        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    closeModal() {
        const modal = document.getElementById('galleryModal');
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    previousImage() {
        if (this.currentImageIndex > 0) {
            this.openModal(this.currentImageIndex - 1);
        }
    }

    nextImage() {
        if (this.currentImageIndex < this.images.length - 1) {
            this.openModal(this.currentImageIndex + 1);
        }
    }
}

// Initialize gallery when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new Gallery();
});
