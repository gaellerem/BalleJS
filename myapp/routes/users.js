var express = require('express');
var path = require('path');
var router = express.Router();

router.use((req, res, next) => {
  // On récupère le header Authorization
  const authorization = req.headers["authorization"];

  let authorized = false;

  // Basic auth V1, avec un token uniquement non encodé
  if (authorization && authorization === "secret") {
    authorized = true;
  }

  if (authorized) next(); // On passe à la route suivante
  else res.status(401).send("Unauthorized"); // Sinon, on renvoie une réponse HTTP 401 (Unauthorized)

});

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../data', 'joueurs.json'));
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
