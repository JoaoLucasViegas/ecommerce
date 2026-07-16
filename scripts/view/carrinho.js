let produtos_carrinho = [];
let total = 0;

/* ===========================================
    RENDER
=========================================== */

function renderizarCarrinho() {

    const cupom = document.getElementById("cupom");

    if (!cupom)
        return;

    let subtotal = 0;

    let html = "";

    if (produtos_carrinho.length === 0) {

        cupom.innerHTML = `

            <div class="cart-total">

                <h2>

                    Seu carrinho está vazio.

                </h2>

                <p>

                    Adicione alguns produtos para continuar.

                </p>

            </div>

        `;

        return;

    }

    produtos_carrinho.forEach((produto, indice) => {

        const valor = produto.preco * produto.quantidade;

        subtotal += valor;

        html += `

            <div class="cart-item">

                <div class="cart-info">

                    <h3>

                        ${produto.nome}

                    </h3>

                    <p>

                        Quantidade:
                        <strong>${produto.quantidade}</strong>

                    </p>

                    <p>

                        Unitário:
                        <strong>

                            R$ ${produto.preco.toFixed(2)}

                        </strong>

                    </p>

                </div>

                <div class="cart-actions">

                    <h3>

                        R$ ${valor.toFixed(2)}

                    </h3>

                    <button

                        onclick="removerItem(${indice})">

                        Remover

                    </button>

                </div>

            </div>

        `;

    });

    total = subtotal;

    html += `

        <div class="cart-total">

            <h2>

                Total

            </h2>

            <h1>

                R$ ${subtotal.toFixed(2)}

            </h1>

            <br>

            <button

                class="btn-pay"

                onclick="pagar()"

                ${subtotal <= 0 ? "disabled" : ""}>

                Pagar no PIX

            </button>

        </div>

    `;

    cupom.innerHTML = html;

}

/* ===========================================
    REMOVE
=========================================== */

function removerItem(indice) {

    produtos_carrinho.splice(indice, 1);

    salvarCarrinho();

    renderizarCarrinho();

}

/* ===========================================
    STORAGE
=========================================== */

function salvarCarrinho() {

    sessionStorage.setItem(

        "produtos_carrinho",

        JSON.stringify(produtos_carrinho)

    );

}

function carregarCarrinho() {

    const dados = sessionStorage.getItem(

        "produtos_carrinho"

    );

    if (!dados) {

        produtos_carrinho = [];

        return;

    }

    produtos_carrinho = JSON.parse(dados);

}

/* ===========================================
    PAGAMENTO
=========================================== */

function pagar() {

    const usuario = JSON.parse(

        sessionStorage.getItem("user")

    );

    if (!usuario)
        return;

    const saldo = usuario.money - total;

    if (saldo < 0) {

        alert(

            "Saldo insuficiente."

        );

        return;

    }

    sessionStorage.setItem(

        "novo_saldo",

        saldo

    );

    window.location.assign(

        "pagamento.html"

    );

}

/* ===========================================
    NAVEGAÇÃO
=========================================== */

function voltar_loja() {

    window.location.assign(

        "index.html"

    );

}

/* ===========================================
    LOAD
=========================================== */

window.addEventListener(

    "load",

    () => {

        carregarCarrinho();

        renderizarCarrinho();

    }

);
