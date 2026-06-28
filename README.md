# Clínica Médica API

API REST simples feita com Node.js, Express e MongoDB para a disciplina de Banco de Dados III.

## Como rodar

```bash
npm install
npm run seed
npm run dev
```

Arquivo `.env`:

```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017
DATABASE_NAME=clinica_medica_bdiii
```

## Collections

* especialidades
* pacientes
* medicos
* consultas

Cada collection possui pelo menos 30 documentos.

## Índices

Os índices foram criados no arquivo `seed.js`.

- `pacientes.cpf`: usado para buscar pacientes e evitar CPF duplicado.
- `especialidades.nome`: usado para buscar especialidades e evitar nomes duplicados.
- `medicos.crm`: usado para buscar médicos e evitar CRM duplicado.
- `medicos.especialidadeId`: usado para buscar médicos por especialidade.
- `consultas.pacienteId`: usado para buscar consultas de um paciente.
- `consultas.medicoId`: usado para buscar consultas de um médico.
- `consultas.status`: usado para filtrar consultas por status.
- `consultas.dataHora`: usado para buscar consultas por data.
- `consultas.especialidade`: usado para filtrar consultas por especialidade.

## Modelagem

O projeto usa referências com `ObjectId`:

- `medicos.especialidadeId` referencia uma especialidade.
- `consultas.pacienteId` referencia um paciente.
- `consultas.medicoId` referencia um médico.

Também usa dado embutido em `medicos`, no campo `horariosAtendimento`, porque os horários pertencem diretamente ao médico.

## Funcionalidades

* CRUD completo
* Inserção em lote com `insertMany`
* Atualização parcial com `$set`
* Atualização de array embutido com `$push`
* Índices no banco
* 4 relatórios com Aggregation Framework

## Relatórios

* `/relatorios/especialidades`
* `/relatorios/medicos`
* `/relatorios/pacientes`
* `/relatorios/faturamento`
