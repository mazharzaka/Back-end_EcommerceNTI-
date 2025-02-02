const order = require('../models/orders.model')

exports.addorder = async (req, res) => {
    try {
        // let { produect } = req.body
        // const Orders = await order.find({_id: produect });
        // const Orders = await order.find({userid:req.user.userId,cartItem: { $elemMatch: { productId: req.body.productId } } })
        const Order = await order.findOneAndUpdate({ userid:req.user.userId,cartItem: { $elemMatch: { productId: req.body.productId ,received: false, Isdeleted: false ,CheckOut:false} },  }, { $inc: { "cartItem.$.qty": 1 } }, { new: true });
        if (Order) {
            // const newQty = qty + 1;

           res.status(200).json(Order);
          
            
        }
        else {
                
                const Orders = await order.findOneAndUpdate({userid:req.user.userId}, { $push: { cartItem: req.body } },  { new: true })
                
                if (Orders) {
                    // const newQty = qty + 1;
                    console.log(2)
        
        
                    res.status(200).json(Orders);
                }
                else{
            let result = new order({
                userid: req.user.userId,
                cartItem: [req.body],
                
            });
            //   calcTotalPrice(result);
            console.log(3);
            
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

// console.log(productId);

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
exports.updateOrderstatus = async (req, res) => {
    const { status,userid } = req.body;
    console.log(status,userid);
    
   

    try {
        // const { userid } = req.body
        const Orders = await order.findOneAndUpdate(
            { userid }, 
            {
              $set: {
              "cartItem.$[].status": status 
              }
            },
            { new: true }
          );
          console.log(Orders);
          
          res.status(200).json(Orders)
    } catch (err) {
        res.status(500).json({ error: err.message });
    }}

exports.qty = async (req, res) => {
    const { productId,userid ,qty} = req.body;

    try {
        const updatedOrder= await order.findOneAndUpdate({ userid:userid,cartItem: { $elemMatch: { productId: productId,CheckOut:false,received: false, Isdeleted: false} },  }, {"cartItem.$.qty": qty } , { new: true });

        res.status(200).json(updatedOrder);

    }
    catch(err){
        res.status(500).json({ error: err.message });

    }
}
exports.checkOut = async (req, res) => {
    try {
       const { userid } = req.body
        const Orders = await order.findOneAndUpdate(
            { userid }, 
            {
              $set: {
              "cartItem.$[].CheckOut": true 
              }
            },
            { new: true }
          );
        // if (user) {}
        res.status(200).json(Orders)
    } catch (err) {
        res.status(500).json({ error: err.message });
    } 
}