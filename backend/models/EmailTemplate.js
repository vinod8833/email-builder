const mongoose = require("mongoose");

const emailTemplateSchema = new mongoose.Schema({
  title: String,
  content: String,
  footer: String,
  imageUrl: String,
});

const EmailTemplate = mongoose.model("EmailTemplate", emailTemplateSchema);

module.exports = EmailTemplate;
