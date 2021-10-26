import { Injectable } from '@angular/core';
import {Exercise} from "../../models/exercise.model";
import {BehaviorSubject, Observable} from "rxjs";
import {Program} from "../../models/program.model";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Workout} from "../../models/workout.model";
import {WorkoutService} from "../workouts/workout.service";

@Injectable({
  providedIn: 'root'
})
export class ProgramService {

  //seeding sample Data further there is the need of receiving the data of the API.
  public _programList: Program[] = [];
  private _error!: string;
  private _programCategories = new Set();

  private rootURL: string = 'http://localhost:8080/api/v1/programs';


  constructor(private readonly http: HttpClient,
              private readonly workoutService: WorkoutService) { }

  private fetchProgramList: Observable<Program[]> =
    this.http.get<Program[]>(this.rootURL)


  //subscriber for the programlist observable
  getProgramList():void {
    this.fetchProgramList
      .subscribe((programList: Program[]) => {this._programList = programList},
        (error: HttpErrorResponse) => {
          this._error = error.message;
        },
        () =>{})
  }

  getProgramCategories():Set<any> {
    for (let i of this._programList) {
      this._programCategories.add(i.category)
    }
    return this._programCategories;
  }


  Workouts(program: Program) {
    let programWorkouts: Workout[] = [];
    for (let i of program.workouts){
      let j= i.split("/");
      i = i.split("/")[j.length - 1];
      programWorkouts.push(this.workoutService._workoutList.filter(item =>item.id == i)[0])
        }
    return programWorkouts
  }
}
