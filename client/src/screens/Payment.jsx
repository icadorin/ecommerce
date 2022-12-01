import React, { useState, useEffect, useRef } from 'react';
import Container from '../components/Container';

const Payment = () => {
  const [paid, setPaid] = useState(false);
  const [loaded, setLoaded] = useState(false);

  let paypalRef = useRef();

  const product = {
    price: 15.70,
    description: "Produto teste",
  };

  useEffect(() => {
    const script = document.createElement("script");
    const id = "ARrMsMjSArAymJP3FMTWxE7rws9Dw_3qKWMuIKWL7VYJiaq4oZ3QvZGSh_tu7NenH9arHaIz4FK85GNM";
    script.scr = `https://www.paypal.com/sdk/js?currency=BRL&client-id=${id}`;

    script.addEventListener('load', () => setLoaded(true));
    document.body.appendChild(script);

    if (loaded) {
      function loadButtonAndLogic() {
        setTimeout(() => {
          window.paypal
          .Buttons({
            createOrder: (data, actions) => {
              return actions.order.create({
                purchase_units: [
                  {
                    description: product.description,
                    amount: {
                      currency_code: "BRL",
                      value: product.price
                    }
                  }
                ]
              });
            },
            onApprove: async (_, actions) => {
              const order = await actions.order.capture();

              setPaid(true);

              console.log(order);
            }
          })
          .render(paypalRef);
        })
      }
      loadButtonAndLogic();
    }
  });

  return (
    <Container>
        {paid ? (
          <div>
            <h1>A compra foi realizada com sucesso!</h1>
          </div>
        ) : (
          <>
          <h1>{product.description} por R${product.price}</h1>
          <div ref={v => (paypalRef = v)} />
          </>
        )}
    </Container>
  );
}

export default Payment;
