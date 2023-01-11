import React from 'react';
import Container from '../components/Container';
import Input from '../components/Input';
import Button from '../components/Buttons';

const Login = () => {
  return (
    <Container>
      <div className='login-container'>
        <div className='login-box'>
          <div className='div-login'>
            <h2 className='sing-up-desc'>Login</h2>
            <Input
              type={'email'}
              onBlur={'E-mail'}
            />
            <Input
              type={'password'}
              onBlur={'Senha'}
            />
            <div className='box-login-button'>
              {/* <Button
                css='sing-in'
                onClick={(e)=>}
                children='Entrar'
              /> */}
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default Login;
