const express = require("express");
const router = express.Router();
const dotenv = require("dotenv");
dotenv.config(); // kullanabilmemi sağlıyor(process.env)
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

router.post("/", async (req, res) => {
  const { products, user, cargoFee } = req.body;
  const lineItems = products.map((product) => ({
    price_data: {
      currency: "usd",
      product_data: {
        name: product.name
      },
      unit_amount: Math.round(product.price * 100),
    },  
    quantity: product.quantity
  }))
  if(cargoFee !== 0) {
    lineItems.push({
      price_data: {
        currency: "usd",
        product_data: {
          name: 'Kargo ücreti'
        },
        unit_amount: cargoFee * 100
      },
      quantity: 1
    })
  }
  try {
    const session = await stripe.checkout.sessions.create({
      customer_email: user.email,
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${process.env.CLIENT_DOMAIN}/success`
    })
    //res status ok ise dbye kayıt edersin ve olay biteeeeer
    res.status(200).json({ id: session.id });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
    console.log(err);
  }
});

module.exports = router;
