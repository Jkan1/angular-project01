// import { Ingredient } from '../shared/ingredient.model';

export type RecipeImage = {
    filename: string,
    src: string,
    width: string,
    height: string
};

export class Recipe {
    public uid: string;
    public name: string;
    public description: string;
    public steps: string;
    public level: number;
    public duration: number;
    public images: RecipeImage[];
    public createdBy: string;
    public likes: number;

    constructor(
        name: string,
        desc: string,
        steps: string,
        level: number,
        duration: number,
        img: RecipeImage[]
    ) {
        this.name = name;
        this.description = desc;
        this.steps = steps;
        this.level = level;
        this.duration = duration;
        this.images = img;
    }
}