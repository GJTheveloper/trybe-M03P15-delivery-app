import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import loginSchema from '../JOI/emailJoi';
// import { wrongEmailOrPassword } from '../utils/toast';
import { getLocalStorage, saveLocalStorage } from '../utils/localStorage';

export default function FormLogin() {
  const navigate = useNavigate();

  const [userLogin, setUserLogin] = useState({ email: '', password: '', name: '' });
  const [errorMessage, setErrorMessage] = useState(null);
  const [isDisable, setIsDisable] = useState(true);
  const [loggedUser, setLoggedUser] = useState(null);

  const handleChange = ({ target: { name, value } }) => {
    setUserLogin((prevState) => ({ ...prevState, [name]: value }));
  };

  const validateForm = () => {
    const validationRegEx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordMinLength = 6;
    return (validationRegEx.test(userLogin.email)
      && (userLogin.password.length >= passwordMinLength));
  };

  const enableButton = () => {
    if (validateForm()) {
      setIsDisable(false);
    }
    if (!validateForm()) {
      setIsDisable(true);
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => enableButton(), [
    isDisable,
    userLogin.password,
    userLogin.email,
  ]);

  const loginUser = () => {
    axios({
      method: 'post',
      url: 'http://localhost:3001/login',
      data: {
        email: userLogin.email,
        password: userLogin.password,
      },
    }).then(
      (response) => {
        saveLocalStorage('user', response.data);
        setLoggedUser(response.data);
      },
    ).catch((error) => {
      setErrorMessage(error.response.data.message);
    });
  };

  const enterUser = () => {
    const { role } = getLocalStorage('user');// mudar para verificar o banco
    if (role === 'customer') navigate('/customer/products');
    if (role === 'seller') navigate('/seller/orders');
    if (role === 'admin') navigate('/admin/manage');
  };

  useEffect(() => {
    enterUser();
  }, [loggedUser]);

  const handleClickLogin = (event) => {
    event.preventDefault();

    // ------valida com JOI os campos de login----//
    const { error } = loginSchema.validate(userLogin);
    if (error) {
      setErrorMessage(error.message);
      // wrongEmailOrPassword(error.message);
    } else {
      // ---- verificar os dados no banco ---//
      loginUser();
    }
  };

  const goRegisterPage = () => {
    navigate('/register');
  };

  return (
    <div>
      {
        errorMessage
          ? (
            <div>
              <span data-testid="common_login__element-invalid-email">
                {errorMessage}
              </span>
              <button
                type="button"
                onClick={ (e) => {
                  e.preventDefault();
                  setErrorMessage(null);
                  navigate('/');
                } }
              >
                voltar
              </button>
            </div>
          )
          : (
            <>
              <form>
                <input
                  id="email"
                  name="email"
                  onChange={ handleChange }
                  placeholder="Digite seu email"
                  data-testid="common_login__input-email"
                />
                <input
                  type="password"
                  id="password"
                  name="password"
                  onChange={ handleChange }
                  placeholder="Digite sua senha"
                  data-testid="common_login__input-password"
                />
              </form>
              <button
                name="login"
                type="submit"
                disabled={ isDisable }
                onClick={ handleClickLogin }
                data-testid="common_login__button-login"
              >
                Login
              </button>
              <button
                type="button"
                onClick={ goRegisterPage }
                name="register"
                data-testid="common_login__button-register"
              >
                Ainda não tenho conta
              </button>
            </>
          )
      }
    </div>
  );
}
