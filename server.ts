import express from 'express';
import cors from 'cors';
import { createServer as createViteServer } from 'vite';
import Stripe from 'stripe';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Initialize Stripe lazily or check for key
const getStripe = () => {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) return null;
  return new Stripe(key, {
    apiVersion: '2025-01-27.acacia', // Use a recent version
  });
};

// API Routes
app.post('/api/create-checkout-session', async (req, res) => {
  try {
    const stripe = getStripe();
    if (!stripe) {
      return res.status(500).json({ error: 'Stripe is not configured. Please set STRIPE_SECRET_KEY.' });
    }

    const { priceId } = req.body;
    const effectivePriceId = priceId || process.env.STRIPE_PRICE_ID;

    if (!effectivePriceId) {
       return res.status(400).json({ error: 'Price ID is required. Please set STRIPE_PRICE_ID.' });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: effectivePriceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${req.headers.origin}/?success=true`,
      cancel_url: `${req.headers.origin}/?canceled=true`,
    });

    res.json({ url: session.url });
  } catch (error: any) {
    console.error('Stripe error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Vite Middleware
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // Serve static files in production
    app.use(express.static('dist'));
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
