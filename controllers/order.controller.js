const Cart = require("../models/cart.model");
const Order = require("../models/order.model");

exports.CheckOut = async (req, res) => {
const { userid } = req.body;
const cart = await Cart.findOne({ userid})
if (!cart) {
    return res.status(400).json({ error: "Cart is empty" });
}

try{
const order = new Order({
    userId: userid,
    items: cart.cartItem,
    totalPriceOrder: cart.totalPriceCart,
});
await order.save();
await Cart.findOneAndDelete({ userid });

res.status(201).json(order);}
catch(err) {
    res.status(500).json({ error: err.message })}

}
exports.getMyOrders = async (req, res) => {
    try {
      const userId = req.body.userid;
      const orders = await Order.find({ userId }).populate(
        "items.productId"
      );
      console.log(orders);
      
      res.status(200).json(orders);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };