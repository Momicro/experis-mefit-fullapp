import { Component, OnInit } from '@angular/core';
import {Program} from "../../../../models/program.model";
import {Workout} from "../../../../models/workout.model";
import {ProgramService} from "../../../programs/program.service";
import {WorkoutService} from "../../../workouts/workout.service";
import {Exercise} from "../../../../models/exercise.model";
import {ExerciseService} from "../../../exercises/exercise.service";

@Component({
  selector: 'app-goal-set-view',
  templateUrl: './goal-set-view.component.html',
  styleUrls: ['./goal-set-view.component.css']
})


export class GoalSetViewComponent implements OnInit {
  private _selectedProgramsList: Program[] = [];
  private _selectedWorkoutsList: Workout[] = [];

  constructor(private readonly programService: ProgramService,
              private readonly workoutService: WorkoutService,
              private readonly exerciseService: ExerciseService) { }

  ngOnInit(): void {
   this.localStorageSetUp()
  }

  //checks for data in the localStorage and sets it up in case of first initialization IMPORTANT : always delete the localStorage after finishing the Goalsetup
  private localStorageSetUp():void {
    if(localStorage.getItem('selectedProgramsList')==null){
      localStorage.setItem('selectedProgramsList',JSON.stringify(this._selectedProgramsList))
    } else {
      this._selectedProgramsList = JSON.parse(<string>localStorage.getItem('selectedProgramsList'))
    }
    if(localStorage.getItem('selectedWorkoutsList')==null){
      localStorage.setItem('selectedWorkoutsList',JSON.stringify(this._selectedWorkoutsList))
    } else {
      this._selectedWorkoutsList = JSON.parse(<string>localStorage.getItem('selectedWorkoutsList'))
    }
  }
//GETTER
  selectedProgramsList(): Program[] {
    this._selectedProgramsList = JSON.parse(<string>localStorage.getItem('selectedProgramsList'))
    return this._selectedProgramsList
  }

  selectedWorkoutsList(): Workout[] {
    this._selectedWorkoutsList = JSON.parse(<string>localStorage.getItem('selectedWorkoutsList'))
    return this._selectedWorkoutsList
  }

  get programList(): Program[] {
    return this.programService._programList
  }

  get workoutList(): Workout[] {
    return this.workoutService._workoutList
  }

  public get exerciseList(): Exercise[] {
    return this.exerciseService._exerciseList
  }


}
