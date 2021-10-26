export interface Goal {
  id:string;
  startDate:Date;
  endDate:Date;
  archived:string;
  programs: [];
  workouts: [];
  detail: boolean;
}
