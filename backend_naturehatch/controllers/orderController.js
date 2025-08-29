const Order = require('../models/order');
const Product = require('../models/productModel');
const User = require('../models/userModel');
const mongoose = require('mongoose');
const nodemailer = require("nodemailer");
const PDFDocument = require('pdfkit');
const fs = require('fs');

// Configure Nodemailer
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

// Send order confirmation email
const sendOrderConfirmationEmail = async (userEmail, orderDetails, invoicePath) => {
  const { _id, products, totalAmount, shippingAddress, paymentMethod, createdAt } = orderDetails;

  const productListHTML = products.map((item, index) => (
    `<li><strong>Product ID:</strong> ${item.productId}<br><strong>Quantity:</strong> ${item.quantity}</li>`
  )).join('');

  const plainTextProducts = products.map((item, index) => (
    `${index + 1}. Product ID: ${item.productId}, Quantity: ${item.quantity}`
  )).join('\n');

  const plainTextContent = `
Thank you for your order with Nature Hatch!

Order ID: ${_id}
Date: ${new Date(createdAt).toLocaleString()}
Payment Method: ${paymentMethod}
Shipping Address: ${shippingAddress}
Products:
${plainTextProducts}
Total Amount: $${totalAmount.toFixed(2)}

If you did not place this order, please contact our support team.
`;

  const htmlContent = `
    <html>
      <body style="font-family: Arial, sans-serif; background-color: #ffffff; padding: 20px; color: #333;">
        <div style="max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2e7d32;">Order Confirmation - Nature Hatch</h2>
          <p>Thank you for your order. Below are your order details:</p>
          <h3 style="color: #43a047;">Order Summary</h3>
          <p><strong>Order ID:</strong> ${_id}</p>
          <p><strong>Date:</strong> ${new Date(createdAt).toLocaleString()}</p>
          <p><strong>Payment Method:</strong> ${paymentMethod}</p>
          <h3 style="color: #43a047;">Shipping Address</h3>
          <p>${shippingAddress}</p>
          <h3 style="color: #43a047;">Products</h3>
          <ul>${productListHTML}</ul>
          <h3 style="color: #43a047;">Total: <span style="color: #2e7d32;">$${totalAmount.toFixed(2)}</span></h3>
          <p style="margin-top: 30px;">We’ll notify you once your order is shipped.</p>
          <hr style="margin-top: 40px;" />
          <p style="font-size: 0.8em; color: #999;">
            This is an automated confirmation email from Nature Hatch.
          </p>
        </div>
      </body>
    </html>
  `;

  const mailOptions = {
    from: `"Nature Hatch" <${process.env.GMAIL_USER}>`,
    to: userEmail,
    subject: 'Nature Hatch - Order Confirmation',
    text: plainTextContent,
    html: htmlContent,
    attachments: [{
      filename: `invoice-${orderDetails._id}.pdf`,
      path: invoicePath,
      contentType: 'application/pdf'
    }]
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Order confirmation email sent successfully');
  } catch (error) {
    console.error('Error sending order confirmation email:', error);
  }
};

// Generate invoice PDF (returns a Promise)
function generateInvoice(order, path) {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ margin: 50 });
    const stream = fs.createWriteStream(path);
    doc.pipe(stream);

    const darkGreen = '#2e7d32';
    const lightGreen = '#e8f5e9';

    doc.fontSize(24).fillColor(darkGreen).text('Nature Hatch', { align: 'center' });
    doc.moveDown();
    doc.fontSize(18).fillColor(darkGreen).text('INVOICE', { align: 'center' });
    doc.moveDown();

    doc.fillColor('#000').fontSize(12);
    doc.text(`Invoice Number: ${order._id}`);
    doc.text(`Date: ${new Date(order.createdAt).toLocaleDateString()}`);
    doc.moveDown();
    doc.text(`Customer Name: ${order.userId.name}`);
    doc.text(`Email: ${order.userId.email}`);
    doc.text(`Shipping Address: ${order.shippingAddress}`);
    doc.moveDown();

    const tableTopY = doc.y;
    doc.fontSize(12).fillColor('#ffffff')
      .rect(50, tableTopY, 500, 20)
      .fill(darkGreen);
    doc.fillColor('#ffffff')
      .text('Product', 60, tableTopY + 5, { width: 200 })
      .text('Qty', 270, tableTopY + 5, { width: 60, align: 'center' })
      .text('Price', 340, tableTopY + 5, { width: 80, align: 'right' });

    doc.moveDown(1.5);

    let totalAmount = 0;
    const rowHeight = 20;

    order.products.forEach((item, index) => {
      const productName = item.productName || item.name || item.productId.toString();
      const quantity = item.quantity || 1;
      const price = item.price || 0;
      const rowY = doc.y;

      const subtotal = quantity * price;
      totalAmount += subtotal;

      if (index % 2 === 0) {
        doc.rect(50, rowY, 500, rowHeight)
          .fillColor(lightGreen)
          .fill();
      }

      doc.fillColor('#000')
        .text(productName, 60, rowY + 5, { width: 200 })
        .text(quantity.toString(), 270, rowY + 5, { width: 60, align: 'center' })
        .text(`₹${order.totalAmount.toFixed(2)}`, 340, rowY + 5, { width: 80, align: 'right' });

      doc.moveDown();
    });

    doc.moveDown(2);
    doc.fontSize(14).fillColor(darkGreen)
      .text(`Total Amount: ₹${order.totalAmount.toFixed(2)}`, { align: 'right' });

    doc.moveDown(3);
    doc.fontSize(10).fillColor('#000')
      .text('Thank you for shopping with Nature Hatch!', { align: 'center' })
      .text('For queries, contact support@naturehatch.com', { align: 'center' });

    doc.end();

    stream.on('finish', resolve);
    stream.on('error', reject);
  });
}

