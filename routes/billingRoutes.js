const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);
const requireLogin = require('../middlewares/requireLogin');

module.exports = app => {
  app.post('/api/stripe', requireLogin, async (req, res) => {
    try {
      const { amount } = req.body;
      console.log(amount);
      const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency: 'eur'
      });

      req.user.credits += 5;
      const user = await req.user.save();

      res.status(200).send({ client: paymentIntent.client_secret, user });
    } catch (err) {
      console.log(error);
      res.status(500).json({ statusCode: 500, error });
    }
  });
};
