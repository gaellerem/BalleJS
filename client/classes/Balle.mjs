import { Balles } from './Balles.mjs'; // Importe la classe Balles depuis le fichier Balles.mjs

export class Balle { // Définition de la classe Balle et exportation de la classe

    /**
     * Fonction constructeur de la classe Balle
     *
     * Si les paramètres x, y, velociteX, velociteY, rayon et couleur ne sont pas définis,
     * ils sont initialisés avec des valeurs aléatoires
     *
     * @param { HTMLCanvasElement } canvas : Le canvas
     * @param { CanvasRenderingContext 2D } context : Le contexte de rendu 2D du canvas
     * @param { number } x : La position horizontale de la balle
     * @param { number } y : La position verticale de la balle
     * @param { number } velociteX : La vitesse de déplacement horizontale
     * @param { number } velociteY : La vitesse de déplacement verticale
     * @param { number } rayon : Le rayon de la balle
     * @param { string } couleur : La couleur de la balle
     * @returns { Balle } : Une instance de la classe Balle
     */
    constructor(canvas, context, x, y, velociteX, velociteY, rayon, couleur) {

        // Si le canvas ou le contexte de rendu 2D ne sont pas définis, on sort de la fonction
        if (canvas === undefined || context === undefined) return;

        this.canvas = canvas;
        this.context = context;
        this.x = x ? x : this.random(0, Balles.width);
        this.y = y ? y : this.random(0, Balles.height);
        this.rayon = rayon ? rayon : this.random(10, 20);
        this.couleur = couleur ? couleur : this.randomRGB();
        this.velociteX = velociteX ? velociteX : this.random(-7, 7);
        this.velociteY = velociteY ? velociteY : this.random(-7, 7);
    }

    /**
     * Fonction qui génère un nombre aléatoire compris entre min et max
     * @param { number } min : La valeur minimale
     * @param { number } max : La valeur maximale
     * @returns { number } : Un nombre aléatoire compris entre min et max
     */
    random(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    /**
     * Fonction qui génère une couleur RGB aléatoire
     * @returns { string } : Une couleur RGB aléatoire
     */
    randomRGB() {
        return `rgb(${this.random(0, 255)},${this.random(0, 255)},${this.random(0, 255)})`;
    }

    /**
     * Fonction qui dessine la balle sur le canvas
     */
    dessiner() {
        this.context.beginPath();
        this.context.fillStyle = this.couleur
        this.context.arc(this.x, this.y, this.rayon, 0, 2 * Math.PI);
        this.context.fill();
    }

    /**
     * Fonction qui déplace la balle sur le canvas en fonction de sa vitesse
     * Si la balle atteint un bord du canvas, sa vitesse est inversée
     */
    deplacer() {
        if ((this.x + this.rayon) >= Balles.width) { // Si la balle atteint le bord droit du canvas
            this.velociteX = -(this.velociteX); // La vitesse horizontale est inversée
        }

        if ((this.x - this.rayon) <= 0) { // Si la balle atteint le bord gauche du canvas
            this.velociteX = -(this.velociteX); // La vitesse horizontale est inversée
        }

        if ((this.y + this.rayon) >= Balles.height) { // Si la balle atteint le bord bas du canvas
            this.velociteY = -(this.velociteY); // La vitesse verticale est inversée
        }

        if ((this.y - this.rayon) <= 0) { // Si la balle atteint le bord haut du canvas
            this.velociteY = -(this.velociteY); // La vitesse verticale est inversée
        }

        // On modifie les positions horizontales et verticales en fonction de la vitesse, ce qui donnera l'illusion que la balle se déplace
        this.x += this.velociteX;
        this.y += this.velociteY;

    }

    /**
     * Fonction qui vérifie si la balle est en collision avec une autre balle
     *
     * Si c'est le cas, la couleur des deux balles est modifiée avec une couleur aléatoire
     *
     * @param { Balle[] } balles : Un tableau contenant toutes les balles
     */
    collision(balles) {
        for (const ball of balles) {
            if ((!(this.x === ball.x && this.y === ball.y && this.velX === ball.velX && this.velY === ball.velY))) {
                const dx = this.x - ball.x;
                const dy = this.y - ball.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < this.rayon + ball.rayon) {
                    ball.couleur = this.couleur = this.randomRGB();
                }
            }
        }
    };
}