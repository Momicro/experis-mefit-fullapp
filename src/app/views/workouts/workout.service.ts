import { Injectable } from '@angular/core';
import {Workout} from "../../models/workout.model";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {Exercise} from "../../models/exercise.model";
import {ExerciseService} from "../exercises/exercise.service";

@Injectable({
  providedIn: 'root'
})
export class WorkoutService {

  //seeding sample Data further there is the need of receiving the data of the API.
  public _workoutList: Workout[] =[];
  private _error!: string;
  private _workoutTypes = new Set();

  private rootURL: string = 'http://localhost:8080/api/v1/workouts';



  constructor(private readonly http: HttpClient,
              readonly exerciseService: ExerciseService) { }

  private fetchWorkoutList: Observable<Workout[]> =
    this.http.get<Workout[]>(this.rootURL)


  //subscriber for the workoutlist observable
  getWorkoutList():void {
    this.fetchWorkoutList
      .subscribe((workoutList: Workout[]) => {this._workoutList = workoutList},
        (error: HttpErrorResponse) => {
          this._error = error.message;
        },
        () =>{})
  }

  getWorkoutTypes():Set<any> {
    for (let i of this._workoutList) {
      this._workoutTypes.add(i.type)
    }
    return this._workoutTypes;
  }

  Exercises(workout: Workout) {
    let workoutExercises: Exercise[] = [];
    for (let i of workout.exercises){
      let j= i.split("/");
      i = i.split("/")[j.length - 1];
      workoutExercises.push(this.exerciseService._exerciseList.filter(item =>item.id == i)[0])
    }
    return workoutExercises
  }



}
