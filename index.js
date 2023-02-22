const express = require('express')
const bodyparser = require('body-parser')
const user = require('./controllers/user/user')
const item = require('./controllers/item/item')
const order = require('./controllers/order/order')
const cart = require('./controllers/cart/cart')
const payment = require('./controllers/payment/payment')
const path = require('path')
const app = express()
const route = express.Router();

const port = process.env.PORT || 3000

app.use(bodyparser.urlencoded({ extended: false }))
app.use(bodyparser.json())

// View Engine Setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.post('/pay', payment.pay)
app.get('/', function(req, res) {
        res.render('Home', {
            key: Publishable_Key
        })
    })
    //routes
app.get("/user", user.getAll);
app.get("/user/:id", user.get);
app.get("/user_search", user.search);
app.post("/user", user.save);
app.put("/user/:id", user.update);
app.delete("/user/:id", user.delete);
app.get("/item", item.getAll);
app.get("/item/:id", item.get);
app.get("/item_search", item.search);
app.post("/item", item.save);
app.put("/item/:id", item.update);
app.delete("/item/:id", item.delete);
app.get("/order", order.getAll);
app.get("/order/:id", order.get);
app.get("/order_search", order.search);
app.post("/order", order.save);
app.put("/order/:id", order.update);
app.delete("/order/:id", order.delete);
app.get("/cart", cart.getAll);
app.get("/cart/:id", cart.get);
app.get("/cart_search", cart.search);
app.post("/cart", cart.save);
app.put("/cart/:id", cart.update);
app.delete("/cart/:id", cart.delete);


app.listen(port, function(error) {
    if (error) throw error
    console.log("Server created Successfully")
})