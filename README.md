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

## Modelagem
O projeto usa `ObjectId` para ligar médicos, especialidades, pacientes e consultas.

Também guarda dados dentro de `medicos`, no campo `horariosAtendimento`.

O projeto usa referências com `ObjectId` entre médicos, especialidades, pacientes e consultas.

Também usa dado embutido em `medicos`, no campo `horariosAtendimento`.

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
