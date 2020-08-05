import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { trigger, state, style, transition, animate, keyframes, group } from '@angular/animations';

import { AppState } from 'src/app/store/app.reducer';
import { Recipe } from '../recipe.model';


@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
  animations: [
    trigger('divState', [
      state('normal', style({
        'background-color': 'red',
        transform: 'translateX(0)'
      })),
      state('high', style({
        'background-color': 'blue',
        transform: 'translateX(100px)'
      })),
      transition('normal => high', animate(300)),
      // transition('high <=> normal', animate(800))
    ]),
    trigger('wildState', [
      state('normal', style({
        'background-color': 'red',
        transform: 'translateX(0) scale(1)'
      })),
      state('high', style({
        'background-color': 'blue',
        transform: 'translateX(100px) scale(1)'
      })),
      state('shrunk', style({
        'background-color': 'green',
        transform: 'translateX(0) scale(0.5)'
      })),
      transition('normal <=> high', animate(300)),
      // transition('shrunk <=> *', animate(500,style({
      //   'border-radius':'50px'
      // })))
      transition('shrunk <=> *', [
        style({
          'border-radius': '0px'
        }),
        // animate(1000),
        animate(1000, style({
          'background-color': 'orange',
          'border-radius': '50px'
        })),
        animate(1000)
      ])
    ]),
    trigger('list1', [
      state('in', style({
        'opacity': 1
      })),
      transition('void => *', [
        style({
          "opacity": 0,
          'transform': "translateX(-100px)"
        }),
        animate(2000)
      ])
    ]),
    trigger('list2', [
      state('in', style({
        'opacity': 1
      })),
      // transition('void => *', [
      //   animate(1000,keyframes([
      //     style({
      //       transform:"translateX(-100px)",
      //       opacity:0,
      //       offset:0
      //     }),
      //     style({
      //       transform:"translateX(-50px)",
      //       opacity:0.5,
      //       offset:0.3
      //     }),
      //     style({
      //       transform:"translateX(-20px)",
      //       opacity:1,
      //       offset:0.8
      //     }),
      //     style({
      //       transform:"translateX(0px)",
      //       opacity:1,
      //       offset:1
      //     })
      //   ]))
      // ]),
      transition('void => *', [
        group([
          animate(600,style({
            'background-color':'red'
          })),
          animate(1000,style({
            transform: "translateX(100px)",
            opacity:1
          }))
        ])
      ])
    ])
  ]
})
export class RecipeListComponent implements OnInit, OnDestroy {

  recipes: Recipe[];
  subscription: Subscription;
  state = "normal";
  wState = "normal";

  constructor(
    private routerService: Router,
    private activeRoute: ActivatedRoute,
    private store: Store<AppState>) { }

  ngOnInit(): void {
    this.subscription = this.store.select('recipes').pipe(
      map(recipeState => recipeState.recipes)
      ).subscribe(
      (recipes: Recipe[]) => {
        this.recipes = recipes;
      }
    )
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onAddRecipe() {
    this.routerService.navigate(['new'], { relativeTo: this.activeRoute })
  }

  animate() {
    this.wState = this.wState == 'high' ? 'normal' : 'high';
  }
  shrunk() {
    this.wState = this.wState != 'shrunk' ? 'shrunk' : 'normal';
  }

  onAnimStart(event){
    console.log("Start ",event);
  }
  onAnimDone(event){
    console.log("Done ",event);
  }

}
