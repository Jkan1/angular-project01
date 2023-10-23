import { Ingredient } from '../shared/ingredient.model';

export class Recipe {
    public id: string;
    public name: string;
    public description: string;
    public steps: string;
    public images: string[];
    public ingredients: Ingredient[];

    constructor(id: string, name: string, desc: string, steps: string, img: string[], ing: Ingredient[]) {
        this.id = id;
        this.name = name;
        this.description = desc;
        this.steps = steps;
        this.images = img;
        this.ingredients = ing;
    }
}