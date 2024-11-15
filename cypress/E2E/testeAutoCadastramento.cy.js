/// <reference types="Cypress" />

import { faker } from '@faker-js/faker/locale/pt_BR';
import { generateValidCPF } from '../support/commands';
import { generateValidCNPJ } from '../support/commands';
import { generateValidPhoneNumber } from '../support/commands';
import { generateValidRG } from '../support/commands';


describe('Acesso ao ambiente de teste', function () {

    beforeEach(function () {
        cy.visit('https://imobiliario.desenvolvimento.taya.com.br/cadastro-parceiro')
        cy.viewport(1480, 820)


    })
    it('verifica o titulo da aplicação', function () {

        cy.title().should('be.equals', 'Taya Crédito Imobiliário')
    })
    it('preencher o formulário de auto cadastramento', function () {
        const userFirstName = faker.person.firstName()

        cy.contains('CNPJ').type(generateValidCNPJ())
        cy.contains('Razão Social').type(faker.person.middleName())
        cy.contains('Nome Fantasia').type(faker.person.firstName())
        cy.contains('Site').type('teste.com.br')
        cy.contains('Telefone Comercial').type(generateValidPhoneNumber())

        cy.get('.MuiButtonBase-root').click()
        cy.get('.css-1omh252').should('have.text', 'Dados do Representante')

        cy.contains('Nome do Representante').type(faker.person.fullName())
        cy.contains('CPF do Representante').type(generateValidCPF())
        cy.contains('RG do Representante').type(generateValidRG())
        cy.contains('WhatsApp para Contato').type(generateValidPhoneNumber())
        cy.contains('E-mail para Contato').type((faker.internet.email({ firstName: userFirstName, lastName: 'faker' })))

        cy.get('.PrivateSwitchBase-input').should('not.be.checked')
        cy.get('.PrivateSwitchBase-input').check()
        cy.get('.PrivateSwitchBase-input').should('have.checked')

        cy.get('.MuiButton-contained').click()
        cy.get('.Toastify__toast-body > div').should('have.text', 'Sua solicitação será analisada e em breve um dos nossos consultores entrará em contato.')


    })
    it('Erro ao submeter perfil já cadastrado', function () {


        cy.contains('CNPJ').type('40246536000106')  // utilizando CNPJ já cadastrado 
        cy.contains('Razão Social').type(faker.person.lastName())
        cy.contains('Nome Fantasia').type(faker.person.firstName())
        cy.contains('Site').type('teste.com.br')
        cy.contains('Telefone Comercial').type(generateValidPhoneNumber())

        cy.get('.MuiButtonBase-root').click()
        cy.get('.css-1omh252').should('have.text', 'Dados do Representante')

        cy.contains('Nome do Representante').type(faker.person.fullName())
        cy.contains('CPF do Representante').type(generateValidCPF())
        cy.contains('RG do Representante').type(generateValidRG())
        cy.contains('WhatsApp para Contato').type(generateValidPhoneNumber())
        cy.contains('E-mail para Contato').type('teste@teste.com')

        cy.get('.PrivateSwitchBase-input').should('not.be.checked')
        cy.get('.PrivateSwitchBase-input').check()
        cy.get('.PrivateSwitchBase-input').should('have.checked')

        cy.get('.MuiButton-contained').click()
        cy.get('.Toastify__toast-body > div').should('have.text', 'Parceiro já cadastrado')


    })
    it('Validação de campo obrigatório', function () {

        cy.get('.MuiButtonBase-root').click()
        cy.contains('Campo obrigatório').should('have.text', 'Campo obrigatório')
    })

    it('ERRO ao cadastrar um CNPJ inválido', function () {

        cy.contains('CNPJ').type('11111111111111')  // Utilizando CNPJ inválido
        cy.contains('Razão Social').type(faker.person.lastName())
        cy.contains('Nome Fantasia').type(faker.person.firstName())
        cy.contains('Site').type('teste.com.br')
        cy.contains('Telefone Comercial').type(generateValidPhoneNumber())

        cy.get('.MuiButtonBase-root').click()

        cy.contains('CNPJ inválido').should('have.text', 'CNPJ inválido')

    })

    it('ERRO ao cadastrar um CPF inválido', function () {


        cy.contains('CNPJ').type(generateValidCNPJ())
        cy.contains('Razão Social').type(faker.person.lastName())
        cy.contains('Nome Fantasia').type(faker.person.firstName())
        cy.contains('Site').type('teste.com.br')
        cy.contains('Telefone Comercial').type(generateValidPhoneNumber())

        cy.get('.MuiButtonBase-root').click()
        cy.get('.css-1omh252').should('have.text', 'Dados do Representante')

        cy.contains('Nome do Representante').type(faker.person.fullName())
        cy.contains('CPF do Representante').type('111.111.111-11')       // Utilizando CPF inválido
        cy.contains('RG do Representante').type(generateValidRG())
        cy.contains('WhatsApp para Contato').type(generateValidPhoneNumber())
        cy.contains('E-mail para Contato').type('teste@teste.com')

        cy.get('.PrivateSwitchBase-input').should('not.be.checked')
        cy.get('.PrivateSwitchBase-input').check()
        cy.get('.PrivateSwitchBase-input').should('have.checked')

        cy.get('.MuiButton-contained').click()
        cy.contains('CPF inválido').should('have.text', 'CPF inválido')

    })
})