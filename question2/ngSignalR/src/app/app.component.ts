import { Component } from '@angular/core';
import * as signalR from "@microsoft/signalr"
import { MatButtonModule } from '@angular/material/button';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    standalone: true,
    imports: [MatButtonModule]
})
export class AppComponent {
  title = 'Pizza Hub';

  private hubConnection?: signalR.HubConnection;
  isConnected: boolean = false;

  selectedChoice: number = -1;
  nbUsers: number = 0;

  pizzaPrice: number = 0;
  money: number = 0;
  nbPizzas: number = 0;

  constructor(){
    this.connect();
  }

  connect() {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('http://localhost:5282/hubs/pizza')
      .build();

    // TODO: Mettre isConnected à true seulement une fois que la connection au Hub est faite
    this.hubConnection!.on('UpdateNbUsers', (data) => {
      this.nbUsers = data;
    });
    

    this.hubConnection.start()
      .then(() => {
        this.isConnected = true;
        console.log('La connexion est active!');
      })
      .catch(err => console.log('Error while starting connection: ' + err));

  }

  selectChoice(selectedChoice:number) {
    this.selectedChoice = selectedChoice;
  }

  unselectChoice() {
    this.selectedChoice = -1;
  }

  addMoney() {
    this.hubConnection!.invoke('AddMoney', this.selectedChoice)
    this.hubConnection!.on('UpdateMoney', (data) =>{
       console.log('UpdateMoney reçu:', data);
      this.money = data;
    });
  }

  buyPizza() {
    this.hubConnection!.on('UpdateNbPizzasAndMoney', (money, pizza) =>{
      this.money = money;
      this.nbPizzas = pizza;
    });
  }
}
