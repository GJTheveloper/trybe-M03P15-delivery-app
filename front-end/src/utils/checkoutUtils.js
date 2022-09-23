import { saveLocalStorage } from './localStorage';

const updateCartTotal = (totalPrior, value, action) => {
/* action se trata da ação de adicionar ou remover uma unidade ao carrinho na pagina
de produtos, com as strings add ou deduct  */
  const sum = totalPrior + value;
  const subtraction = totalPrior - value;

  const total = action === 'add' ? sum : subtraction;
  if (total < 0) {
    return 0;
  }
  return total;
};

const addOrderToStorage = (orderObj, products) => {
  const productsList = products.map(({ name, qtd }) => ({ id: name, quantity: qtd }));
  const order = { ...orderObj, products: productsList };
  saveLocalStorage('order', order);
};

export { updateCartTotal, addOrderToStorage };
