import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BaseComponent } from '../../../../base/base.component';
import { AuthService } from '../../../../services/auth.service';
import { ExerciseService } from '../../exercise.service';
import {Exercise} from "../../../../models/exercise.model";
import {Musclegroup} from "../../../../models/musclegroup.model";
import {MuscleGroupService} from "../../../../services/muscle-group.service";

import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {Profile} from "../../../../models/profile.model";


@Component({
  selector: 'app-exercises',
  templateUrl: './exercises.component.html',
  styleUrls: ['./exercises.component.css']
})
export class ExercisesComponent extends BaseComponent implements OnInit {

  private _filteredExerciseList: Exercise[] = [];
  private _exercise : Exercise = {} as Exercise;
  closeResult = '';


  constructor(public readonly router: Router, public readonly authService: AuthService,
              private readonly exerciseService: ExerciseService,
              private readonly musclegroupService: MuscleGroupService,
              private modalService : NgbModal) {
    super(router, authService);
  }

  /**
   * MODAL VIEW STUFF
   */
  //Adds new exercise, contributor only
  private open(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result: any) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason: any) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  //For reload after using modal view
  private reloadComponent() {
    let currentUrl = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([currentUrl]);
  }

  //Submit for modal view
  onSubmit() {
    console.log(this._exercise);

    // save profile
    this.exerciseService.createExercise(this._exercise);

    //add muscleGroup via update
    this.exerciseService.addMuscleGroupToExercise(this._exercise);
  }

  /**
   * NORMAL PAGE STUFF
   */


  ngOnInit(): void {
    this.exerciseService.getExerciseList();
  }

  //TODO function to create the sorted exerciseList
  sortByMusclegroup(event: any) {
    let musclegroup = event.target.innerHTML
    if(musclegroup == "all") {
      this._filteredExerciseList = this.exerciseList
    } else {
      this._filteredExerciseList = this.exerciseList.filter(item =>
        this.musclegroupService.MusclegroupById(
          //TODO write function to separate the code: It takes the exercise musclegroup path and cuts the id off to pass it to the musclegroupById function
          item.muscleGroup
            .substr(item.muscleGroup.lastIndexOf('/') + 1,
          item.muscleGroup.length- (item.muscleGroup.lastIndexOf('/')+1))
        ).name === musclegroup)
    }
  }


  //Getter and Setter
  get filteredExerciseList():Exercise[] {
    //needed so there will be content at first loading
    if(this._filteredExerciseList.length == 0) {
      this._filteredExerciseList = this.exerciseList
    }
    return this._filteredExerciseList
  }

  get exerciseList():Exercise[] {
    return this.exerciseService._exerciseList
  }

  get exerciseMusclegroup(): Musclegroup[] {
    return this.exerciseService.getExerciseMusclegroups()
  }

  set Exercise(value: Exercise) {
    this._exercise = value;
  }

}
