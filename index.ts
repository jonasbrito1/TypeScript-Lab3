import * as readline from 'readline';

interface Produto {
    modelo: string;
    fabricante: string;
    valor: number;
}

class CarrinhoDeCompras<T extends Produto> {
    produtos: T[] = [];

    adicionarProduto(produto: T) {
        this.produtos.push(produto);
    }

    calcularTotal(): number {
        return this.produtos.reduce((total, produto) => total + produto.valor, 0);
    }

    exibirCarrinho() {
        console.log("\nCarrinho de Compras:");
        this.produtos.forEach((produto, index) => {
            console.log(`${index + 1}. Modelo: ${produto.modelo}, Fabricante: ${produto.fabricante}, Valor: R$ ${produto.valor.toFixed(2)}`);
        });
        console.log(`Total: R$ ${this.calcularTotal().toFixed(2)}`);
    }
}

class TV implements Produto {
    constructor(public modelo: string, public resolucao: string, public tamanhoPolegadas: number, public fabricante: string, public valor: number) {}
}

class Celular implements Produto {
    constructor(public modelo: string, public memoria: string, public fabricante: string, public valor: number) {}
}

class Bicicleta implements Produto {
    constructor(public modelo: string, public tamanhoAro: number, public fabricante: string, public valor: number) {}
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function adicionarProduto(carrinho: CarrinhoDeCompras<Produto>) {
    rl.question("Digite o tipo de produto (TV, Celular, Bicicleta): ", (tipo) => {
        switch (tipo.toLowerCase()) {
            case 'tv':
                adicionarTV(carrinho);
                break;
            case 'celular':
                adicionarCelular(carrinho);
                break;
            case 'bicicleta':
                adicionarBicicleta(carrinho);
                break;
            default:
                console.log("Tipo de produto inválido. Tente novamente.");
                adicionarProduto(carrinho);
                break;
        }
    });
}

function adicionarTV(carrinho: CarrinhoDeCompras<Produto>) {
    rl.question("Digite o modelo da TV: ", (modelo) => {
        rl.question("Digite a resolução da TV: ", (resolucao) => {
            rl.question("Digite o tamanho em polegadas da TV: ", (tamanhoInput) => {
                const tamanho = parseFloat(tamanhoInput);
                rl.question("Digite o fabricante da TV: ", (fabricante) => {
                    rl.question("Digite o valor da TV: ", (valorInput) => {
                        const valor = parseFloat(valorInput);
                        const tv = new TV(modelo, resolucao, tamanho, fabricante, valor);
                        carrinho.adicionarProduto(tv);
                        console.log("Produto adicionado ao carrinho.");
                        adicionarOutroProduto(carrinho);
                    });
                });
            });
        });
    });
}

function adicionarCelular(carrinho: CarrinhoDeCompras<Produto>) {
    rl.question("Digite o modelo do celular: ", (modelo) => {
        rl.question("Digite a memória do celular: ", (memoria) => {
            rl.question("Digite o fabricante do celular: ", (fabricante) => {
                rl.question("Digite o valor do celular: ", (valorInput) => {
                    const valor = parseFloat(valorInput);
                    const celular = new Celular(modelo, memoria, fabricante, valor);
                    carrinho.adicionarProduto(celular);
                    console.log("Produto adicionado ao carrinho.");
                    adicionarOutroProduto(carrinho);
                });
            });
        });
    });
}

function adicionarBicicleta(carrinho: CarrinhoDeCompras<Produto>) {
    rl.question("Digite o modelo da bicicleta: ", (modelo) => {
        rl.question("Digite o tamanho do aro da bicicleta: ", (tamanhoInput) => {
            const tamanhoAro = parseFloat(tamanhoInput);
            rl.question("Digite o fabricante da bicicleta: ", (fabricante) => {
                rl.question("Digite o valor da bicicleta: ", (valorInput) => {
                    const valor = parseFloat(valorInput);
                    const bicicleta = new Bicicleta(modelo, tamanhoAro, fabricante, valor);
                    carrinho.adicionarProduto(bicicleta);
                    console.log("Produto adicionado ao carrinho.");
                    adicionarOutroProduto(carrinho);
                });
            });
        });
    });
}

function adicionarOutroProduto(carrinho: CarrinhoDeCompras<Produto>) {
    rl.question("Deseja adicionar outro produto? (sim/não): ", (resposta) => {
        if (resposta.toLowerCase() === 'sim') {
            adicionarProduto(carrinho);
        } else {
            carrinho.exibirCarrinho();
            rl.close();
        }
    });
}

const carrinho = new CarrinhoDeCompras<Produto>();
adicionarProduto(carrinho);