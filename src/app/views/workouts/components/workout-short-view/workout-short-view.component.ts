import {Component, Input, OnInit} from '@angular/core';
import {Workout} from "../../../../models/workout.model";
import {Router} from "@angular/router";
import {ExerciseService} from "../../../exercises/exercise.service";

@Component({
  selector: 'workout-short',
  templateUrl: './workout-short-view.component.html',
  styleUrls: ['./workout-short-view.component.css']
})
export class WorkoutShortViewComponent implements OnInit {

  @Input() workout!: Workout;

  constructor(private readonly router: Router,
              readonly exerciseService: ExerciseService) { }

  ngOnInit(): void {
    this.exerciseService.getExerciseList()
  }


  //Function to set the background color of the workout-short cards (change specific styling in css)
  completed() {
    if(this.router.url == "/dashboard"){
      return {
      pending: !this.workout.completed,
      completed: this.workout.completed
    }} if(this.router.url == "/workouts" || this.router.url ==  "/programs" || this.router.url ==  "/goals/set") {
      return {
        card: true,
      }
    } else {
      return {
        failed: !this.workout.completed,
        completed: this.workout.completed
      }
    }

  }
}
