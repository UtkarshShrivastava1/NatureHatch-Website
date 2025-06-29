const mongoose = require('mongoose');

const deliveryInfoSchema = new mongoose.Schema({
  contact: {
    type: String,
    // required: true, // email or phone
  },
  country: {
    type: String,
    // default: 'India',
  },
  firstName: {
    type: String,
    // required: true,
  },
  lastName: {
    type: String,
    // required: true,
  },
  address: {
    type: String,
    // required: true,
  },
  apartment: {
    type: String,
    // default: '',
  },
  city: {
    type: String,
    // required: true,
  },
  state: {
    type: String,
    // required: true,
  },
  pinCode: {
    type: String,
    // required: true,
  },
  phone: {
    type: String,
    // required: true,
  },
  saveInfoForNextTime: {
    type: Boolean,
    default: false,
  }
}, { _id:false });

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    },
    isVerified: {
      type: Boolean,
      default: false
    },
    phone: {
        type:Number,
        required: false,
        unique: true,
        minlength: 10,
        maxlength: 10
    },
    address:{
        type: String,
        required: false,
        minlength: 25,
        maxlength: 200
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    googleId: { 
        type: String 
    },
    cart: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product'
            },
            quantity: {
                type: Number,
                default: 1
            }
        }
    ],
    deliveryInfo: {
        type: deliveryInfoSchema,
        required: false,
        default: {}
    },
});

const User = mongoose.model('User',userSchema);


module.exports = User;