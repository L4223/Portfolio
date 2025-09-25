import Stripe from "stripe";

let stripe: Stripe | null = null;

export const getStripe = () => {
  if (!process.env.STRIPE_SECRET_KEY) {
    return null;
  }

  if (!stripe) {
    stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: "2024-06-20"
    });
  }

  return stripe;
};
