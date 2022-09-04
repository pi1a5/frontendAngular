import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-processes',
  templateUrl: './processes.page.html',
  styleUrls: ['./processes.page.scss'],
})
export class ProcessesPage implements OnInit {

  public isNewProcess: boolean = false;
  public processes: any[] = [];
  public selectedProcess = undefined;
  public processNumber = 0;
  public documents: any[] = [];

  constructor() {
    this.processes = [
      {
        id: 0,
        name: 'Padrão',
        fases: [
          {
            id: 0,
            name: 'Início',
            deadline: 10,
            position: 0,
            documents: [
              {
                name: 'Termo de Compromisso de Estágio',
                initials: 'TCE'
              },
              {
                name: 'Plano de Atividades',
                initials: 'PA'
              }
            ]
          },
          {
            id: 1,
            name: 'Acompanhamento',
            deadline: 15,
            position: 1,
            documents: [
              {
                name: 'Relatório de Atividades de Estágio',
                initials: 'RAE'
              }
            ]
          },
          {
            id: 2,
            name: 'Finalização',
            deadline: 10,
            position: 2,
            documents: [
              {
                name: 'Termo de Realização de Estágio',
                initials: 'TRE'
              }
            ]
          }
        ]
      },
      {
        id: 1,
        name: 'Aproveitamento',
        fases: [
          {
            id: 0,
            name: 'Requerimento',
            deadline: 15,
            position: 0,
            documents: [
              {
                name: 'Requerimento de Aproveitamento Profissional',
                initials: 'RAP'
              },
              {
                name: 'Relatório de Atividades para Aproveitamento Profissional',
                initials: 'RAAP'
              },
              {
                name: 'Declaração',
                initials: 'DC'
              }
            ]
          }
        ]
      },
      {
        id: 2,
        name: 'Equiparação',
        fases: [
          {
            id: 0,
            name: 'Início',
            deadline: 10,
            position: 0,
            documents: [
              {
                name: 'Termo de Compromisso Interno',
                initials: 'TCI'
              }
            ]
          },
          {
            id: 1,
            name: 'Término',
            deadline: 15,
            position: 1,
            documents: [
              {
                name: 'Ficha de Avaliação para Equiparação',
                initials: 'FAE'
              }
            ]
          },
        ]
      },
      {
        id: 3,
        name: 'Exterior',
        fases: [
          {
            id: 0,
            name: 'Início',
            deadline: 10,
            position: 0,
            documents: [
              {
                name: 'Formalização de Estágio no Exterior',
                initials: 'FEE'
              }
            ]
          },
          {
            id: 1,
            name: 'Término',
            deadline: 15,
            position: 1,
            documents: [
              {
                name: 'Declaração de Realização no Programa',
                initials: 'DRP'
              },
              {
                name: 'Relatório de Atividades de Estágio',
                initials: 'RAE'
              },
              {
                name: 'Requerimento de Aproveitamento de Atividades',
                initials: 'RAA'
              }
            ]
          },
        ]
      }
    ];
    this.processNumber = this.processes.length;
    this.documents = [
      {
        name: 'Termo de Compromisso de Estágio',
        initials: 'TCE'
      },
      {
        name: 'Plano de Atividades',
        initials: 'PA'
      },
      {
        name: 'Relatório de Atividades de Estágio',
        initials: 'RAE'
      },
      {
        name: 'Termo de Realização de Estágio',
        initials: 'TRE'
      },
      {
        name: 'Requerimento de Aproveitamento Profissional',
        initials: 'RAP'
      },
      {
        name: 'Relatório de Atividades para Aproveitamento Profissional',
        initials: 'RAAP'
      },
      {
        name: 'Declaração',
        initials: 'DC'
      },
      {
        name: 'Termo de Compromisso Interno',
        initials: 'TCI'
      },
      {
        name: 'Ficha de Avaliação para Equiparação',
        initials: 'FAE'
      },
      {
        name: 'Formalização de Estágio no Exterior',
        initials: 'FEE'
      },
      {
        name: 'Declaração de Realização no Programa',
        initials: 'DRP'
      },
      {
        name: 'Relatório de Atividades de Estágio',
        initials: 'RAE'
      },
      {
        name: 'Requerimento de Aproveitamento de Atividades',
        initials: 'RAA'
      }
    ]
  }

  ngOnInit() {

  }

  newProcess() {
    this.isNewProcess = true;
    this.selectedProcess = {
      id: this.processNumber,
      name: 'Novo processo',
      fases: []
    }
  }

  receiveProcess(process: any) {
    this.selectedProcess = process;
  }

  receiveDeleteEvent(id: number) {
    this.processes = this.processes.filter(p => p.id !== id);
    this.isNewProcess = false;
    this.selectedProcess = undefined;
  }

  receiveCancelEvent() {
    this.isNewProcess = false;
    this.selectedProcess = undefined;
  }

}
