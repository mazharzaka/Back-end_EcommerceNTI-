const order = require('../models/orders.model')
const productModel = require('../models/product.model');

exports.addorder = async (req, res) => {
    try {
        // let { productId } = req.body
        const userid = req.user.userId;
        // const Orders = await order.find({_id: produect });
        // const Orders = await order.find({userid:req.user.userId,cartItem: { $elemMatch: { productId: req.body.productId } } })
        // console.log(25);
        const Order = await order.findOneAndUpdate({ userid: req.user.userId, cartItem: { $elemMatch: { productId: req.body.productId, Isdeleted: false, CheckOut: false } }, }, { $inc: { "cartItem.$.qty": 1 } }, { new: true });
        if (Order) {
            // const newQty = qty + 1;
            const CartOrders = await order.find({ userid }).populate('cartItem.productId');

            const orders = CartOrders?.map((order) => ({
                ...order,
                cartItem: order.cartItem.filter((item) => item.status !== "Delivered"),
            }));

            const total = orders[0]?.cartItem.reduce((acc, item) => acc + item.productId.price * item.qty, 0) || 0;
            // console.log(total + '///');

            await order.findOneAndUpdate({ userid }, { totalPriceCart: total }, { new: true });
            res.status(200).json(Order);


        }
        else {

            const Orders = await order.findOneAndUpdate({ userid: req.user.userId }, { $push: { cartItem: req.body } }, { new: true })

            if (Orders) {
                // const newQty = qty + 1;
                console.log(2)

                const CartOrders = await order.find({ userid }).populate('cartItem.productId');

                const orders = CartOrders?.map((order) => ({
                    ...order,
                    cartItem: order.cartItem.filter((item) => item.status !== "Delivered"),
                }));

                const total = orders[0]?.cartItem.reduce((acc, item) => acc + item.productId.price * item.qty, 0) || 0;

                // **تحديث إجمالي السعر لعربة التسوق**
                await order.findOneAndUpdate({ userid }, { totalPriceCart: total }, { new: true });
                res.status(200).json(Orders);
            }
            else {
                const product = await productModel.findById(req.body.productId);
            
                console.log(product.price);
                let result = new order({
                    userid: req.user.userId,
                    cartItem: [req.body],
                    totalPriceCart: product?.price,

                });
                //   calcTotalPrice(result);



                await result.save();
                return res.status(201).json(result);
            }
        }

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

exports.getcart = async (req, res) => {
    const { userid } = req.body

    // console.log(req.body);

    const CartOrders = await order.find({ userid }).populate('cartItem.productId');
    const orders = CartOrders?.map((order) => ({
        ...order,
        cartItem: order.cartItem.filter((item) => item.status !== "Delivered"),
    }));

    const total = orders[0]?.cartItem.reduce((a, b) => a + b.productId.price * b.qty, 0)
    await order.findOneAndUpdate({ userid: userid }, { totalPriceCart: total }, { new: true });
    //    console.log(orders);

    res.status(200).json(orders)
}
exports.getMyoreders = async (req, res) => {
    const { userid } = req.body
    const CartOrders = await order.find({ userid }).populate('cartItem.productId');
    const orders = CartOrders.map(order => ({
        ...order,
        cartItem: order.cartItem.filter(item => item.status === "Delivered"),
    }))

    const total = orders[0]?.cartItem.reduce((a, b) => a + b.productId.price * b.qty, 0)
    await order.findOneAndUpdate({ userid: userid }, { totalPriceOrder: total }, { new: true });
    console.log(orders);

    res.status(200).json(orders)
}
exports.deleteOrderById = async (req, res) => {
    const { productId, userid } = req.body;

    // console.log(productId);

    // if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    //   return res.status(400).json({ message: 'Invalid Order ID' });
    // }
    try {
        await order.findOneAndUpdate({ userid: userid, cartItem: { $elemMatch: { productId: productId, received: false, Isdeleted: false } }, }, { "cartItem.$.Isdeleted": true }, { new: true });

        res.status(200).json({ deleted: "is deleted" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}
exports.getadmin = async (req, res) => {


    const CartOrders = await order.find().populate('cartItem.productId').populate('userid');
    const orders = CartOrders?.map((order) => ({
        ...order.toObject(),
        cartItem: order.cartItem.filter((item) => item.status !== "Delivered"),
    }));
console.log(orders[0]);

    res.status(200).json(orders[0])
}
exports.updateOrderstatus = async (req, res) => {
    const { status, userid ,id} = req.body;
    console.log(status, userid);



    try {
        // const { userid } = req.body
        const Orders = await order.findOneAndUpdate(
            { 
              userid, 
              "cartItem._id": id, 
              "cartItem.CheckOut": true,
              "cartItem.Isdeleted": false
            },
            { 
              $set: { "cartItem.$.status": status }
            },
            { 
              new: true,   
            //   arrayFilters: [{ "elem._id": id }] 
            }
          );
          
        //   console.log(Orders);

        res.status(200).json(Orders)
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

exports.qty = async (req, res) => {
    const { productId, userid, qty } = req.body;

    try {
        const updatedOrder = await order.findOneAndUpdate({ userid: userid, cartItem: { $elemMatch: { productId: productId, CheckOut: false, Isdeleted: false } }, }, { "cartItem.$.qty": qty }, { new: true });

        res.status(200).json(updatedOrder);

    }
    catch (err) {
        res.status(500).json({ error: err.message });

    }
}
exports.checkOut = async (req, res) => {
    try {
        const { userid } = req.body
        const Orders = await order.findOneAndUpdate(
            { userid: userid },
            {
                $set: {
                    "cartItem.$[].CheckOut": true,
                    //   "cartItem.$[].status": "Pending" 
                }
            },
            { new: true }
        );
        // if (user) {},cartItem: { $elemMatch: { CheckOut:false,received: false, Isdeleted: false} } 

        res.status(200).json(Orders)
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}