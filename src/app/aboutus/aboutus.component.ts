import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-about-us',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.css']
})
export class AboutUsComponent {

  @ViewChild('f', { static: false }) form1: NgForm;

  subscription: Subscription;
  editMode = false;
  editedItem: Ingredient;

  constructor() { }
}
