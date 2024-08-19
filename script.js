async function obterCotacaoMoeda(moedaBase, moedaDestino) {
    const url = `https://api.exchangerate-api.com/v4/latest/${moedaBase}`;

    try {
        const resposta = await fetch(url);
        
        if (!resposta.ok) {
            throw new Error(`Falha na solicitação. Código de status: ${resposta.status}`);
        }

        const dados = await resposta.json();
        const taxaCambio = dados.rates[moedaDestino];

        if (taxaCambio === undefined) {
            throw new Error(`Moeda de destino '${moedaDestino}' não encontrada na resposta.`);
        }

        return taxaCambio;

    } catch (error) {
        throw new Error(`Erro na conversão das moedas.`);
    }
}

async function exemploConversaoMoeda(valor, moedaBase, moedaDestino) {
    try {
        const taxaCambio = await obterCotacaoMoeda(moedaBase, moedaDestino);
        const valorConvertido = valor * taxaCambio;
        return `${valor} ${moedaBase} é igual a ${valorConvertido.toFixed(2)} ${moedaDestino}`;
    } catch (error) {
        return `Erro: ${error.message}`;
    }
}

document.getElementById('formConversao').addEventListener('submit', async (event) => {
    event.preventDefault();

    const valor = parseFloat(document.getElementById('valor').value);
    const moedaBase = document.getElementById('moedaBase').value.toUpperCase();
    const moedaDestino = document.getElementById('moedaDestino').value.toUpperCase();

    const resultado = await exemploConversaoMoeda(valor, moedaBase, moedaDestino);
    document.getElementById('resultado').textContent = resultado;
});