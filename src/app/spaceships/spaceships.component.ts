import { Component, OnInit } from '@angular/core';
import { concat, Observable } from 'rxjs';
import { Starship } from './spaceships.model';
import { SpaceshipsService } from './spaceships.service';

@Component({
  selector: 'app-spaceships',
  templateUrl: './spaceships.component.html',
  styleUrls: ['./spaceships.component.css']
})
export class SpaceshipsComponent implements OnInit {

  constructor(public spaceshipsService: SpaceshipsService) { }

  starships: Starship[] = new Array<Starship>();
  pilots: Map<string, Array<any>> = new Map<string, Array<any>>();
  showPilots: boolean = false;

  ngOnInit(): void {

    this.getAllSpaceships('http://swapi.dev/api/starships/')
  }

  public getAllSpaceships(api:string){
    this.spaceshipsService.getAllSpaceships(api).subscribe((res) =>{
      if (res.next == null) { 
        for (let index = 0; index < res.results.length; index++) {
          this.starships.push(res.results[index])
        }
        this.getAllPilots()
      } 
      else{
        for (let index = 0; index < res.results.length; index++) {
          this.starships.push(res.results[index])
        }
        this.getAllSpaceships(res.next)
      }
      console.log(this.starships)

    })

  }

  public getAllPilots(){
    for (let index = 0; index < this.starships.length; index++) {
      var pilotInfo = []

      this.starships[index].pilots.forEach(pilot => {

        this.spaceshipsService.getPilot(pilot).subscribe(res=> {
          console.log(res)
          var value: Array<any> = this.pilots.get(this.starships[index].name)
          if(value == undefined){
            pilotInfo = [res]
            this.pilots.set(this.starships[index].name, pilotInfo)
          }
          else{
           this.pilots.set(this.starships[index].name, value.concat(res))

          }
        })
        
      });    
    } 
  }

  public getPilot(name: string){
    return this.pilots.get(name)
  }

  public showPilotInfo(){
    this.showPilots = !this.showPilots
  }

}
