const express = require('express');
const connectDB = require('./config/db.config');
const userTypeRouter = require('./routers/userType.router');
const userRouter = require('./routers/user.router');
const productRouter = require('./routers/product.router');
const cartRouter = require('./routers/cart.router');
const orderRouter = require('./routers/order.router');
const categoryRouter = require('./routers/category.router');
const cors=require('cors');
const port = 3000;
const app = express();
app.use(express.json());
connectDB();
// app.use(cors({origin:'http://localhost:4200'}));
const corsOptions = {
    origin: "*", // React و Angular
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type,Authorization",
  };
  
  app.use(cors(corsOptions));
app.use("/imgs",express.static('imgs'));
app.use('/userType',userTypeRouter);
app.use('/user',userRouter);
app.use('/product',productRouter);
app.use('/cart',cartRouter);
app.use('/order',orderRouter);
app.use('/category',categoryRouter);

app.listen(port, ()=> console.log(`server started at port: ${port}`));