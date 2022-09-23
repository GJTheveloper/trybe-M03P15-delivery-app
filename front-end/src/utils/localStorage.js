// Remover import do mock após finalização.
import mockedCart from '../mocks/mockLocalStorage';
// Copiando mocked
let mockedCartArray = mockedCart;

export function saveLocalStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

// Método get com opção de pegar dados mockados. Remover opção após finalizar.
export function getLocalStorage(key, mock) {
  // Caso mock === true; retorna dados mockados do carrinho.
  if (mock) {
    return mockedCartArray;
  }
  const getResult = localStorage.getItem(key) || '[]';
  return JSON.parse(getResult);
}

// ------------------- //
// KEY == Nome do produto (name)
// MOCK == true || false - Se deseja utilizar os dados mockados
// REMOVEITEM == true || false - Se deseja remover o produto do carrinho.
export function removeLocalStorage(key, mock, removeItem) {
  // Caso mock === true; retorna dados mockados do carrinho.
  if (removeItem && mock) {
    mockedCartArray = mockedCartArray.filter((product) => product.name !== key);
    return mockedCartArray;
  }
  if (mock && !removeItem) {
    const productIndex = mockedCartArray.map((item) => item.name).indexOf(key);

    if (mockedCartArray[productIndex].qtd === 1) {
      removeLocalStorage(key, true, true);
    } else {
      mockedCartArray[productIndex] = {
        ...mockedCartArray[productIndex],
        qtd: mockedCartArray[productIndex].qtd - 1,
        subtotal: localCart[productIndex].qtd * localCart[productIndex].unitPrice,
      };
    }

    return mockedCartArray;
  }

  // ------------------- //
  // CASO NORMAL
  if (removeItem) {
    let localCart = getLocalStorage('cart', false);
    localCart = localCart.filter((item) => item.name !== key);
    saveLocalStorage('cart', localCart);
  ///
  } else {
    const localCart = getLocalStorage('cart', false);
    const productIndex = localCart.map((item) => item.name).indexOf(key);
    const noProductIndex = -1;
    // Se o produto já existe:
    if (productIndex !== noProductIndex) {
      localCart[productIndex] = {
        ...localCart[productIndex],
        qtd: localCart[productIndex].qtd - 1,
        subtotal: +((
          (localCart[productIndex].qtd - 1) * localCart[productIndex].unitPrice)
          .toFixed(2)),
      };
      saveLocalStorage('cart', localCart);
    }
  }
}

// ------------------- //
// KEY == Nome do produto (name)
// MOCK == true || false - Se deseja utilizar os dados mockados
// REMOVEITEM == true || false - Se deseja remover o produto do carrinho.
export function addLocalStorage(product) {
  const localCart = getLocalStorage('cart', false);
  const productIndex = localCart.map((item) => item.name).indexOf(product.name);
  const noProductIndex = -1;
  // Se o produto já existe:
  if (productIndex !== noProductIndex) {
    localCart[productIndex] = {
      ...localCart[productIndex],
      qtd: localCart[productIndex].qtd + 1,
      subtotal: +((
        (localCart[productIndex].qtd + 1) * localCart[productIndex].unitPrice)
        .toFixed(2)),
    };
  } else {
  // Caso não exista:
    localCart.push({
      id: product.id,
      name: product.name,
      qtd: 1,
      unitPrice: product.price,
      subtotal: product.price,
    });
  }

  saveLocalStorage('cart', localCart);
}

export function updateCartQtd(product, qtd) {
  const localCart = getLocalStorage('cart', false);
  const productIndex = localCart.map((item) => item.name).indexOf(product.name);
  const noProductIndex = -1;
  // Se o produto já existe:
  if (productIndex !== noProductIndex && qtd > 0) {
    localCart[productIndex] = {
      ...localCart[productIndex],
      qtd,
      subtotal: +((
        (qtd) * localCart[productIndex].unitPrice)
        .toFixed(2)),
    };
  } if (productIndex === noProductIndex && qtd > 0) {
    // Caso não exista:
    localCart.push({
      id: product.id,
      name: product.name,
      qtd,
      unitPrice: product.price,
      subtotal: +((
        (qtd) * product.price)
        .toFixed(2)),
    });
  }
  if (qtd === 0) {
    removeLocalStorage(product.name, false, true);
  } else {
    saveLocalStorage('cart', localCart);
  }
}

export function removeKeyLocalStorage(key) {
  localStorage.removeItem(key);
}
