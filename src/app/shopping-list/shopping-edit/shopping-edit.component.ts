import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

  @ViewChild('nameInput', { static: true }) nameInput: ElementRef;
  @ViewChild('amountInput', { static: true }) amountInput: ElementRef;
  @Output() newIngredientAdded = new EventEmitter<Ingredient>();
  constructor() { }

  ngOnInit(): void {
  }

  onSubmit() {
    const iName = this.nameInput.nativeElement.value;
    const iAmount = this.amountInput.nativeElement.value;
    const newIng = new Ingredient(iName, iAmount);
    this.newIngredientAdded.emit(newIng);
  }
  onClear() { }
  onDelete() { }
}
