import { Component, OnInit } from '@angular/core';
import { trigger, transition, style, animate, state } from '@angular/animations';

const animations = [
  trigger('fadeAnimation', [
    state('', style({
      "opacity": 0
    })),
    state('loaded', style({
      "opacity": 1
    })),
    transition('* => loaded', [
      style({
        "opacity": 0
      }),
      animate(500)
    ])
  ])
]

@Component({
  selector: 'app-recipe-banner',
  templateUrl: './recipe-banner.component.html',
  animations: animations
})
export class RecipeBannerComponent implements OnInit {

  animationState = '';

  constructor() { }

  ngOnInit(): void {
    this.animationState = 'loaded';
  }

  onImageLoad(imgIndex: number) {
    console.log(imgIndex);
    if (imgIndex == 1) this.animationState = 'loaded';
    if (imgIndex == 2) this.animationState = 'loaded';
    if (imgIndex == 3) this.animationState = 'loaded';
  }

}
