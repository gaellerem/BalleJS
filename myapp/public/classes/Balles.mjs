import { Balle } from './Balle.mjs'; // Importe la classe Balle depuis le fichier Balle.mjs

export class Balles { // Définition de la classe Balles et exportation de la classe

    static width = 0; // Propriété statique width initialisée à 0
    static height = 0; // Propriété statique height initialisée à 0

    /**
     * Fonction constructeur de la classe Balles
     *
     * @param { HTMLCanvasElement } canvas : Le canvas
     * @param { number } nombreBalles : Le nombre de balles à générer
     * @param { number } width : La largeur du canvas
     * @param { number } height : La hauteur du canvas
     * @returns { Balles } : Une instance de la classe Balles
     */
    constructor(canvas, nombreBalles, width, height) {

        this.canvas = canvas; // Le canvas
        this.context = canvas.getContext('2d'); // Le navigateur crée un contexte de rendu 2D pour le canvas

        Balles.width = canvas.width = width; // La largeur du canvas est égale à la largeur de la fenêtre
        Balles.height = canvas.height = height; // La hauteur du canvas est égale à la hauteur de la fenêtre

        this.enMouvement = false; // La propriété enMouvement est initialisée à false. On utilisera cette propriété pour savoir si les balles sont en mouvement
        this.animationRequest = null; // La propriété animationRequest est initialisée à null. On utilisera cette propriété pour stocker l'identifiant de la requête d'animation

        this.context.fillStyle = 'rgba(0,0,0,0.25)'; // La couleur de remplissage est un gris semi-transparent
        this.context.fillRect(0, 0, this.width, this.height); // Un rectangle semi-transparent est dessiné sur tout le canvas

        this.balles = []; // Un tableau vide pour stocker les balles

        for (let i = 0; i < nombreBalles; i++) {
            this.balles.push(new Balle(this.canvas, this.context)); // On ajoute une nouvelle balle à chaque itération
        }
    }

    /**
     * Getter de la propriété nombre
     * @returns { number } : Le nombre de balles
     */
    get nombreBalles() {
        return this.balles.length;
    }

    /**
     * Setter de la propriété width
     * @param { number } value : La largeur du canvas
     */
    set width(value) {
        Balles.width = value;
        this.canvas.width = value;
    }

    /**
     * Setter de la propriété height
     * @param { number } value : La hauteur du canvas
     */
    set height(value) {
        Balles.height = value;
        this.canvas.height = value;
    }

    /**
     * Fonction qui dessine les balles sur le canvas
     * et gère les collisions entre les balles
     * et les bords du canvas
    */
    render() {
        this.enMouvement = true; // On passe la propriété enMouvement à true

        this.context.fillStyle = 'rgba(0,0,0,0.25)'; // La couleur de remplissage est un gris semi-transparent
        this.context.fillRect(0, 0, Balles.width, Balles.height); // Un rectangle semi-transparent est dessiné sur tout le canvas

        // Pour chaque balle dans le tableau balles
        this.balles.forEach(balle => {
            balle.dessiner(); // On dessine la balle
            balle.deplacer(); // On déplace
            balle.collision(this.balles); // On gère les collisions
        });

        // On stocke l'identifiant de la requête d'animation dans la propriété animationRequest
        this.animationRequest = requestAnimationFrame(this.render.bind(this));
    }

    /**
     * Fonction qui ajoute une nouvelle balle au canvas
     * @param { number } x : La position horizontale de la balle
     * @param { number } y : La position verticale de la balle
     */
    ajouterBalle(x, y) {
        this.balles.push(new Balle(this.canvas, this.context, x, y));
    }

    /**
     * Fonction qui démarre l'animation des balles
     */
    demarrer() {
        if (this.enMouvement) return;
        this.render();
    }

    /**
     * Fonction qui arrête l'animation des balles
     * en annulant la requête d'animation
     * et en passant la propriété enMouvement à false
     * pour indiquer que les balles ne sont plus en mouvement
    */
    stop() {
        if (!this.enMouvement) return;
        cancelAnimationFrame(this.animationRequest);
        this.enMouvement = false;
    }

    /**
     * Fonction qui réinitialise le canvas
     * en supprimant toutes les balles
     * et en appelant la méthode render pour redessiner le canvas
     */
    reinitialiser() {
        this.balles.splice(0, this.balles.length);
        this.render();
    }

}