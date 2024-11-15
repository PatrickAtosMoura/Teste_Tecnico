import { faker } from '@faker-js/faker/locale/pt_BR';


export function generateValidCPF() {
    const cpf = faker.string.numeric(9);

    const calculateDigit = (cpf, base) => {
        let total = 0;
        for (let i = 0; i < base - 1; i++) {
            total += parseInt(cpf[i]) * (base - i);
        }
        const rest = total % 11;
        return rest < 2 ? 0 : 11 - rest;
    };

    const digit1 = calculateDigit(cpf, 10);
    const cpfWithDigit1 = cpf + digit1;
    const digit2 = calculateDigit(cpfWithDigit1, 11);

    return cpfWithDigit1 + digit2;
}
  
  Cypress.Commands.add('generateValidCPF', () => {
    return generateValidCPF();
  });

  export function generateValidCNPJ() {
    const cnpj = faker.string.numeric(12); 

    const calculateDigit = (cnpj, base) => {
        let total = 0;
        const multiplicadores = base === 13 ? [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2] : [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
        for (let i = 0; i < multiplicadores.length; i++) {
            total += parseInt(cnpj[i]) * multiplicadores[i];
        }
        const rest = total % 11;
        return rest < 2 ? 0 : 11 - rest;
    };

    const digit1 = calculateDigit(cnpj, 13);
    const cnpjWithDigit1 = cnpj + digit1;

    const digit2 = calculateDigit(cnpjWithDigit1, 14);

    return cnpjWithDigit1 + digit2;
}

Cypress.Commands.add('generateValidCNPJ', () => {
    return generateValidCNPJ();
});

export function generateValidPhoneNumber() {
    // Gera um código de área aleatório (2 dígitos)
    const ddd = faker.string.numeric(2);

    // Gera o número do telefone (9 dígitos, começando com 9)
    let phoneNumber = '9'; // O número de telefone no Brasil começa com 9
    for (let i = 0; i < 8; i++) {
        phoneNumber += faker.string.numeric(1);
    }

    // Formata o número de telefone no padrão (XX) 9XXXX-XXXX
    const formattedPhoneNumber = `(${ddd}) ${phoneNumber.slice(0, 5)}-${phoneNumber.slice(5)}`;

    return formattedPhoneNumber;
}

// Adiciona o comando ao Cypress
Cypress.Commands.add('generateValidPhoneNumber', () => {
    return generateValidPhoneNumber();
});

export function generateValidRG() {
    // Gera 8 dígitos aleatórios para o RG
    const rg = faker.string.numeric(8);

    // Função para calcular o dígito verificador do RG
    const calculateDigit = (rg) => {
        let total = 0;
        // Multiplicadores fictícios para simular um cálculo de dígito verificador
        const multiplicadores = [2, 3, 4, 5, 6, 7, 8, 9];
        
        for (let i = 0; i < multiplicadores.length; i++) {
            total += parseInt(rg[i]) * multiplicadores[i];
        }

        // Cálculo fictício para o dígito verificador
        const rest = total % 11;
        return rest < 2 ? 0 : 11 - rest;
    };

    // Calcula o dígito verificador
    const digit = calculateDigit(rg);

    // Formata o RG no padrão XX.XXX.XXX-X
    const formattedRG = `${rg.slice(0, 2)}.${rg.slice(2, 5)}.${rg.slice(5, 8)}-${digit}`;

    return formattedRG;
}

// Adiciona o comando ao Cypress
Cypress.Commands.add('generateValidRG', () => {
    return generateValidRG();
});
