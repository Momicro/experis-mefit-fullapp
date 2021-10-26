import { Component, OnInit } from '@angular/core';
import {Workout} from "../../../../models/workout.model";
import {WorkoutService} from "../../workout.service";

@Component({
  selector: 'app-workouts',
  templateUrl: './workouts.component.html',
  styleUrls: ['./workouts.component.css']
})
export class WorkoutsComponent implements OnInit {
  private _filteredWorkoutList: Workout[] = [];

  constructor(public workoutService: WorkoutService) { }

  ngOnInit(): void {
    this.workoutService.getWorkoutList()
  }

  //filter the workouts by type
  sortByType(event: any) {
    let type = event.target.innerHTML
    if(type == "all"){
      this._filteredWorkoutList = this.workoutList
    }else {
      this._filteredWorkoutList = this.workoutList.filter(item => item.type === type)
    }
  }

  //GETTER
  get filteredWorkoutList(): Workout[]{
    if(this._filteredWorkoutList.length == 0) {
      this._filteredWorkoutList = this.workoutList
    }
    return this._filteredWorkoutList
  }

  get workoutList():Workout[] {
    return this.workoutService._workoutList
  }

  get workoutTypes(): Set<any> {
    return this.workoutService.getWorkoutTypes()
  }
}
