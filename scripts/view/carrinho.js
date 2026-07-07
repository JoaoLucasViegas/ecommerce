
let produtos_carrinho = [];
let total = 0.0;

function renderizar_cupom() {
    let subtotal = 0.0;
    let cupom_div = document.getElementById("cupom");
    cupom_div.innerHTML = "";
    cupom_div.innerHTML += '<h2> PRODUTO ······························· PRECO</h2>';
    cupom_div.innerHTML += '<h2> ··························································· </h2><br><br>';
    produtos_carrinho.forEach((produto, idx) => {
        console.log(produto)
        let texto = (produto.quantidade > 1) ? `x <t> ${produto.quantidade}` : "";
        let elemento = `
            <h2>${produto.nome} ······················ R$ ${produto.preco} ${texto}
            ·
            <button onclick="remover_item(${idx})")>Remover</button> 
            </h2>
        `;
        cupom_div.innerHTML += elemento;

        subtotal += produto.preco * produto.quantidade;
    });
    
    cupom_div.innerHTML += '<br><br><h2> ··························································· </h2>';
    cupom_div.innerHTML += `<h2> TOTAL ················· R$ ${subtotal.toFixed(2)}</h2>`;

    if (subtotal <= 0.0) {
        cupom_div.innerHTML += `
            <button type="submit" onclick="pagar()" disabled="true" style="background-color: gray; color: black; border-radius: 30px; border: green solid 2px; padding: 2%; font-size: large; font-weight: bolder; width: 400px; height: max-content; justify-content: center;"> Pagar no PIX </button>
        `;
    } else {
        cupom_div.innerHTML += `
            <button type="submit" onclick="pagar()" style="background-color: greenyellow; color: black; border-radius: 30px; border: green solid 2px; padding: 2%; font-size: large; font-weight: bolder; width: 400px; height: max-content; justify-content: center;"> Pagar no PIX </button>
        `;
    }
    total = subtotal;
}

function remover_item(idx) {
    console.log(`${idx} Hello`);
    if (produtos_carrinho[idx]) {
        produtos_carrinho.splice(idx, 1);
        sessionStorage.setItem("produtos_carrinho", JSON.stringify(produtos_carrinho));
        load_list_items();
        console.log("There!")
    }
    console.log("World!")
} 

function load_list_items() {
    //console.log("Loading List!");
    //console.log(produtos_carrinho);
    produtos_carrinho = JSON.parse(sessionStorage.getItem("produtos_carrinho"));
    //console.log("List loaded!");
    //console.log(produtos_carrinho);
    renderizar_cupom();
}

function voltar_loja() {
    window.location.assign("index.html");
}

function pagar() {
    let walter_wallet = JSON.parse(sessionStorage.getItem("user"));
    let saldo = walter_wallet.money - total;
    if (!walter_wallet)
        return;
    if (saldo <= 0.0) {
        alert("Saldo Insuficiente!");
        return;
    }
    sessionStorage.setItem("novo_saldo", saldo);
    window.location.assign("pagamento.html");
}

window.onpageshow = () => {
    load_list_items();
};