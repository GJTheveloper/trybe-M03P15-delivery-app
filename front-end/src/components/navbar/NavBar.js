import React, { useEffect, useState } from 'react';
import { getLocalStorage } from '../../utils/localStorage';
import LinkButton from './LinkButton';

export default function NavBar() {
  const [username, setUsername] = useState('');
  const [role, setRole] = useState('');

  useEffect(() => {
    const userData = getLocalStorage('user');
    setUsername(userData.name);
    setRole(userData.role);
  }, []);

  const customerNav = (
    <>
      <div>
        <LinkButton
          linkTo="/customer/products"
          buttonId="customer_products__element-navbar-link-products"
          buttonName="PRODUTOS"
        />
        <LinkButton
          linkTo="/customer/orders"
          buttonId="customer_products__element-navbar-link-orders"
          buttonName="MEUS PEDIDOS"
        />
      </div>
      <div>
        <div data-testid="customer_products__element-navbar-user-full-name">
          {username}
        </div>
        <LinkButton
          linkTo="/"
          buttonId="customer_products__element-navbar-link-logout"
          buttonName="Sair"
          logout
        />
      </div>
    </>
  );

  const sellerNav = (
    <>
      <div>
        <LinkButton
          linkTo="/seller/orders"
          buttonId="customer_products__element-navbar-link-orders"
          buttonName="PEDIDOS"
        />
      </div>
      <div>
        <div
          data-testid="customer_products__element-navbar-user-full-name"
        >
          {username}
        </div>
        <LinkButton
          linkTo="/"
          buttonId="customer_products__element-navbar-link-logout"
          buttonName="Sair"
          logout
        />
      </div>
    </>
  );

  const defineNav = () => {
    if (role === 'seller') {
      return sellerNav;
    }
    return customerNav;
  };

  return (
    defineNav()
  );
}
