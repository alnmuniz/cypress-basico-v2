// CAC-TAT.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test
/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {

    this.beforeEach(
        function(){
            cy.visit('./src/index.html');
        }
    )

    it('verifica o título da aplicação', function() {
        cy.title().should('equal','Central de Atendimento ao Cliente TAT');
    })

    it('preenche os campos obrigatórios e envia o formulário', function(){

        cy.get('#firstName').type('andre')
        cy.get('#lastName').type('muniz')
        cy.get('#email').type('email@trt5.jus.br')
        cy.get('#open-text-area')
            .type('texto de teste texto de teste texto de teste texto de teste texto de teste texto de teste texto de teste texto de teste texto de teste texto de teste texto de teste texto de teste texto de teste texto de teste texto de teste texto de teste texto de teste texto de teste texto de teste texto de teste texto de teste texto de teste texto de teste texto de teste texto de teste texto de teste texto de teste texto de teste texto de teste texto de teste texto de teste texto de teste texto de teste texto de teste texto de teste texto de teste texto de teste texto de teste texto de teste texto de teste texto de teste texto de teste texto de teste texto de teste texto de teste texto de teste texto de teste texto de teste texto de teste texto de teste texto de teste texto de teste texto de teste texto de teste texto de teste texto de teste texto de teste texto de teste texto de teste texto de teste texto de teste texto de teste',
              {delay : 0}  
            )
        cy.contains('button','Enviar').click()

        cy.get('.success').should('be.visible')
        
    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function() {

        cy.get('#firstName').type('andre')
        cy.get('#lastName').type('muniz')
        cy.get('#email').type('email#trt5.jus.br')
        cy.get('#open-text-area')
            .type('texto de teste texto de teste texto de teste texto de teste texto de teste texto de teste texto de teste texto de teste texto de teste texto de teste texto de teste texto de teste texto de teste texto de teste texto de teste texto de teste texto de teste texto de teste texto de teste texto de teste texto de teste texto de teste texto de teste texto de teste texto de teste texto de teste texto de teste texto de teste texto de teste texto de teste texto de teste texto de teste texto de teste texto de teste texto de teste texto de teste texto de teste texto de teste texto de teste texto de teste texto de teste texto de teste texto de teste texto de teste texto de teste texto de teste texto de teste texto de teste texto de teste texto de teste texto de teste texto de teste texto de teste texto de teste texto de teste texto de teste texto de teste texto de teste texto de teste texto de teste texto de teste texto de teste',
              {delay : 0}  
            )
        cy.contains('button','Enviar').click()

        cy.get('.error').should('be.visible')

    })

    it('campo de telefone só aceita números',function(){

        cy.get('#phone')
          .type('abc')
          .should('have.text','')
    })

    it('preenche e limpa os campos nome, sobrenome, email e telefone',function(){
        
        cy.get('#firstName').type('andre').should('have.value','andre').clear().should('have.value','')
        cy.get('#lastName').type('muniz').should('have.value','muniz').clear().should('have.value','')
        cy.get('#email').type('email@trt5.jus.br').should('have.value','email@trt5.jus.br').clear().should('have.value','')
        cy.get('#phone').type('32333111').should('have.value','32333111').clear().should('have.value','')
        
    })

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios',function(){
        cy.contains('button','Enviar').click()

        cy.get('.error').should('be.visible')
    })

    it('envia o formuário com sucesso usando um comando customizado',function(){
        cy.fillMandatoryFieldsAndSubmit()

        cy.get('.success').should('be.visible')

    })

    it('seleciona um produto (YouTube) por seu texto', function(){

        cy.get('#product')
            .select ('YouTube')
            .should('have.value','youtube')
    })

    it('seleciona um produto (Mentoria) por seu valor', function(){

        cy.get('#product')
            .select ('mentoria')
            .should('have.value','mentoria')
    })

    it('seleciona um produto (Blog) por seu indice', function(){

        cy.get('#product')
            .select (1)
            .should('have.value','blog')
    })

    it('marca tipo de atendimento feedback', function(){

        cy.get('input[type="radio"][value="feedback"]')
            .check()
            .should('have.value','feedback')
    })

    it('marca cada tipo de atendimento', function(){

        cy.get('input[type="radio"]')
            .should('have.length',3)
            .each(function($radio){
                cy.wrap($radio).check()
                cy.wrap($radio).should('be.checked')
            })
    })

    it('marca ambos checkboxes, depois desmarca o último', function(){

        cy.get('input[type="checkbox"]')
            .check()
            .should('be.checked')
            .last()
            .uncheck()
            .should('not.be.checked')


    })


    it('seleciona arquivo', function(){

        cy.get('input[type="file"]')
            .should('not.have.value')
            .selectFile('cypress/fixtures/example.json')
            .should(function($input){
                expect($input[0].files[0].name).to.equal('example.json')
            })            
    })

    it('seleciona arquivo simulando drag and drop', function(){

        cy.get('input[type="file"]')
            .should('not.have.value')
            .selectFile('cypress/fixtures/example.json',{action:'drag-drop'})
            .should(function($input){
                expect($input[0].files[0].name).to.equal('example.json')
            })            
    })

    it('seleciona arquivo fixture alias', function(){

        cy.fixture('example.json').as('sampleFile')

        cy.get('input[type="file"]')
            .should('not.have.value')
            .selectFile('@sampleFile')
            .should(function($input){
                expect($input[0].files[0].name).to.equal('example.json')
            })            
    })

    it('politica abre em outra aba',function(){
        cy.get('#privacy a').should('have.attr','target','_blank')
    })

    it('acessa politica remove link',function(){
        cy.get('#privacy a')
            .invoke('removeAttr','target')
            .click()

        cy.contains('Talking About Testing')
            .should('be.visible')
    })

    it('pag politica independente',function(){
        cy.visit('src/privacy.html')
        cy.contains('Talking About Testing')
            .should('be.visible')
    })

})
  