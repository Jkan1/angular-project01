import { Component, Output, EventEmitter } from "@angular/core";

@Component({
    selector: "app-header",
    templateUrl: "./header.component.html"
})

export class HeaderComponent {
    
    @Output() pageChanged = new EventEmitter<string>();

    changePage(slug: string){
        this.pageChanged.emit(slug);
    }
}