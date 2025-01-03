// Função para carregar os convênios a partir de um objeto JSON
function carregarConvenios() {
    const conveniosJSON = {
        "convenios": {
            "D": 0.05,
            "E": 0.06
        }
    };

    const conveniosNovosOptgroup = document.querySelector("optgroup[label='Novos convênios']");

    const convenios = conveniosJSON.convenios;
    for (const convenio in convenios) {
        const option = document.createElement("option");
        option.value = convenio;
        option.textContent = `${convenio} - ${convenios[convenio] * 100}% de desconto`;
        conveniosNovosOptgroup.appendChild(option);
    }

    alert("Convênios carregados com sucesso!");
}

// Registrar entrada
const btRegistrar = document.getElementById("btRegistrar");
btRegistrar.addEventListener("click", function(event) {
    event.preventDefault();

    const tabela = document.getElementById("entradas");
    const entrada = parseInt(document.getElementById("entrada").value);
    const placa = document.getElementById("placa").value;
    const convenio = document.getElementById("convenio").value;
    const saida = entrada + 1;
    let saidaHTML = "<input type='number' id='inputsaida' value='" + (entrada + 1) + "' min='" + (entrada + 1) + "' max='18' onchange='atualiza(this,this.value)'>";

    const novalinha = tabela.insertRow();
    let col1 = novalinha.insertCell().innerHTML = placa;
    let col2 = novalinha.insertCell().innerHTML = entrada;
    let col3 = novalinha.insertCell().innerHTML = saidaHTML;
    let col4 = novalinha.insertCell().innerHTML = 1;
    let col5 = novalinha.insertCell().innerHTML = calcTotal(1, convenio);
    let col6 = novalinha.insertCell().innerHTML = convenio;
    let col7 = novalinha.insertCell().innerHTML = "<button onclick='remove(this)' class='icone'>🗑️</button>";

    tabela.append(novalinha);
});

// Função para remover linha da tabela
function remove(botao) {
    botao.parentNode.parentNode.remove();
}

// Atualiza o tempo e o valor na tabela
function atualiza(campo, valor) {
    linha = campo.parentNode.parentNode;
    linha.cells[3].innerHTML = parseInt(valor) - parseInt(linha.cells[1].innerHTML);
    linha.cells[4].innerHTML = calcTotal(linha.cells[3].innerHTML, linha.cells[5].innerHTML);
}

// Função para calcular o total com tarifa e desconto
function tarifa() {
    return document.getElementById("tarifa").value;
}

function calcTotal(tempo, convenio) {
    tempo = parseInt(tempo);
    let adicional = 0.00;
    let desconto = 0;

    if (convenio === "A") {
        desconto = 0.02;
    } else if (convenio === "B") {
        desconto = 0.03;
    } else if (convenio === "C") {
        desconto = 0.04;
    } else if (convenio === "D") {
        desconto = 0.05;
    } else if (convenio === "E") {
        desconto = 0.06;
    } else {
        desconto = 0;
    }

    if (tempo > 1) {
        adicional = (tempo - 1) * (tarifa() / 2);
    }

    let total = parseInt(tarifa()) + adicional;
    let totalComDesconto = total - (total * desconto);

    return totalComDesconto.toFixed(2);
}

// Atualiza a tarifa
function atualizarTarifa() {
    let senha = prompt("Digite a senha do ADMIN");
    if (senha == "123") {
        let novaTarifa = prompt("Digite a nova Tarifa");
        document.getElementById("tarifa").value = novaTarifa;
        alert("Você atualizou a tarifa...");
    } else {
        alert("Sua senha está incorreta, tente outra vez");
    }
}

// Função de inicialização
function valida() {
    document.getElementById("tarifa").value = 10;

    let dataAtual = new Date();
    let dataFormatada = dataAtual.toISOString().slice(0, 16);
    document.getElementById("datatual").value = dataFormatada;
}
