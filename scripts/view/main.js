
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
}

let lista_produtos = ["Spaghetti", "Pasta", "Carbonara", "Ensalada"];
let lista_precos = [15.99, 12.99, 6.99, 5.99, 1.99];
let lista_imagens = [
    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%2Fid%2FOIP.hvjEJ364tx8LHJyDiTDDFQHaE6%3Fr%3D0%26pid%3DApi&f=1&ipt=5989ad5b8833a9b6a3f58121b4da25a49f1f6ba0cfa3d7fc2b14e853c4212c26&ipo=images",
    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%2Fid%2FOIP.KFkU4xFB8lI6wrFCFRSBLwHaE8%3Fr%3D0%26pid%3DApi&f=1&ipt=50aebeb4d38eed05cc60c8f077a87a424095d28852cefe0a3d5845519f37699e&ipo=images",
    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%2Fid%2FOIP.MIvYdwiHGR-mOZaUf6bU6QHaEK%3Fr%3D0%26pid%3DApi&f=1&ipt=9e4bc667a30c143b474159be355548b5ac1187d1f2d64ebce74fd43a7229f27e&ipo=images",
    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%2Fid%2FOIP.CMSbqPsFpMHdcPwMJ-87OAHaE0%3Fr%3D0%26pid%3DApi&f=1&ipt=6d1c3863db996035f538997c0d5bcb1c6c014b3b1002752bd41da240030f0260&ipo=images",
    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%2Fid%2FOIP.gDlgjVg751lz7RiLFMCjaAHaI8%3Fr%3D0%26pid%3DApi&f=1&ipt=a20c69225fbe321404b108e8166d3f59457877a57f5078a383c55657bf67d781&ipo=images",
    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%2Fid%2FOIP.XJLKjdFhr3sky4YLreiriQHaFj%3Fr%3D0%26pid%3DApi&f=1&ipt=8e030447d4f0317f391def4c473c6f6f0ef4affc80b636cfd724117dd6e15d1b&ipo=images",
    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%2Fid%2FOIP.MepH5elxO1eoiN3rJ4Qi8AHaDy%3Fr%3D0%26pid%3DApi&f=1&ipt=79d156ab377d4b57dd600d0a4a929c029371b6ed6a773c32a62218d417a0edae&ipo=images"
];



function gerarComponente() {
    const imagem = lista_imagens[getRndInteger(0,lista_imagens.length)];
    const texto = lista_produtos[getRndInteger(0,lista_produtos.length)];
    const preco = lista_precos[getRndInteger(0,lista_precos.length)].toFixed(2);
    const id = "pedido_" + (Math.random() * 10);

    return `    
        <div>
            <img src="${imagem}" width="192px" height="128px">
            <h2>${texto}</h2>
            <h3>R$ ${preco}</h3>
            <input id="${id}"type="number" min="1" step="1" title="Quantidade" style="width: 30px;" value="1">
            <button onclick="pedir('${id}','${texto}', ${preco})">PEDIR</button>
        </div><br>
    `;
}


let lista_de_pedidos = [];

const quantidade_items_lista = 4;
for (let idx = 1; idx <= quantidade_items_lista; idx++) {
    document.getElementById("lista").innerHTML += gerarComponente();
}

function pedir(id, nome_produto, preco) {
    let quantidade = document.getElementById(id);
    alert(`A compra de ${nome_produto} foi efetuada!`);
    lista_de_pedidos.push(new Pedido(id, nome_produto, preco, quantidade.value));
    //console.log(lista_de_pedidos);
}

function abrir_carrinho() {
    sessionStorage.setItem("produtos_carrinho", JSON.stringify(lista_de_pedidos));
    window.location.assign("/carrinho.html");
}

window.onpageshow = () => {
    let connection = sessionStorage.getItem("produtos_carrinho")
    if (connection) {
        //alert("Found something!")
        console.log(connection)
        lista_de_pedidos = JSON.parse(sessionStorage.getItem("produtos_carrinho"));
    } /*else {
        //alert("Found nothing!")
    }*/
}
