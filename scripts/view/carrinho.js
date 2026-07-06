
let produtos_carrinho = [];

function renderizar_cupom() {
    let subtotal = 0.0;
    let cupom_div = document.getElementById("cupom");
    cupom_div.innerHTML = "";
    cupom_div.innerHTML += '<h2> PRODUTO ·················· PRECO</h2>';
    cupom_div.innerHTML += '<h2> ······································· </h2><br><br>';
    produtos_carrinho.forEach((produto, idx) => {
        console.log(produto)
        let stringed_produto = JSON.stringify(produto)
        let texto = (produto.quantidade > 1) ? `X <t> ${produto.quantidade}` : "";
        let elemento = `
            <h2>${produto.nome} ·············· R$ ${produto.preco} ${texto}
            <button onclick="remover_item(${idx})")>Remover</button> 
            </h2>
        `;
        cupom_div.innerHTML += elemento;

        subtotal += produto.preco * produto.quantidade;
    });
    
    cupom_div.innerHTML += '<br><br><h2> ········································ </h2>';
    cupom_div.innerHTML += `<h2> TOTAL ················· R$ ${subtotal.toFixed(2)}</h2>`;
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

window.onpageshow = () => {
    load_list_items();
};