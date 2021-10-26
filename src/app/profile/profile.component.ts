import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment as ENV } from 'src/environments/environment';
import { BaseComponent } from '../base/base.component';
import { Profile } from '../models/profile.model';
import { AuthService } from '../services/auth.service';
import { ProfileService } from '../services/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent extends BaseComponent implements OnInit {

  private _profile : Profile = <Profile> {id:0, age:0, height:0, weight:0, fitnessLevel:0, trainingFrequency:0, contributorRequest:false};

  constructor(public router: Router, public authService: AuthService,
    private profileService: ProfileService) {
    super(router, authService);
  }

  get LinkAccountManagementUrl() {
    return ENV.keycloak.url+'/realms/'+ENV.keycloak.realm+'/account/';
  } 

  set UserProfile(value: Profile) {
    this._profile = value; 
  }
  
  get UserProfile() {
    return this._profile;
  }

  ngOnInit(): void {
    console.log(this.authService.Profile);
    
    // get profile from auth service
    if (this.Profile !== undefined) 
      this._profile = this.Profile;
    
  }

  onSubmit() {     
    // save profile
    this.profileService.updateProfile(this.Profile).subscribe(profile => {
      // set profile in auth service
      this.Profile = this._profile; 
      
      console.log("Profile updated", profile);
     });

  }

}
