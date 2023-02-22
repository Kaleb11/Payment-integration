const {
    user,
    order,
    Sequelize
} = require("./../../models");
const bcrypt = require('bcrypt');
const Op = Sequelize.Op;
const dotenv = require('dotenv');
dotenv.config();
var Publishable_Key = process.env.Publishable_Key
var Secret_Key = process.env.Secret_Key

const stripe = require('stripe')(Secret_Key)
let self = {};
self.pay = async(req, res) => {

    let amount = req.body.amount
    let cardNumber = req.body.cardNumber
    try {
        const paymentMethod = await stripe.paymentMethods.create({
            type: "card",
            card: {
                number: cardNumber,
                exp_month: 12,
                exp_year: 2023,
                cvc: "123"
            }
        });

        const paymentIntent = await stripe.paymentIntents.create({
            payment_method: paymentMethod.id,
            amount: amount * 100,
            currency: "usd",
            confirm: true,
            description: "The payment"
        });
        console.log("The payment", paymentIntent.status)
        return res.send(paymentIntent.status)
    } catch (error) {
        console.error(error);
        return error;
    }

}
module.exports = self;