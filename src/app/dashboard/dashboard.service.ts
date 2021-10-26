import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {Goal} from "../models/goal.model";
import {Workout} from "../models/workout.model";

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  public _goalList: Goal[] = [];
  public rootURL: string = 'http://localhost:8080/api/v1/goals/';
  private _error!: string;
  _currentGoal!: Goal;
  _goal!: Goal;
  _goalWorkoutList: Workout[] = [];
  _completedGoalWorkoutList: Workout[] = [];


  public get currentDate() : Date {
    let d = new Date()
    return new Date(d.getFullYear(), d.getMonth(), d.getDate());
  }


  constructor(private readonly http: HttpClient) { }


  getGoalWorkoutList(goal: Goal):void {
    let rootURL = this.rootURL + goal.id +"/workouts"
    this.http.get<Workout[]>(rootURL)
      .subscribe((goalWorkoutList: Workout[]) => {for (let workout of goalWorkoutList){workout.completed=false} this._goalWorkoutList = goalWorkoutList},
        (error: HttpErrorResponse) => {
          this._error = error.message;
        },
        () =>{})
  }

  getCompletedGoalWorkoutList(goal:Goal): void {
    let rootURL = this.rootURL + goal.id +"/workouts/completed"
    this.http.get<Workout[]>(rootURL)
      .subscribe((goalWorkoutList: Workout[]) => {for (let workout of goalWorkoutList){workout.completed=true} this._completedGoalWorkoutList = goalWorkoutList},
        (error: HttpErrorResponse) => {
          this._error = error.message;
        },
        () =>{})
  }

  private fetchGoalList: Observable<Goal[]> =
    this.http.get<Goal[]>(this.rootURL)

  //TODO: Make it return only the goals of the loggedIn user
  getGoalList():void {
    this.fetchGoalList
      .subscribe((goalList: Goal[]) => {this._goalList = goalList},
        (error: HttpErrorResponse) => {
          this._error = error.message;
        },
        () =>{})
  }

  getGoalById(id:string):void {
    this.http.get<Goal>(this.rootURL + "/" + id)
      .subscribe((goal: Goal) => {this._goal = goal},
        (error: HttpErrorResponse) => {
          this._error = error.message;
        },
        () =>{})
  }

  //Function to get the last 6 days the current day and the next 7 days in an Array
  public getCalendarDateArray() {
    let calendarArray=[];

    let now = new Date();

    for (let i = -6; i<=7; i++)
    {
      let d = new Date(now.getFullYear(), now.getMonth(), now.getDate() + i);
      calendarArray.push(d);
    }

    return calendarArray;
  }

  dateComparator(endDate: Date, startDate: Date ):boolean {
    let today = new Date;
    return (new Date(endDate)> today && new Date(startDate)<today)
  }


}
