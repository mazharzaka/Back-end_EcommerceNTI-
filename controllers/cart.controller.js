const order = require('../models/cart.model');
const productModel = require('../models/product.model');

exports.addorder = async (req, res) => {
    try {
        const userid = req.body.userid;
        console.log(req.body);

        const Order = await order.findOneAndUpdate({ userid: req.body.userid, cartItem: { $elemMatch: { productId: req.body.productId } }, }, { $inc: { "cartItem.$.qty": 1 } }, { new: true });
        if (Order) {
            // const newQty = qty + 1;
            const CartOrders = await order.find({ userid }).populate('cartItem.productId');



            //    console.log(CartOrders);
            const total = CartOrders[0].cartItem.reduce((acc, item) => acc + item.productId.price * item.qty, 0) || 0;

            await order.findOneAndUpdate({ userid }, { totalPriceCart: total }, { new: true });
            res.status(200).json(Order);


        }
        else {

            const Orders = await order.findOneAndUpdate({ userid: req.body.userid }, { $push: { cartItem: req.body } }, { new: true })

            if (Orders) {
                // const newQty = qty + 1;
                console.log(2)

                const CartOrders = await order.find({ userid }).populate('cartItem.productId');


                const total = CartOrders[0]?.cartItem.reduce((acc, item) => acc + item.productId.price * item.qty, 0) || 0;

                await order.findOneAndUpdate({ userid }, { totalPriceCart: total }, { new: true });
                res.status(200).json(Orders);
            }
            else {
                const product = await productModel.findById(req.body.productId);

                console.log(product.price);
                let result = new order({
                    userid: req.body.userid,
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


    if (!CartOrders) return res.status(200).json({ cartItems: [], totalPriceCart: 0 });

    res.status(200).json(CartOrders);


}
// exports.getMyoreders = async (req, res) => {
//     const { userid } = req.body
//     const CartOrders = await order.find({ userid }).populate('cartItem.productId');
//     const orders = CartOrders.map(order => ({
//         ...order,
//         cartItem: order.cartItem.filter(item => item.status === "Delivered"),
//     }))

//     const total = orders[0]?.cartItem.reduce((a, b) => a + b.productId.price * b.qty, 0)
//     await order.findOneAndUpdate({ userid: userid }, { totalPriceOrder: total }, { new: true });
//     console.log(orders);

//     res.status(200).json(orders)
// }
exports.deleteOrderById = async (req, res) => {
    const { productId, userid } = req.body;


    try {
        await order.findOneAndUpdate(
            { userid },
            { $pull: { cartItem: { _id: productId } } }, 
            { new: true }
        );
        
        const updatedOrder = await order.findOne({ userid }).populate('cartItem.productId');
        
        const total = updatedOrder?.cartItem.reduce((acc, item) => acc + item.productId.price * item.qty, 0) || 0;
        
        await order.findOneAndUpdate(
            { userid },
            { totalPriceCart: total },
            { new: true }
        );
        
        res.status(200).json(updatedOrder);
        
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}
// exports.getadmin = async (req, res) => {


//     const CartOrders = await order.find().populate('cartItem.productId').populate('userid');
//     const orders = CartOrders?.map((order) => ({
//         ...order.toObject(),
//         cartItem: order.cartItem.filter((item) => item.status !== "Delivered"),
//     }));


//     res.status(200).json(orders)
// }
// exports.updateOrderstatus = async (req, res) => {
//     const { status, userid ,id} = req.body;
//     console.log(status, userid);



//     try {
//         // const { userid } = req.body
//         const Orders = await order.findOneAndUpdate(
//             { 
//               userid, 
//               "cartItem._id": id, 
//               "cartItem.CheckOut": true,
//               "cartItem.Isdeleted": false
//             },
//             { 
//               $set: { "cartItem.$.status": status }
//             },
//             { 
//               new: true,   
//             //   arrayFilters: [{ "elem._id": id }] 
//             }
//           );
//           const CartOrders = await order.find().populate('cartItem.productId').populate('userid');
//           const orders = CartOrders?.map((order) => ({
//               ...order.toObject(),
//               cartItem: order.cartItem.filter((item) => item.status !== "Delivered"),
//           }));


//           res.status(200).json(orders)
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// }

exports.qty = async (req, res) => {
    const { productId, userid, qty } = req.body;

    console.log(req.body);

    try {
        
        const updatedOrder = await order.findOneAndUpdate({ userid: userid, cartItem: { $elemMatch: { productId: productId } }, }, { "cartItem.$.qty": qty }, { new: true });
        const CartOrders = await order.find({ userid }).populate('cartItem.productId');
        const total = CartOrders[0]?.cartItem.reduce((acc, item) => acc + item.productId.price * item.qty, 0) || 0;
        await order.findOneAndUpdate({ userid }, { totalPriceCart: total }, { new: true });
        res.status(200).json(updatedOrder);

    }
    catch (err) {
        res.status(500).json({ error: err.message });

    }
}
// exports.checkOut = async (req, res) => {
//     try {
//         const { userid } = req.body
//         const Orders = await order.findOneAndUpdate(
//             { userid: userid },
//             {
//                 $set: {
//                     "cartItem.$[].CheckOut": true,
//                     //   "cartItem.$[].status": "Pending" 
//                 }
//             },
//             { new: true }
//         );
//         // if (user) {},cartItem: { $elemMatch: { CheckOut:false,received: false, Isdeleted: false} } 

//         res.status(200).json(Orders)
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// }