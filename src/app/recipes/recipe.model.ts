import { Ingredient } from '../shared/ingredient.model';

export class Recipe {
    public name: string;
    public description: string;
    public imagePath: string;
    public ingredients: Ingredient[];

    constructor(a: string, b: string, c: string, d : Ingredient[]) {
        this.name = a;
        this.description = b;
        this.imagePath = c;
        this.ingredients = d
    }
}