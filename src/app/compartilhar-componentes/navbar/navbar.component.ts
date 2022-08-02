import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Funcionario } from 'src/app/funcionarios/models/funcionario';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  tempo!: Date
  expiracaoDataToken!: Date
  funcionario: Funcionario[] = []

  constructor(
    public authService: AuthService
  ) { }

  ngOnInit(): void {
    this.dataDeExpiracaoToken()
  }
  
  dataDeExpiracaoToken() {
    this.expiracaoDataToken = this.authService.dataDeExpiracaoToken() 

    const data = new Date().getDate()

    const datasub = this.expiracaoDataToken.getDate() - data

    this.tempo = new Date(datasub)
    console.log(this.tempo)
  }
}