// Create order handler
const createOrder = async (req, res) => {
  try {
     const userId = req.user.id; 
    const {  products, totalAmount, shippingAddress, paymentMethod } = req.body;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: 'Invalid user ID' });
    }

    if (!Array.isArray(products) || products.length === 0) {
      return res.status(400).json({ message: 'Products array is required' });
    }

    if (!shippingAddress || !paymentMethod) {
      return res.status(400).json({ message: 'Shipping address and payment method are required' });
    }

    for (const item of products) {
      const product = await Product.findById(item.productId);
      if (!product) {
        return res.status(404).json({ message: `Product not found: ${item.productId}` });
      }
      if (product.quantity < item.quantity) {
        return res.status(400).json({ message: `Not enough stock for ${product.productname}` });
      }
      product.quantity -= item.quantity;
      await product.save();
    }

    const newOrder = new Order({
      userId,
      products,
      totalAmount,
      shippingAddress,
      paymentMethod,
    });

    await newOrder.save();

    const user = await User.findById(userId);
    // console.log(userId)
    if (!user) throw new Error('User not found');

    // user.orders.push({
    //   products,
    //   totalAmount,
    //   paymentMethod,
    //   deliveryInfo: shippingAddress,  // ✅ matches your user schema
    //   status: 'pending'
    // });

    // await user.save();

    await User.findByIdAndUpdate(userId, {
  $push: { orders: newOrder._id }
});

    const invoiceDir = `${__dirname}/../../invoices`;
    if (!fs.existsSync(invoiceDir)) fs.mkdirSync(invoiceDir, { recursive: true });

    const invoicePath = `invoices/invoice-${newOrder._id}.pdf`;
    const fullPath = `${__dirname}/../../${invoicePath}`;

    // ✅ Wait for invoice to finish writing
    await generateInvoice({
      _id: newOrder._id,
      createdAt: newOrder.createdAt,
      userId: user,
      products,
      totalAmount,
      shippingAddress
    }, fullPath);

    if (user.email) {
      await sendOrderConfirmationEmail(user.email, newOrder, fullPath);
    }

    res.status(201).json({
      message: 'Order placed successfully',
      order: newOrder,
    });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


// const createOrder = async (req, res) => {
//   try {
//     const userId = req.user.id; 
//     const { products, totalAmount, shippingAddress, paymentMethod } = req.body;

//     if (!mongoose.Types.ObjectId.isValid(userId)) {
//       return res.status(400).json({ message: 'Invalid user ID' });
//     }

//     if (!Array.isArray(products) || products.length === 0) {
//       return res.status(400).json({ message: 'Products array is required' });
//     }

//     if (!shippingAddress || !paymentMethod) {
//       return res.status(400).json({ message: 'Shipping address and payment method are required' });
//     }

//     // Validate & update stock
//     for (const item of products) {
//       const product = await Product.findById(item.productId);
//       if (!product) {
//         return res.status(404).json({ message: `Product not found: ${item.productId}` });
//       }
//       if (product.quantity < item.quantity) {
//         return res.status(400).json({ message: `Not enough stock for ${product.productname}` });
//       }
//       product.quantity -= item.quantity;
//       await product.save();
//     }

//     // Create order in Order collection
//     const newOrder = new Order({
//       userId,
//       products,
//       totalAmount,
//       shippingAddress,
//       paymentMethod,
//     });
//     await newOrder.save();

//     // Add order to User.orders array
//     const user = await User.findById(userId);
//     if (!user) throw new Error('User not found');

//     user.orders.push({
//       products,
//       totalAmount,
//       paymentMethod,
//       deliveryInfo: shippingAddress,  // ✅ matches your user schema
//       status: 'pending'
//     });

//     await user.save(); // ✅ important

//     // Generate invoice
//     const invoiceDir = `${__dirname}/../../invoices`;
//     if (!fs.existsSync(invoiceDir)) fs.mkdirSync(invoiceDir, { recursive: true });

//     const invoicePath = `invoices/invoice-${newOrder._id}.pdf`;
//     const fullPath = `${__dirname}/../../${invoicePath}`;

//     await generateInvoice({
//       _id: newOrder._id,
//       createdAt: newOrder.createdAt,
//       userId: user._id,
//       products,
//       totalAmount,
//       shippingAddress
//     }, fullPath);

//     if (user.email) {
//       await sendOrderConfirmationEmail(user.email, newOrder, fullPath);
//     }

//     res.status(201).json({
//       message: 'Order placed successfully',
//       order: newOrder,
//     });

//   } catch (error) {
//     console.error('Error creating order:', error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// };


// Another route above for testing



// Other order handlers
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
    .populate('userId', 'name email')
    .populate("products.productId", "productname price");
    res.status(200).json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getOrderById = async (req, res) => {
  const { id } = req.params;
  try {
    const order = await Order.findById(id).populate('userId', 'name email');
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.status(200).json(order);
  } catch (error) {
    console.error('Error fetching order:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const placeOrderByPaypal = async (req, res) =>
{    











}

const allOrders = async(req, res) => {
  try {
    const orders = await Order.find({});
    res.status(200).json({success:true , orders});
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ message: 'Internal server error' });
  }

}



const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const { orderId } = req.params;

    // Validate status
    const allowedStatuses = ['Pending','Confirmed', 'Shipped', 'Cancelled', 'Delivered'];
    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid status value' });
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json({
      message: `Order status updated to ${status}`,
      order: updatedOrder
    });
  } catch (error) {
    console.error('Error updating order status:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


module.exports = {
  createOrder,
  getAllOrders,
  getOrderById,
 placeOrderByPaypal,
 allOrders,
 updateOrderStatus
};
