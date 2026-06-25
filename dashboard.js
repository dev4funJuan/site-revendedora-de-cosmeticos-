// LISTA COM LINKS DE IMAGENS PÚBLICAS E ESTÁVEIS
const produtos = [
    {
        id: 1,
        nome: "Base Líquida TimeWise® 3D",
        preco: "79,90",
        categoria: "maquiagem",
        imagem: "https://images.unsplash.com/photo-1625093742435-6fa192b6fb10?w=400&auto=format&fit=crop&q=60"
    },
    {
        id: 2,
        nome: "Fragrância Pink Diamonds™ EDP",
        preco: "149,90",
        categoria: "perfumes",
        imagem: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=400&auto=format&fit=crop&q=60"
    },
    {
        id: 3,
        nome: "Gel de Limpeza 4 em 1 TimeWise®",
        preco: "69,90",
        categoria: "cuidados",
        imagem: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&auto=format&fit=crop&q=60"
    }
];

const numeroWhatsApp = "5511999999999"; 
let categoriaAtual = "todos";

// Variáveis de Controle de Usuário
let usuarioLogado = false;
let favoritosPorUsuario = [];

function renderizarProdutos(produtosParaExibir) {
    const vitrine = document.getElementById("vitrine-produtos");
    vitrine.innerHTML = "";

    if (produtosParaExibir.length === 0) {
        vitrine.innerHTML = `<p class="sem-produtos">Nenhum produto encontrado...</p>`;
        return;
    }

    produtosParaExibir.forEach(produto => {
        const msg = `Olá! Quero encomendar: ${produto.nome} (R$ ${produto.preco})`;
        const link = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(msg)}`;

        const jaFavoritou = usuarioLogado && favoritosPorUsuario.includes(produto.id);
        const iconeCoracao = jaFavoritou ? "♥" : "♡";
        const classeFavorito = jaFavoritou ? "favoritado" : "";
        
        const acaoClique = usuarioLogado 
            ? `alternarFavorito(${produto.id})` 
            : `alert('Por favor, faça login para salvar seus favoritos!')`;

        vitrine.innerHTML += `
            <div class="card-produto">
                <span class="selo-tag">Mais Vendido</span>
                <span class="coracao-favorito ${classeFavorito}" onclick="${acaoClique}">${iconeCoracao}</span>
                <img src="${produto.imagem}" alt="${produto.nome}" onerror="this.src='https://placehold.co/250x220?text=Imagem+Indisponível'">
                <h3>${produto.nome}</h3>
                <p class="preco">R$ ${produto.preco}</p>
                <a href="${link}" target="_blank" class="btn-comprar">Pedir pelo WhatsApp</a>
            </div>
        `;
    });
}

function fazerLogin() {
    if (!usuarioLogado) {
        usuarioLogado = true;
        document.getElementById("txt-login").innerText = "Olá, Cliente v";
        document.getElementById("btn-login").classList.add("logado");
        alert("Login efetuado com sucesso! Seus favoritos agora serão salvos.");
    } else {
        usuarioLogado = false;
        favoritosPorUsuario = []; 
        document.getElementById("txt-login").innerText = "Entrar";
        document.getElementById("btn-login").classList.remove("logado");
        categoriaAtual = "todos";
        alert("Você saiu da sua conta.");
    }
    executarFiltros();
}

function alternarFavorito(idProduto) {
    if (!usuarioLogado) return;
    
    const posicao = favoritosPorUsuario.indexOf(idProduto);
    if (posicao === -1) {
        favoritosPorUsuario.push(idProduto);
    } else {
        favoritosPorUsuario.splice(posicao, 1);
    }
    executarFiltros();
}

function filtrarCategoria(categoria) {
    categoriaAtual = categoria;
    const botoes = document.querySelectorAll(".aba-btn");
    botoes.forEach(btn => btn.classList.remove("ativa"));
    
    if(event) {
        event.target.classList.add("ativa");
    }
    executarFiltros();
}

function executarFiltros() {
    const termoBusca = document.getElementById("campo-busca").value.toLowerCase();
    
    const produtosFiltrados = produtos.filter(produto => {
        const correspondeCategoria = (categoriaAtual === "todos" || 
                                      (categoriaAtual === "favoritos" && favoritosPorUsuario.includes(produto.id)) ||
                                      produto.categoria === categoriaAtual);
                                      
        const correspondeBusca = produto.nome.toLowerCase().includes(termoBusca);
        return correspondeCategoria && correspondeBusca;
    });
    
    renderizarProdutos(produtosFiltrados);
}

document.getElementById("campo-busca").addEventListener("input", executarFiltros);

window.onload = () => {
    renderizarProdutos(produtos);
};

// LISTA DE FRASES PERSONALIZADAS
const frasesAlerta = [
    "Achadinhos da Beauty Vendas para você, Encomende já o seu!",
    "Vendemos também no Instagram! Siga @seu_instagram",
    "Entrega direta em Mogi Mirim e região!"
];

let indiceFraseAtual = 0;

function alternarFrasesTopo() {
    const elementoTexto = document.getElementById("texto-alerta");
    if (!elementoTexto) return;

    elementoTexto.classList.add("escondido");

    setTimeout(() => {
        indiceFraseAtual = (indiceFraseAtual + 1) % frasesAlerta.length;
        elementoTexto.innerText = frasesAlerta[indiceFraseAtual];
        elementoTexto.classList.remove("escondido");
    }, 600);
}

setInterval(alternarFrasesTopo, 8000);