"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var readline = require("readline");
var CarrinhoDeCompras = /** @class */ (function () {
    function CarrinhoDeCompras() {
        this.produtos = [];
    }
    CarrinhoDeCompras.prototype.adicionarProduto = function (produto) {
        this.produtos.push(produto);
    };
    CarrinhoDeCompras.prototype.calcularTotal = function () {
        return this.produtos.reduce(function (total, produto) { return total + produto.valor; }, 0);
    };
    CarrinhoDeCompras.prototype.exibirCarrinho = function () {
        console.log("\nCarrinho de Compras:");
        this.produtos.forEach(function (produto, index) {
            console.log("".concat(index + 1, ". Modelo: ").concat(produto.modelo, ", Fabricante: ").concat(produto.fabricante, ", Valor: R$ ").concat(produto.valor.toFixed(2)));
        });
        console.log("Total: R$ ".concat(this.calcularTotal().toFixed(2)));
    };
    return CarrinhoDeCompras;
}());
var TV = /** @class */ (function () {
    function TV(modelo, resolucao, tamanhoPolegadas, fabricante, valor) {
        this.modelo = modelo;
        this.resolucao = resolucao;
        this.tamanhoPolegadas = tamanhoPolegadas;
        this.fabricante = fabricante;
        this.valor = valor;
    }
    return TV;
}());
var Celular = /** @class */ (function () {
    function Celular(modelo, memoria, fabricante, valor) {
        this.modelo = modelo;
        this.memoria = memoria;
        this.fabricante = fabricante;
        this.valor = valor;
    }
    return Celular;
}());
var Bicicleta = /** @class */ (function () {
    function Bicicleta(modelo, tamanhoAro, fabricante, valor) {
        this.modelo = modelo;
        this.tamanhoAro = tamanhoAro;
        this.fabricante = fabricante;
        this.valor = valor;
    }
    return Bicicleta;
}());
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
function adicionarProduto(carrinho) {
    rl.question("Digite o tipo de produto (TV, Celular, Bicicleta): ", function (tipo) {
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
function adicionarTV(carrinho) {
    rl.question("Digite o modelo da TV: ", function (modelo) {
        rl.question("Digite a resolução da TV: ", function (resolucao) {
            rl.question("Digite o tamanho em polegadas da TV: ", function (tamanhoInput) {
                var tamanho = parseFloat(tamanhoInput);
                rl.question("Digite o fabricante da TV: ", function (fabricante) {
                    rl.question("Digite o valor da TV: ", function (valorInput) {
                        var valor = parseFloat(valorInput);
                        var tv = new TV(modelo, resolucao, tamanho, fabricante, valor);
                        carrinho.adicionarProduto(tv);
                        console.log("Produto adicionado ao carrinho.");
                        adicionarOutroProduto(carrinho);
                    });
                });
            });
        });
    });
}
function adicionarCelular(carrinho) {
    rl.question("Digite o modelo do celular: ", function (modelo) {
        rl.question("Digite a memória do celular: ", function (memoria) {
            rl.question("Digite o fabricante do celular: ", function (fabricante) {
                rl.question("Digite o valor do celular: ", function (valorInput) {
                    var valor = parseFloat(valorInput);
                    var celular = new Celular(modelo, memoria, fabricante, valor);
                    carrinho.adicionarProduto(celular);
                    console.log("Produto adicionado ao carrinho.");
                    adicionarOutroProduto(carrinho);
                });
            });
        });
    });
}
function adicionarBicicleta(carrinho) {
    rl.question("Digite o modelo da bicicleta: ", function (modelo) {
        rl.question("Digite o tamanho do aro da bicicleta: ", function (tamanhoInput) {
            var tamanhoAro = parseFloat(tamanhoInput);
            rl.question("Digite o fabricante da bicicleta: ", function (fabricante) {
                rl.question("Digite o valor da bicicleta: ", function (valorInput) {
                    var valor = parseFloat(valorInput);
                    var bicicleta = new Bicicleta(modelo, tamanhoAro, fabricante, valor);
                    carrinho.adicionarProduto(bicicleta);
                    console.log("Produto adicionado ao carrinho.");
                    adicionarOutroProduto(carrinho);
                });
            });
        });
    });
}
function adicionarOutroProduto(carrinho) {
    rl.question("Deseja adicionar outro produto? (sim/não): ", function (resposta) {
        if (resposta.toLowerCase() === 'sim') {
            adicionarProduto(carrinho);
        }
        else {
            carrinho.exibirCarrinho();
            rl.close();
        }
    });
}
var carrinho = new CarrinhoDeCompras();
adicionarProduto(carrinho);
