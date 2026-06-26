import dotenv from 'dotenv';
import { connectToDatabase, closeDatabaseConnection } from '../src/config/database.js';

dotenv.config();

async function seed() {
  try {
    const db = await connectToDatabase();

    await db.collection('consultas').deleteMany({});
    await db.collection('medicos').deleteMany({});
    await db.collection('pacientes').deleteMany({});
    await db.collection('especialidades').deleteMany({});

    await db.collection('pacientes').createIndex({ cpf: 1 }, { unique: true });
    await db.collection('especialidades').createIndex({ nome: 1 }, { unique: true });
    await db.collection('medicos').createIndex({ crm: 1 }, { unique: true });
    await db.collection('medicos').createIndex({ especialidadeId: 1 });
    await db.collection('consultas').createIndex({ pacienteId: 1 });
    await db.collection('consultas').createIndex({ medicoId: 1 });
    await db.collection('consultas').createIndex({ status: 1 });
    await db.collection('consultas').createIndex({ dataHora: 1 });
    await db.collection('consultas').createIndex({ especialidade: 1 });

    const especialidades = [
      'Cardiologia', 'Dermatologia', 'Pediatria', 'Ortopedia', 'Ginecologia',
      'Neurologia', 'Oftalmologia', 'Psiquiatria', 'Endocrinologia', 'Urologia',
      'Clínica Geral', 'Gastroenterologia', 'Pneumologia', 'Nefrologia',
      'Reumatologia', 'Hematologia', 'Oncologia', 'Infectologia',
      'Medicina do Trabalho', 'Geriatria', 'Nutrologia', 'Angiologia',
      'Alergologia', 'Mastologia', 'Cirurgia Geral', 'Medicina Esportiva',
      'Radiologia', 'Anestesiologia', 'Otorrinolaringologia', 'Coloproctologia'
    ].map((nome) => ({
      nome,
      descricao: `Especialidade médica de ${nome}`
    }));

    const pacientesNomes = [
      'Maria Oliveira', 'João Santos', 'Ana Souza', 'Carlos Pereira',
      'Fernanda Lima', 'Paulo Henrique', 'Juliana Costa', 'Roberto Alves',
      'Patrícia Martins', 'Lucas Ferreira', 'Mariana Rocha', 'André Gomes',
      'Camila Ribeiro', 'Ricardo Almeida', 'Beatriz Carvalho', 'Eduardo Moreira',
      'Larissa Dias', 'Gustavo Barbosa', 'Aline Mendes', 'Felipe Teixeira',
      'Renata Batista', 'Bruno Cardoso', 'Letícia Farias', 'Diego Nascimento',
      'Tatiane Correia', 'Marcelo Vieira', 'Isabela Freitas', 'Rafael Cunha',
      'Priscila Monteiro', 'Henrique Lopes'
    ];

    const pacientes = pacientesNomes.map((nome, index) => ({
      nome,
      cpf: String(10000000000 + index),
      telefone: `27999${String(index).padStart(6, '0')}`
    }));

    const medicosNomes = [
      'Dr. Augusto Mendes', 'Dra. Bianca Almeida', 'Dr. César Rocha',
      'Dra. Daniela Freitas', 'Dr. Eduardo Lima', 'Dra. Fabiana Torres',
      'Dr. Guilherme Batista', 'Dra. Helena Duarte', 'Dr. Igor Martins',
      'Dra. Júlia Moreira', 'Dr. Kleber Santos', 'Dra. Laura Nunes',
      'Dr. Marcos Vieira', 'Dra. Natália Ramos', 'Dr. Otávio Carvalho',
      'Dra. Paula Ribeiro', 'Dr. Renato Costa', 'Dra. Sofia Barbosa',
      'Dr. Tiago Cunha', 'Dra. Vanessa Lopes', 'Dr. Wagner Fernandes',
      'Dra. Yasmin Correia', 'Dr. Bernardo Gomes', 'Dra. Amanda Farias',
      'Dr. Daniel Cardoso', 'Dra. Elisa Nascimento', 'Dr. Fernando Teixeira',
      'Dra. Gabriela Dias', 'Dr. Henrique Lopes', 'Dra. Isadora Monteiro'
    ];

    const especialidadesResult = await db.collection('especialidades').insertMany(especialidades);
    const especialidadeIds = Object.values(especialidadesResult.insertedIds);

    const pacientesResult = await db.collection('pacientes').insertMany(pacientes);
    const pacienteIds = Object.values(pacientesResult.insertedIds);

    const medicos = medicosNomes.map((nome, index) => ({
      nome,
      crm: `CRM-ES ${10000 + index}`,
      telefone: `27998${String(index).padStart(6, '0')}`,
      especialidadeId: especialidadeIds[index],
      horariosAtendimento: [
        {
          diaSemana: index % 2 === 0 ? 'segunda-feira' : 'quarta-feira',
          inicio: '08:00',
          fim: '12:00'
        }
      ]
    }));

    const medicosResult = await db.collection('medicos').insertMany(medicos);
    const medicoIds = Object.values(medicosResult.insertedIds);

    const statusConsultas = ['agendada', 'realizada', 'cancelada'];

    const consultas = Array.from({ length: 30 }, (_, index) => ({
      pacienteId: pacienteIds[index],
      medicoId: medicoIds[index],
      especialidade: especialidades[index].nome,
      dataHora: new Date(2026, index % 12, (index % 28) + 1, 8 + (index % 8), 0),
      status: statusConsultas[index % 3],
      valor: 120 + (index % 5) * 30
    }));

    await db.collection('consultas').insertMany(consultas);

    console.log('Seed executado com sucesso.');
    console.log('30 especialidades inseridas.');
    console.log('30 pacientes inseridos.');
    console.log('30 médicos inseridos.');
    console.log('30 consultas inseridas.');
  } catch (error) {
    console.error('Erro ao executar seed:', error.message);
  } finally {
    await closeDatabaseConnection();
  }
}

seed();