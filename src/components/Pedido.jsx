
import {useState} from 'react'

// ARRAY DE OBJETOS CONTENDO O ESTADO INICIAL DO CARDÁPIO
const cardapio = [
    {id:1,nome:"Combo-01",preco:25.00,disponivel:false,quantidade:0} ,
    {id:2,nome:"Combo-02",preco:35.00,disponivel:true,quantidade:0},
    {id:3,nome:"Combo-03",preco:45.00,disponivel:false,quantidade:0},
    {id:4,nome:"Combo-04",preco:55.00,disponivel:true,quantidade:0},
];

const Pedido = () => {
  //Hook - useState - Manipula o estado da variável
  //Estados para gerenciar a lista de itens do cardápio
  const [items,setItens] = useState(cardapio);
  const [status,setStatus] = useState("");
  const [enviar,setEnviar] = useState(false);

  //VALOR FIXO ADICIONADO AO TOTAL QUANDO TIVER NO CARRINHO
  const taxaEntrega = 5.00;

  //FUNCAO QUE ALTERA A QUANTIDADE DO PEDIDO
  const AlterarQuantidade = (id, valor) =>{
    setItens(alt=>
        //MAP: CRIA UM NOVO ARRAY E PERCORRE OS ITEMS SEM MODIICAR O ORIGINAL (IMUTABILIDADE)
        //TERNARIO : VERIFICA SE O ITEM DA ITERACAO ATUAL É O QUE DEVE SER ALTERADO
        //SPREAD(...item) - MANTEM OS VALORES ANTIGOS E ADICIONA OS NOVOS
        //Math.max: OBJETO QUE GARANTE QUE A  QUANTIDADE NUNCA SERA MAIOR QUE 0
        alt.map(item=>
            item.id === 0 ? {...item, quantidade:Math.max(0, item.quantidade + valor)} : item
        )


        
    )
  }

  //FILTER: SELECIONA APENAS OS PRODUTOS DISPONIVEIS NO CARRINHO
  const produtosDisponiveis = items.filter(item => item.disponivel);
  const carrinho = items.filter(item => item.quantidade > 0);

  //REDUCE: CALCULA SOMA DOS ITEMS (PRECO * QUANTIDADE)
  const subTotal = carrinho.reduce((ac, item) => ac + item.preco * item.quantidade, 0)
  const total = subTotal > 0 ? subtotal + taxaEntrega : 0

  //SIMULACAO DO CICLO DE VIDA DA ENTREGA USANDO TEMPORIZADOR ASSÍNCRONO 
  const ConfirmarPedido=()=>{
    setEnviar(true)
    setStatus("Restaurante confirmou seu Pagamento. Preoparando seu Pedido...")
    setTimeout(()=> {
        setStatus("Seu Pedido saiu para a entrega")
        setEnviar(false)
    },5000) // 5 segundos

    setTimeout( () => {
        setStatus("Código Confirmado. Seu Pedido foi Entregye com sucesso")
        setEnviar(false)
    }, 10000) //10 segundos

  }
  return (
    <>
      
    </>
  )
}

export default Pedido
