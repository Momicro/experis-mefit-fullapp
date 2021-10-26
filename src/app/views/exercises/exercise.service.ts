import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Exercise } from "../../models/exercise.model";
import {Observable} from "rxjs";
import {Musclegroup} from "../../models/musclegroup.model";
import {MuscleGroupService} from "../../services/muscle-group.service";
import {environment as ENV} from "../../../environments/environment";
import {ExercisesComponent} from "./components/exercise-page/exercises.component";

@Injectable({
    providedIn: 'root'
})
export class ExerciseService {
    public _exerciseList: Exercise[] = [];
    private _error: string = '';


  private rootURL: string = 'http://localhost:8080/api/v1/exercises';

    constructor(private readonly http: HttpClient,
                readonly musclegroupService: MuscleGroupService)
    {
    }

    public error(): string {
        return this._error;
    }

  private fetchExerciseList: Observable<Exercise[]> =
    this.http.get<Exercise[]>(this.rootURL)


  //subscriber for the exerciselist observable
  getExerciseList():void {
    this.fetchExerciseList
      .subscribe((exerciseList: Exercise[]) => {this._exerciseList = exerciseList},
        (error: HttpErrorResponse) => {
          this._error = error.message;
        },
        () =>{})
  }

  getExerciseMusclegroups():Musclegroup[] {
      return this.musclegroupService._musclegroupList
  }

  Musclegroups(exercise: Exercise) {
    let i: string[] = exercise.muscleGroup.split("/");
    let j: string = i[i.length - 1]
    return this.musclegroupService._musclegroupList.filter(item => item.id == j)[0]
  }

  createExercise(exercise: Exercise) {
    console.log("Create exercise", exercise);

    let newExercise : Exercise = {} as Exercise;
    newExercise.name = exercise.name;
    newExercise.description = exercise.description;

    this.http.post(ENV.apiBaseUrl+`/api/v1/exercises`, newExercise, ENV.httpOptions)
      .subscribe((response) => {
          console.log('Exercise (ID: '+newExercise.id+') created.');
        },
        (error: HttpErrorResponse) => {
          console.log('Exercise (ID: '+newExercise.id+') could not be created.', error);
        }
      );
  }

  addMuscleGroupToExercise(exercise: Exercise ){

      let muscleString : String = exercise.muscleGroup.toString();
      let i : number = muscleString.lastIndexOf('id: ');
      let muscleId :String = muscleString.substr(i+1,1);
      let muscleGroup : Musclegroup = this.Musclegroups(exercise);
      console.log("Add musclegroup to exercise: ", muscleGroup);


      this.http.put(ENV.apiBaseUrl+`/api/v1/exercises/`+ exercise.id + '/update/muscleGroup/', muscleGroup.id, ENV.httpOptions)
        .subscribe((response) => {
          console.log('Exercise (ID: '+exercise.id+') updated with muscleGroup ' + muscleGroup);
        },
        (error: HttpErrorResponse) => {
          console.log('Exercise (ID: '+exercise.id+') could not be updated.', error);
        }
      );


  }





}
