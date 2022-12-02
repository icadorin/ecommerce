import React, { useState, useEffect, useRef } from 'react';
import Container from '../components/Container';

const Payment = () => {
  const [paid, setPaid] = useState(false);
  const [loaded, setLoaded] = useState(false);

  let paypalRef = useRef();

  const product = {
    price: 15.70,
    description: "Produto teste pagamento"
  }

  useEffect(() => {
    const script = document.createElement("script");
    const id = "ARrMsMjSArAymJP3FMTWxE7rws9Dw_3qKWMuIKWL7VYJiaq4oZ3QvZGSh_tu7NenH9arHaIz4FK85GNM";
    script.src = `https://www.paypal.com/sdk/js?currency=BRL&client-id=${id}`;

    script.addEventListener("load", () => setLoaded(true));

    document.body.appendChild(script);

    if (loaded) {
      function loadButtonsAndLogic() {
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
            onApprove: async(_, actions) => {
              const order = await actions.order.capture();

              setPaid(true);

              console.log(order);
            }
          })
          .render(paypalRef);
        })
      }
      loadButtonsAndLogic();
    }
  })

  return (
    <Container>
      <div className='box-payment'>
        {paid ? (
          <div>
            <h1>Compra realizada com sucesso!</h1>
          </div>
        ) : (
          <div className='div-payment'>
            <h1>{product.description} por R$ {product.price}</h1>
            <div ref={v => (paypalRef = v)} />
          </div>
        )}
      </div>
    </Container>
  );
}

export default Payment;
