import { Component, OnInit, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { trigger, transition, style, animate, state } from '@angular/animations';

const animations = [
  trigger('fadeAnimation', [
    state('', style({
      "opacity": 0
    })),
    state('loading', style({
      "opacity": 1
    })),
    transition('* => loading', [
      style({
        "opacity": 0
      }),
      animate(1000)
    ])
  ])
]
@Component({
  selector: 'app-about-us',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.css'],
  animations: animations
})
export class AboutUsComponent implements OnInit {

  @ViewChild('f', { static: false }) form1: NgForm;

  subscription: Subscription;
  editMode = false;
  editedItem: Ingredient;
  animationState = '';

  ngOnInit() {
    this.animationState = 'loading';
  }
}
