import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import NavBar from '../components/navbar/NavBar';
import ProductCard from '../components/productsCards/ProductCard';
import Loader from '../components/loader/Loader';

import { getLocalStorage } from '../utils/localStorage';
import DeliveryContext from '../context/DeliveryContext';

export default function Products() {
  const [products, setProducts] = useState([]);
  const { cartTotal } = useContext(DeliveryContext);
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

  // Função para encaminhar usuário para página de checkout
  async function handleCheckout() {
    navigate('/customer/checkout', { replace: false });
  }

  // Função para fazer fetch no endpoit GET /products e salvar os produtos no estado products
  // Caso retorne QUALQUER erro, retireciona para página de Login
  const getProducts = async (token) => {
    // Constante com configuração básica do Axios com o token no header
    const config = {
      headers: { Authorization: token },
    };

    // Utilizando uma GET na rota com as configurações prévias. Caso retorne sucesso, armazena os
    // dados no estado products;
    axios.get('http://localhost:3001/products', config).then(
      (response) => setProducts(response.data),
    ).catch(() => {
      handleNavigateLogin();
    });
  };

  // UseEffect!
  useEffect(() => {
    // Resgata dados do usuário do local storage na chave 'user'
    const userData = getLocalStorage('user');
    // Caso não haja token armazenado, redireciona para página de login
    if (!userData.token) {
      handleNavigateLogin();
    } else {
      // Caso haja token, utiliza ele na função getProducts, para realizar a chamada no backend
      getProducts(userData.token);
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
  const generateCards = () => {
    if (products.length > 0) {
      return (products.map(
        (product) => <ProductCard product={ product } key={ product.id } />,
      ));
    }

    return (<p>Não há produto para ser exibido.</p>);
  };

  return (
    <>
      <NavBar />
      <main>
        {generateCards()}
        <button
          type="button"
          data-testid="customer_products__button-cart"
          onClick={ () => handleCheckout() }
          disabled={ Number(cartTotal) === 0 }
        >
          R$
          {' '}
          <span
            data-testid="customer_products__checkout-bottom-value"
          >
            {cartTotal.toString().replace(/\./, ',')}
          </span>
        </button>
      </main>
    </>
  );
}
