var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/', (req, res) => {

  const { name, email } = req.body;

  // Créer un nouvel utilisateur

  res.json({ message: 'Utilisateur créé avec succès', user: { name, email } });

});

router.put('/:id', (req, res) => {

  const { id } = req.params;

  const { name, email } = req.body;

  // Mettre à jour l'utilisateur avec l'ID spécifié

  res.json({ message: 'Utilisateur mis à jour avec succès', user: { id, name, email } });

});

router.delete('/:id', (req, res) => {
  const { id } = req.params;

  // Supprimer l'utilisateur avec l'ID spécifié

  res.json({ message: 'Utilisateur supprimé avec succès', userId: id });

});

module.exports = router;
