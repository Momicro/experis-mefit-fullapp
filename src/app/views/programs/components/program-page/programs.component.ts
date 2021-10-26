import { Component, OnInit } from '@angular/core';
import {ProgramService} from "../../program.service";
import {WorkoutService} from "../../../workouts/workout.service";
import {Program} from "../../../../models/program.model";
import { Router } from '@angular/router';
import { BaseComponent } from '../../../../base/base.component';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-programs',
  templateUrl: './programs.component.html',
  styleUrls: ['./programs.component.css']
})
export class ProgramsComponent extends BaseComponent implements OnInit {

  //error for future cases array brackets needed in cause of checking the length in get filtered programlist
  private _filteredProgramList: Program[] = [];
  private _error!: string;

//fire the get request to the server
  ngOnInit(): void {
    this.programService.getProgramList(),
      this.workoutService.getWorkoutList()
  }

  constructor(public readonly router: Router, public readonly authService: AuthService,
              public programService: ProgramService,
              public workoutService: WorkoutService)
  {
    super( router, authService);
  }



//function to create the sorted programList
  sortByCategory(event: any) {
    let category = event.target.innerHTML
    if(category == "all") {
      this._filteredProgramList = this.programList
    } else {
      this._filteredProgramList = this.programList.filter(item =>item.category === category)
    }
  }

  //Getter and Setter
  get filteredProgramList():Program[] {
    //needed so there will be content at first loading
    if(this._filteredProgramList.length == 0) {
      this._filteredProgramList = this.programList
    }
    return this._filteredProgramList
  }

  get programList():Program[] {
    return this.programService._programList
  }

  get programCategories(): Set<any> {
    return this.programService.getProgramCategories()
  }

}
