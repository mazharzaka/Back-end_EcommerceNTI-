const order = require('../models/orders.model')

exports.addorder = async (req, res) => {
    try {
        // let { produect } = req.body
        // const Orders = await order.find({_id: produect });
        const Orders = await order.find({userid:req.user.userId,cartItem: { $elemMatch: { productId: req.body.productId } } });
        console.log(Orders);
        console.log(req.body);



    
        if (Orders.length > 0) {
            // const newQty = qty + 1;
           const Order = await order.findOneAndUpdate({ userid:req.user.userId,cartItem: { $elemMatch: { productId: req.body.productId ,received: false, Isdeleted: false} },  }, { $inc: { "cartItem.$.qty": 1 } }, { new: true });
       

console.log(Order);

            res.status(200).json(Order);
        }
        else {
                
                const Orders = await order.findOneAndUpdate({userid:req.user.userId}, { $push: { cartItem: req.body } },  { new: true })
                
                if (Orders) {
                    // const newQty = qty + 1;
        
        
                    res.status(200).json(Orders);
                }
                else{
            let result = new order({
                userid: req.user.userId,
                cartItem: [req.body],
                
            });
            //   calcTotalPrice(result);
            await result.save();
            return res.status(201).json(result);}
        }

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

exports.getcart = async (req, res) => {
    const { userid } = req.body

    // console.log(req.body);

    const CartOrders = await order.find({ userid }).populate('cartItem.productId');
    // if (user) {}
    res.status(200).json(CartOrders)
}
exports.deleteOrderById = async (req, res) => {
    const { productId,userid } = req.body;

console.log(productId);

    // if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    //   return res.status(400).json({ message: 'Invalid Order ID' });
    // }
    try {
    await order.findOneAndUpdate({ userid:userid,cartItem: { $elemMatch: { productId: productId,received: false, Isdeleted: false} },  }, {"cartItem.$.Isdeleted": true } , { new: true });

        res.status(200).json({ deleted: "is deleted" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}
exports.getadmin = async (req, res) => {


    const CartOrders = await order.find().populate('cartItem.productId').populate('userid');
    // if (user) {}
    res.status(200).json(CartOrders)
}
exports.updateOrderById = async (req, res) => {
    const { id } = req.body;

    const test = await order.find({ _id: id });
    // console.log(test[0].status);
    const newstatus = test[0].status;

    try {
        const updatedOrder = await order.findByIdAndUpdate(id, { status: !newstatus }, { new: true });
        const CartOrders = await order.find().populate('produect').populate('userid');

        res.status(200).json(CartOrders);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}
exports.received = async (req, res) => {
    const { id } = req.body;

    const test = await order.find({ _id: id });
    // console.log(test[0].status);
    const newreceived = test[0].received;

    try {
 await order.findByIdAndUpdate(id, { received: !newreceived }, { new: true });
        const CartOrders = await order.find().populate('produect').populate('userid');

        res.status(200).json(CartOrders);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}
exports.qty = async (req, res) => {
    const { productId,userid ,qty} = req.body;

    try {
        const updatedOrder= await order.findOneAndUpdate({ userid:userid,cartItem: { $elemMatch: { productId: productId,received: false, Isdeleted: false} },  }, {"cartItem.$.qty": qty } , { new: true });

        res.status(200).json(updatedOrder);

    }
    catch(err){
        res.status(500).json({ error: err.message });

    }
}