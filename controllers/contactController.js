const Contact = require("../models/Contact");

//CONTROLLER
const submitContact = async (req, res) => {
  const { name, email, subject, message } = req.body;
  //
  const contactInfo = await Contact.create({ name, email, subject, message });

  console.log(req.body);
  //
  res.status(201).json({ message: "Submitted Sucessfully" });
};
module.exports = submitContact;
