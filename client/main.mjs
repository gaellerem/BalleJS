import { Balles } from './classes/Balles.mjs'; // Importe la classe Balles depuis le fichier Balles.mjs

// Éléments du DOM
const canvas = document.querySelector('canvas');
const startButton = document.querySelector('#start');
const stopButton = document.querySelector('#stop');
const clearButton = document.querySelector('#clear');
const spanNombreBalles = document.querySelector('#balls-count');

let nombreInitialDeBalles = 10;

// Crée une nouvelle instance de la classe Balles
let balles = new Balles(canvas, nombreInitialDeBalles, window.innerWidth, window.innerHeight);

// Appelle la méthode render de l'instance balles
balles.render();

// Met à jour le contenu de l'élément spanNombreBalles avec le nombre de balles
spanNombreBalles.textContent = balles.nombreBalles;

// Écoute l'événement resize (redimensionnement) sur la fenêtre
// Met à jour la largeur et la hauteur du canvas avec la largeur et la hauteur de la fenêtre
window.addEventListener('resize', () => {
    balles.width = window.innerWidth;
    balles.height = window.innerHeight;
});

// Écoute l'événement click sur le canvas
// Ajoute une nouvelle balle à la position de la souris
canvas.addEventListener('click', (event) => {
    balles.ajouterBalle(event.clientX, event.clientY);
    spanNombreBalles.textContent = balles.nombreBalles; // Met à jour le nombre de balles
});

// Écoute l'événement click sur le bouton start
// Appelle la méthode demarrer de l'instance balles
startButton.addEventListener('click', function () {
    balles.demarrer();
});

// Écoute l'événement click sur le bouton stop
// Appelle la méthode stop de l'instance balles
stopButton.addEventListener('click', function () {
    balles.stop();
});

// Écoute l'événement click sur le bouton clear
// Appelle la méthode reinitialiser de l'instance balles
clearButton.addEventListener('click', function () {
    balles.reinitialiser();
    spanNombreBalles.textContent = balles.nombreBalles;
});