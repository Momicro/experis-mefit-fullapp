import {Component, Input, OnInit} from '@angular/core';
import {ExerciseService} from "../../exercise.service";
import {Exercise} from "../../../../models/exercise.model";

@Component({
  selector: 'exercise-short',
  templateUrl: './exercise-short-view.component.html',
  styleUrls: ['./exercise-short-view.component.css']
})
export class ExerciseShortViewComponent implements OnInit {

  @Input() exercise!: Exercise;



  constructor(public readonly exerciseService: ExerciseService) { }

  ngOnInit(): void {
  }

}
