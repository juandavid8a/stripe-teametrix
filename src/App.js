import React from "react";
import "./styles.css";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

export default function App() {
  const [product] = React.useState({
    name: "Tesla Roadster",
    price: 64234.67
  });

  async function handleToken(token, addresses) {
    console.log({ token });
    const response = await axios.post(
      "https://631jb.sse.codesandbox.io/checkout",
      {
        token,
        product
      }
    );
    const { status } = response.data;
    if (status === "success") {
      toast("success! check email for details", { type: "success" });
    } else {
      toast("Something went wrong", { type: "error" });
    }
  }

  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      <StripeCheckout
        stripeKey="pk_test_MyxBb6jb68TVcQNIzZMevLCD"
        token={handleToken}
        billingAddress
        shippingAddress
        amount={product.price * 100}
        name={product.name}
      />
    </div>
  );
}
