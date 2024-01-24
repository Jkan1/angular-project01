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
    public level: string;
    public duration: string;
    public images: RecipeImage[];
    public createdBy: string;
    public likes: number;

    constructor(
        name: string,
        desc: string,
        steps: string,
        level: string,
        duration: string,
        img: RecipeImage[],
        uid?: string
    ) {
        this.name = name;
        this.description = desc;
        this.steps = steps;
        this.level = level;
        this.duration = duration;
        this.images = img;
    }
}