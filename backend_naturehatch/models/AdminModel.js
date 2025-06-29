const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const AdminSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    // email: {
    //     type: String,
    //     required: true,
    //     unique: true
    // },
    // phone:{
    //     type: String,
    //     required: true,
    //     unique: true,
    //     minlength:10,
    //     maxlength:10
    // },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['Admin', 'User'],
        default: 'Admin'
    },
    created_at: {
        type: Date,
        default: Date.now
    }

});

const Admin = mongoose.model('Admin', AdminSchema);


const initializeAdmin = async () => {
    try {
      const adminCount = await Admin.countDocuments();
      const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);

      if (adminCount === 0) {
        await Admin.create({
          username:process.env.ADMIN_USERNAME,
          password: hashedPassword,
          role: 'Admin'
        });
        console.log('Default admin user created');
      }
    } catch (error) {
      console.error('Error creating default admin:', error);
    }
  };
  

module.exports = { Admin ,initializeAdmin};