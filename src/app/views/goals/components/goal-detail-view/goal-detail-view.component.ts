import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {Goal} from "../../../../models/goal.model";
import {Workout} from "../../../../models/workout.model";
import {Program} from "../../../../models/program.model";
import {ProgramService} from "../../../programs/program.service";
import {WorkoutService} from "../../../workouts/workout.service";
import {DashboardService} from "../../../../dashboard/dashboard.service";
import {ExerciseService} from "../../../exercises/exercise.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'goal-detail',
  templateUrl: './goal-detail-view.component.html',
  styleUrls: ['./goal-detail-view.component.css']
})
export class GoalDetailViewComponent implements OnInit {


  viewCompleted: boolean = false;
  progressBarWidth = "10%";

  @Input() goal!: Goal;
  @ViewChild('grid') public grid: any;

  constructor(private readonly router: Router, private readonly route: ActivatedRoute,
              private readonly programService: ProgramService,
              private readonly workoutService: WorkoutService,
              private readonly exerciseService: ExerciseService,
              private readonly dashboardService: DashboardService,
              ) {}


  ngOnInit(): void {
    this.checkDetailObject()
    console.log(this.goal)
    this.grid.refresh();
  }

//function to check if the goal has changed and pull the workoutList needed
  public checkDetailObject():void {
    let goal1 = this.dashboardService._goalList.filter(item => item.id == this.referenceSolver(this.router.url))[0]
    if (this.router.url.includes("/goals")&& this.goal!=goal1) {
      this.goal = goal1
    }
    this.dashboardService.getGoalWorkoutList(this.goal)
    this.dashboardService.getCompletedGoalWorkoutList(this.goal)

  }


  daysLeft(endDate: Date): any {
    let today = new Date;
    let _endDate = new Date(endDate);
    return _endDate.getDate() - today.getDate()
  }

  referenceSolver(referenceURL: string) {
    let ref = referenceURL
    let pos = referenceURL.lastIndexOf("/") + 1

    return referenceURL.substr(pos, ref.length - pos)
  }

  progressBarStyling() {
    //set the view on true and after getting the completed workouts to false and to the old state in the end so the whole list is getting tracked
    let viewCheck = this.viewCompleted;
    this.viewCompleted= true;
    let progress = this.goalWorkoutList.length *100
    this.viewCompleted = false;
    progress = progress / this.goalWorkoutList.length
    this.viewCompleted = viewCheck
    return progress + "%"
  }

  //GETTER

  get currentGoal(): Goal {
    if (this.router.url.includes("/goals")&& this.goal != this.dashboardService._goalList.filter(item => item.id == this.referenceSolver(this.router.url))[0]) {
      this.goal = this.dashboardService._goalList.filter(item => item.id == this.referenceSolver(this.router.url))[0]
    }
    return this.goal
  }

  //returns all goals of the user
  public get goalList(): Goal[] {
    return this.dashboardService._goalList
  }

  // returns all Workouts of a goal completed and pending
  get goalWorkoutList(): Workout[]{
    if(this.viewCompleted == true){
      return this.dashboardService._completedGoalWorkoutList
    }else {
      return this.dashboardService._goalWorkoutList.concat(this.dashboardService._completedGoalWorkoutList)
    }

  }

  //returns only the completed workouts of a goal
  get completedGoalWorkoutList() {
    return this.dashboardService._completedGoalWorkoutList
  }
}
