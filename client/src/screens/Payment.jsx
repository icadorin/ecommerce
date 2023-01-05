import React, { useState, useEffect, useRef } from 'react';
import { useParams } from "react-router-dom";
import Container from '../components/Container';
import useApi from '../hooks/useApi';

const Payment = () => {
  const [product, setProduct] = useState([]);
  const [paid, setPaid] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const { id } = useParams();
  let paypalRef = useRef();

  useEffect(() => {
    const fetchproduct = async () => {
      const { data } = await useApi.get(`product/${id}`);
      setProduct(data);
    };
    fetchproduct();
  }, []);

  const formatPrice = product.price ? product.price.
    toLocaleString(
      'pt-br', { style: 'currency', currency: 'BRL' }
    ) : (
      ''
    );

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
              onApprove: async (_, actions) => {
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
            <h1 className='success'>Compra realizada com sucesso!</h1>
          </div>
        ) : (
          <div className='div-payment'>
            <h1 className='payment-desc'>{product.description}</h1>
            <h1 className='payment-price'>
              {formatPrice}
            </h1>
            <div className='paypal-buttons' ref={v => (paypalRef = v)} />
          </div>
        )}
      </div>
    </Container>
  );
}

export default Payment;
