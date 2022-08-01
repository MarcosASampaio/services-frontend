import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FuncionariosRoutingModule } from './funcionarios-routing.module';
import { ListarFuncionariosComponent } from './pages/listar-funcionarios/listar-funcionarios.component';
import { MaterialModule } from '../material/material.module';
import { FormFuncionarioComponent } from './components/form-funcionario/form-funcionario.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ConfirmarDelecaoComponent } from './components/confirmar-delecao/confirmar-delecao.component';
import { ConfirmarSaidaComponent } from './components/confirmar-saida/confirmar-saida.component';
import { NavbarComponent } from '../compartilhar-componentes/navbar/navbar.component';
import { ConfirmarLogoutComponent } from './components/confirmar-logout/confirmar-logout.component';
import { RecaptchaFormsModule, RecaptchaModule, RecaptchaSettings, RECAPTCHA_SETTINGS } from 'ng-recaptcha';
import { environment } from 'src/environments/environment';
import { CompartilharComponentesModule } from '../compartilhar-componentes/compartilhar-componentes.module';
import { EditarFuncionarioComponent } from './components/editar-funcionario/editar-funcionario.component';


@NgModule({
  declarations: [
    ListarFuncionariosComponent,
    FormFuncionarioComponent,
    ConfirmarDelecaoComponent,
    ConfirmarSaidaComponent,
    ConfirmarLogoutComponent,
    EditarFuncionarioComponent
  ],
  imports: [
    CommonModule,
    FuncionariosRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    CompartilharComponentesModule
  ],
})
export class FuncionariosModule { }
