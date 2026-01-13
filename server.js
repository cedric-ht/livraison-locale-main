// server.js
const express = require('express');
const Stripe = require('stripe');
const cors = require('cors');

const app = express();
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);


// Middleware
app.use(cors());
app.use(express.json());

// Endpoint Stripe
app.post('/create-checkout-session', async (req, res) => {
  const { line_items } = req.body;
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items,
      mode: 'payment',
      success_url: 'http://localhost:3000/success.html',
      cancel_url: 'http://localhost:3000/cancel.html'
    });
    res.json({ id: session.id });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: e.message });
  }
});

// Servir fichiers statiques
app.use(express.static('.'));

// Lancer le serveur
app.listen(3000, () => console.log('Serveur lancé : http://localhost:3000'));
