const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/loginPage', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Mongoose connected');
  })
  .catch((e) => {
    console.error('Mongoose connection error:', e.message);
  });

const logInSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const loginData = mongoose.model('loginData', logInSchema);

module.exports = loginData;
