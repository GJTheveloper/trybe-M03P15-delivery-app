import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Loader from '../components/loader/Loader';
import NavBar from '../components/navbar/NavBar';
import OrderCard from '../components/orderCards/OrderCard';
import { getLocalStorage } from '../utils/localStorage';

export default function Orders() {
  const [orders, setOrders] = useState([]);
  // Estado para Loading
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Função para retornar usuário não autorizado para a página da login
  // Também limpa local storage
  async function handleNavigateLogin() {
    removeKeyLocalStorage('cart');
    removeKeyLocalStorage('user');
    navigate('/login', { replace: false });
  }

  // Função para fazer fetch no endpoit GET /products e salvar os produtos no estado products
  // Caso retorne QUALQUER erro, retireciona para página de Login
  const getOrders = async (token) => {
    // Constante com configuração básica do Axios com o token no header
    const config = {
      headers: { Authorization: token },
    };

    // Utilizando uma GET na rota com as configurações prévias. Caso retorne sucesso, armazena os
    // dados no estado products;
    axios.get('http://localhost:3001/sales', config).then(
      (response) => setOrders(response.data),
    ).catch((e) => {
      console.log(`erro => ${e}`);
      // No caso de qualquer erro, redireciona para página de Login
      // handleNavigateLogin();
    });
  };

  // UseEffect!
  useEffect(() => {
    // Resgata dados do usuário do local storage na chave 'user'
    const userData = getLocalStorage('user');
    // Caso não haja token armazenado, redireciona para página de login.
    if (!userData.token) {
      handleNavigateLogin();
    } else {
      // Caso haja token, utiliza ele na função getProducts, para realizar a chamada no backend
      getOrders(userData.token);
      // Ocorrendo tudo certo, finaliza setando o estado de loading para false.
      setLoading(false);
    }
  }, []);
  // IGNORAR AVISO DO LINT

  // Caso o estado loading seja verdadeiro, a página exibe apenas o componente Loader
  // No caso é apenas uma div com mensagem "Carregando..."
  if (loading) {
    return (
      <Loader />
    );
  }

  // Função que gera os cartões conforme tamanho do array armazenado em products
  const generateOrders = () => {
    if (orders.length > 0) {
      return (orders.map(
        (order) => <OrderCard order={ order } key={ order.id } />,
      ));
    }

    return (<p>Não há pedido para ser exibido.</p>);
  };

  return (
    <>
      <NavBar />
      <main>
        {generateOrders()}
      </main>
    </>
  );
}
