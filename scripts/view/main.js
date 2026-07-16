function random(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

/* ===========================================
   DADOS DE EXEMPLO
=========================================== */

const produtos = [

    { nome: "Spaghetti", preco: 15.99 },

    { nome: "Pasta", preco: 12.99 },

    { nome: "Carbonara", preco: 6.99 },

    { nome: "Ensalada", preco: 5.99 },

    { nome: "Risotto", preco: 18.99 }

];

const imagens = [

    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%2Fid%2FOIP.hvjEJ364tx8LHJyDiTDDFQHaE6",

    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%2Fid%2FOIP.KFkU4xFB8lI6wrFCFRSBLwHaE8",

    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%2Fid%2FOIP.MIvYdwiHGR-mOZaUf6bU6QHaEK",

    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%2Fid%2FOIP.CMSbqPsFpMHdcPwMJ-87OAHaE0",

    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%2Fid%2FOIP.gDlgjVg751lz7RiLFMCjaAHaI8",

    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%2Fid%2FOIP.XJLKjdFhr3sky4YLreiriQHaFj",

    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%2Fid%2FOIP.MepH5elxO1eoiN3rJ4Qi8AHaDy"

];

/* ===========================================
   ESTADO
=========================================== */

let lista_de_pedidos = [];

let wallet_money = 500;

/* ===========================================
   CARD
=========================================== */

function gerarProduto() {

    const produto = produtos[random(0, produtos.length)];

    const imagem = imagens[random(0, imagens.length)];

    const inputId = crypto.randomUUID();

    return `

        <div class="produto">

            <img
                src="${imagem}"
                alt="${produto.nome}">

            <h3>${produto.nome}</h3>

            <h4>R$ ${produto.preco.toFixed(2)}</h4>

            <div class="quantidade">

                <label>Qtd.</label>

                <input
                    id="${inputId}"
                    type="number"
                    value="1"
                    min="1">

            </div>

            <button
                onclick="pedir(
                    '${inputId}',
                    '${produto.nome}',
                    ${produto.preco}
                )">

                Adicionar

            </button>

        </div>

    `;

}

/* ===========================================
   RENDERIZAÇÃO
=========================================== */

function renderizarProdutos() {

    const lista = document.getElementById("lista");

    let html = "";

    for (let i = 0; i < 12; i++) {

        html += gerarProduto();

    }

    lista.innerHTML = html;

}

/* ===========================================
   CARRINHO
=========================================== */

function pedir(id, nome, preco) {

    const quantidade = Number(

        document.getElementById(id).value

    );

    const existente = lista_de_pedidos.find(

        item => item.id === id

    );

    if (existente) {

        existente.quantidade += quantidade;

    } else {

        lista_de_pedidos.push(

            new Pedido(

                id,

                nome,

                preco,

                quantidade

            )

        );

    }

    alert(

        `${quantidade}x ${nome} adicionado ao carrinho.`

    );

}

function abrir_carrinho() {

    sessionStorage.setItem(

        "produtos_carrinho",

        JSON.stringify(lista_de_pedidos)

    );

    sessionStorage.setItem(

        "user",

        JSON.stringify({

            name: "Walter Woollet",

            money: wallet_money

        })

    );

    window.location.assign(

        "carrinho.html"

    );

}

/* ===========================================
   WALLET
=========================================== */

function atualizarCarteira() {

    const wallet = JSON.parse(

        sessionStorage.getItem("user")

    );

    if (wallet) {

        wallet_money = wallet.money;

    }

    document
        .getElementById("wallet_info")
        .textContent =

        `Saldo carteira: R$ ${wallet_money.toFixed(2)}`;

}

/* ===========================================
   LOAD
=========================================== */

window.addEventListener(

    "load",

    () => {

        const carrinho = sessionStorage.getItem(

            "produtos_carrinho"

        );

        if (carrinho) {

            lista_de_pedidos = JSON.parse(carrinho);

        }

        atualizarCarteira();

        renderizarProdutos();

    }

);