const order = require('../models/orders.model')
exports.addorder = async (req, res) => {
    try {
        let { produect } = req.body
        // const Orders = await order.find({_id: produect });
        const Orders = await order.find({ produect });
        // console.log(produect);
        
        console.log(req.body);
        
        let Order=false
        // if (!Orders[0].received) {}
            Order = await order.findOneAndUpdate({ produect,received:false ,Isdeleted:true}, { $inc: { qty: 1 } }, { new: true });

        

        if (Order) {
            // const newQty = qty + 1;
         

            res.status(200).json(Order);
        }
        else {
            const Order = await order.create(req.body);
            res.status(201).json(Order);
        }

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

exports.getcart = async (req, res) => {
    const { userid } = req.body

    console.log(req.body);

    const CartOrders = await order.find({ userid }).populate('produect');
    // if (user) {}
    res.status(200).json(CartOrders)
}
exports.deleteOrderById = async (req, res) => {
    const { data } = req.body;
    

    // if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    //   return res.status(400).json({ message: 'Invalid Order ID' });
    // }
   try {
       await order.findByIdAndUpdate(data, { Isdeleted: true }, { new: true });
   
           res.status(200).json({deleted:"is deleted"});
       } catch (err) {
           res.status(500).json({ error: err.message });
       }
}
exports.getadmin = async (req, res) => {


    const CartOrders = await order.find().populate('produect').populate('userid');
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
        const updatedOrder = await order.findByIdAndUpdate(id, { received: !newreceived }, { new: true });
        const CartOrders = await order.find().populate('produect').populate('userid');

        res.status(200).json(CartOrders);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}  