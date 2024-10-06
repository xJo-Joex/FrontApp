import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';

// interface PayboxData {
//   PayboxRemail: string;
//   PayboxSendmail: string;
//   PayboxRename: string;
//   PayboxSendname: string;
//   PayboxBase0: string;
//   PayboxBase12: string;
//   PayboxDescription: string;
//   PayboxLanguage: string;
//   PayboxDirection: string;
//   PayBoxClientPhone: string;
//   PayboxProduction: boolean;
//   PayboxRecurrent: boolean;
//   PayboxIdPlan: string;
//   PayboxPermitirCalendarizar: boolean;
//   PayboxPagoInmediato: boolean;
//   PayboxCobroPrueba: boolean;
//   PayBoxClientIdentification: string;
//   PayboxAmountVariablePlan: boolean;
//   PayboxFrequencyPlan: string;
//   PayboxTieneIvaPlan: boolean;
//   PayboxDescriptionPlan: string;
//   PayboxPagoPlux: boolean;
//   PayboxIdElement: string;
//   onAuthorize: ((response: any) => void) | null;
// } 

interface PayboxData {
  PayboxRemail?: string;
  PayboxSendmail?: string;
  PayboxRename?: string;
  PayboxSendname?: string;
  PayboxBase0?: string;
  PayboxBase12?: string;
  PayboxDescription?: string;
  PayboxLanguage?: string;
  PayboxDirection?: string;
  PayBoxClientPhone?: string;
  PayboxProduction?: boolean;
  PayboxRecurrent?: boolean;
  PayboxIdPlan?: string;
  PayboxPermitirCalendarizar?: boolean;
  PayboxPagoInmediato?: boolean;
  PayboxCobroPrueba?: boolean;
  PayBoxClientIdentification?: string;
  PayboxAmountVariablePlan?: boolean;
  PayboxFrequencyPlan?: string;
  PayboxTieneIvaPlan?: boolean;
  PayboxDescriptionPlan?: string;
  PayboxPagoPlux?: boolean;
  PayboxIdElement?: string;
  onAuthorize?: ((response: any) => void) | null;
}


declare var iniciarDatos: any;
declare var reload: any;

@Component({
  selector: 'app-pay',
  standalone: true,
  imports: [],
  templateUrl: './pay.component.html',
  styleUrl: './pay.component.css'
})
export class PayComponent implements OnInit, OnDestroy {
  authService = inject(AuthService);
  router = inject(Router);

  public logout() {
    this.data = {}
    
    reload(this.data)
    this.authService.logout();
    this.router.navigate(['/login']);
  }
  baseApiBackend = "http://localhost:3000/api/";
  dataUser = this.authService.getDataUser()


  data: PayboxData = {
    PayboxRemail: "dmorales@pagoplux.com",
    PayboxSendmail: "correocliente@gmail.com",
    PayboxRename: "Tu Ecommerce",
    PayboxSendname: "",
    PayboxBase0: "2.0",
    PayboxBase12: "10.0",
    PayboxDescription: "Descripcion del pago",

    PayboxLanguage: "es",
    PayboxDirection: "Direccion tarjetahabiente",
    PayBoxClientPhone: '593980011614',

    PayboxProduction: false,


    // ===========LOS SIGUIENTES PARAMETROS SOLO SE USA EN PAGOS RECURRENTES==============
    PayboxRecurrent: true,
    PayboxIdPlan: '171',
    PayboxPermitirCalendarizar: true,
    PayboxPagoInmediato: true,
    PayboxCobroPrueba: false,
    PayBoxClientIdentification: 'Cedula tarjetahabiente',

    PayboxAmountVariablePlan: true,
    PayboxFrequencyPlan: 'MEN',
    PayboxTieneIvaPlan: true,
    PayboxDescriptionPlan: 'Descripcion plan',
    PayboxPagoPlux: true,
    PayboxIdElement: 'idElementoTest',
    onAuthorize: (response: any) => {
      if (response.status === 'succeeded') {
        const transactionData = {
          token: response.detail.token,
          amount: response.detail.amount,
          date: response.detail.fecha,
          userId: this.dataUser.userId
        };

        console.log(transactionData)


        this.validateTransaction(transactionData);
      }
    }
 
  }

  ngOnInit() {
    iniciarDatos(this.data);    
  }

  ngOnDestroy() {
    delete this.data.onAuthorize
    reload(this.data);
  }


  private validateTransaction(transactionData: any) {
    fetch(`${this.baseApiBackend}validate-transaction`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.dataUser.token}`
      },
      body: JSON.stringify(transactionData)
    })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error('Error en validación:', error));
  }


}
