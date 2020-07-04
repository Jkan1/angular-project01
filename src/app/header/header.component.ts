import { Component, Output, EventEmitter } from "@angular/core";
import { DataStorageService } from "../shared/data-storage.service";

@Component({
    selector: "app-header",
    templateUrl: "./header.component.html"
})

export class HeaderComponent {

    constructor(private dataService: DataStorageService) { }

    // @Output() pageChanged = new EventEmitter<string>();

    changePage(slug: string) {
        // this.pageChanged.emit(slug);
    }

    onSaveRecipe() {
        this.dataService.storeRecipes();
    }

    onFetchRecipe() {
        this.dataService.fetchRecipes()
            .subscribe(
                (res) => {
                    console.log(res);
                }
            );;
    }
}