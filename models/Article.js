const mongoose = require('mongoose');

const ArticleSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  contenido: { type: String, required: true },
  categoria: { type: String, required: true }, 
  fecha: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Article', ArticleSchema);
