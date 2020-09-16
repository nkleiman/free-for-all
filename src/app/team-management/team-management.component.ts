import { Component, OnInit } from '@angular/core';
import { Match } from 'src/models/match';
import { Round } from 'src/models/round';
import { Team } from '../../models/team';
export const EMPTY_STRING = "";
export const MAXIMUM_OF_TEAMS = 20;
export const MINIMUM_OF_TEAMS = 4;

@Component({
  selector: 'team-management',
  templateUrl: './team-management.component.html',
  styleUrls: ['./team-management.component.css']
})
export class TeamManagementComponent implements OnInit {

  teamList: Array<Team> = [];
  value: string;
  fixture: Array<Round> = [];
  isNotGenerated: boolean = true;

  constructor() { }
  ngOnInit(): void {
    this.value = EMPTY_STRING;
  }


  addTeam(value){
    let team : Team = {
      name: value
    }
    this.teamList.push(team);
    this.value = EMPTY_STRING;
  }

  teamIsRepeated(value){
    let isRepeated = false;
    this.teamList.forEach(element => {
      if(element.name == value){
        isRepeated = true;
      }
    });
    return isRepeated;
  }

  isMaximumReached(){
    return this.teamList.length == MAXIMUM_OF_TEAMS;
  }

  deleteTeam(team){
    if(team != null){
      this.teamList = this.teamList.filter(item => item !== team);
    }
  }

  isFixtureAble(){
    return this.teamList.length >= 4 && this.teamList.length % 2 == 0;
  }

  generateFixture(){
    let rounds = this.teamList.length - 1;
    let firstHalf = this.teamList.slice(0, (this.teamList.length / 2));
    let secondHalf = this.teamList.slice((this.teamList.length / 2), (this.teamList.length));

    for (let d = 0; d < rounds; d++){
      let round : Round = {
        date: d + 1,
        matches: Array<Match>()
      }

      for (let i = 0; i < this.teamList.length / 2; i++){
        let match : Match = {
          local: firstHalf[i],
          visitor: secondHalf[i]
        }
        round.matches.push(match);
      }

      this.fixture.push(round);
  
      let firstHalfToMove = firstHalf[firstHalf.length - 1];
      let secondHalfToMove = secondHalf[0];
  
      firstHalf.splice(1, 0, secondHalfToMove);
      firstHalf = firstHalf.slice(0, firstHalf.length - 1);
  
      secondHalf = secondHalf.slice(1, secondHalf.length);
      secondHalf.push(firstHalfToMove);
    }
    this.isNotGenerated = false;
  }

  clearFixture(){
    this.fixture = [];
    this.isNotGenerated = true;
  }
}
