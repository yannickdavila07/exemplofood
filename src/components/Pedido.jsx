import { useState } from "react";

// ARRAY DE OBJETOS CONTENDO O ESTADO INICIAL DO CARDÁPIO
const cardapio = [
    { id: 1, nome: "Combo-01", preco: 25.00, disponivel: false, quantidade: 0 },
    { id: 2, nome: "Combo-02", preco: 35.00, disponivel: true, quantidade: 0 },
    { id: 3, nome: "Combo-03", preco: 45.00, disponivel: false, quantidade: 0 },
    { id: 4, nome: "Combo-04", preco: 55.00, disponivel: true, quantidade: 0 },
];

const Pedido = () => {

    // HOOK - useState - Manipula o estado variavel
    // Estados para gerenciar a lita de items do cardapio

    const [items, setItems] = useState(cardapio);
    const [status, setStatus] = useState("");
    const [enviar, setEnviar] = useState(false);

    // VALOR FIXO ADICIONADO AO TOTAL QUANDO TIVER NO CARRINHO
    const taxaEntrega = 5.00;

    // FUNÇÃO QUE ALTERA A QUANTIDADE DO PEDIDO
    const AlterarQuantidade = (id, valor) => {
        setItems(alt =>
            // MAP: cria um novo array e percorre os itens sem modificar o original (IMUTABILIDADE)
            // TERNARIO: verifica se o item da iteração atual é o que deve ser alterado
            // SPREED{...}: mantém os valores antigos e adiciona os novos
            // MATH.MAX: Objeto que garante que a quantidade nunca será maior que 0

            alt.map(item =>
                item.id === id ? { ...item, quantidade: Math.max(0, item.quantidade + valor) } : item
            )
        )
    }

    // FILTER: Selecione apenas os produtos disponíveis no carrinho
    const produtosDisponiveis = items.filter(item => item.disponivel);
    const carrinho = items.filter(item => item.quantidade > 0);

    // REDUCE: Calcula soma dos items(preco * quantidade) e adiciona a taxa de entrega
    const subTotal = carrinho.reduce((ac, item) => ac + item.preco * item.quantidade, 0);
    const total = subTotal > 0 ? subTotal + taxaEntrega : 0;

    // SIMULAÇÃO DO CICLO DE VIDA DA ENTREGA USANDO TEMPORIZADOR ASSINCRONO
    const ConfirmarPedido = () => {
        setEnviar(true)
        setStatus("Restaurante confirmou seu pagamento, Preparando seu pedido...")
        setTimeout(() => {
            setStatus("Seu pedido saiu para entrega")
            setEnviar(false)
        }, 5000) // 5 segundos

        setTimeout(() => {
            setStatus("Código confirmado. Seu pedido foi entregue com sucesso")
            setEnviar(false)
        }, 10000) // 10 segundos
    }

    return (
        <div className="max-w-md mx-auto bg-white shadow-lg rounded-2xl p-6 space-y-6 text-gray-800">

            {/* Cardápio do Restaurante */}
            <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">
                    Cardápio do Restaurante
                </h2>

                <div className="space-y-3">
                    {produtosDisponiveis.map(produto => (
                        <div
                            key={produto.id}
                            className="flex items-center justify-between bg-gray-50 p-3 rounded-xl border border-gray-100"
                        >
                            <span className="font-medium text-gray-700">
                                {produto.nome} <span className="text-sm text-gray-500 font-normal">R$ {produto.preco.toFixed(2)}</span>
                            </span>

                            <div className="flex items-center space-x-3 bg-white px-3 py-1 rounded-lg border border-gray-200 shadow-sm">
                                <button
                                    onClick={() => AlterarQuantidade(produto.id, -1)}
                                    className="text-gray-500 hover:text-red-600 font-bold px-1 transition-colors"
                                >
                                    -
                                </button>

                                <span className="font-semibold text-gray-800 w-4 text-center">
                                    {produto.quantidade}
                                </span>

                                <button
                                    onClick={() => AlterarQuantidade(produto.id, +1)}
                                    className="text-gray-500 hover:text-green-600 font-bold px-1 transition-colors"
                                >
                                    +
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Linha separadora */}
            <hr className="border-gray-200 my-4" />

            {/* Resumo da Entrega */}
            <div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                    Resumo da Entrega
                </h3>

                {carrinho.length === 0 ? (
                    <p className="text-sm text-gray-500 italic bg-gray-50 p-3 rounded-lg text-center">
                        Seu Carrinho está vazio
                    </p>
                ) : (
                    <div className="space-y-4">
                        <ul className="divide-y divide-gray-100 bg-gray-50 rounded-xl p-3 space-y-2">
                            {carrinho.map(item => (
                                <li key={item.id} className="flex justify-between text-sm text-gray-600 pt-2 first:pt-0">
                                    <span>{item.quantidade}x {item.nome}</span>
                                    <span className="font-medium text-gray-800">R$ {(item.preco * item.quantidade).toFixed(2)}</span>
                                </li>
                            ))}
                        </ul>

                        <div className="space-y-1.5 text-sm text-gray-600 px-1">
                            <div className="flex justify-between">
                                <span>Subtotal:</span>
                                <span>R$ {subTotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Taxa de Entrega:</span>
                                <span>R$ {taxaEntrega.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-base font-bold text-gray-900 pt-2 border-t border-gray-100">
                                <span>Total a pagar:</span>
                                <span className="text-emerald-600">R$ {total.toFixed(2)}</span>
                            </div>
                        </div>

                        <button
                            onClick={ConfirmarPedido}
                            disabled={enviar}
                            className={`w-full py-3 px-4 rounded-xl font-medium text-white shadow-md transition-all ${enviar
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-emerald-600 hover:bg-emerald-700 active:scale-[0.99]"
                                }`}
                        >
                            {enviar ? "Enviando..." : "Confirmar Pedido"}
                        </button>
                    </div>
                )}
            </div>

            {/* Status / Alerta */}
            {status && (
                <div className="bg-amber-50 border-l-4 border-amber-400 p-3 rounded-r-lg text-amber-800 text-sm">
                    <strong className="font-semibold">Alerta: </strong> {status}
                </div>
            )}
        </div>
        
    )
}

export default Pedido
