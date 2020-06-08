export class Recipe {
    public name: string;
    public description: string;
    public imagePath: string;

    constructor(a: string, b: string, c: string) {
        this.name = a;
        this.description = b;
        this.imagePath = c;
    }
}