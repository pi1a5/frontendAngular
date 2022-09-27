describe('Controle de Sessão Professores', () => {


  beforeEach(() => {
    cy.visit('/supervisor')

    
  });
    it('Controle de Sessã sem estar logado', () => {
        cy.visit('/supervisor')
    })


});

describe('Controle de Sessão Alunos sem estar logado', () => {

beforeEach(() => {
    cy.visit('/student')

    
  });
    it('Direcionar para página de professores sem estar logado', () => {
        cy.visit('/student')
    })
});


describe('Acessar uma rota estando logado', () => {

    beforeEach(() => {
        cy.visit('/student')
    
        
      });
        it('Direcionar para página de professores sem estar logado', () => {
            cy.visit('/student')
        })
    });
