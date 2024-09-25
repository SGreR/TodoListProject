# Aplicação de Gerenciamento de Tarefas (Todo List)

## Descrição
Esta é uma aplicação de gerenciamento de tarefas desenvolvida como parte de um desafio técnico. A aplicação permite que os usuários criem, editem, excluam e visualizem tarefas, além de marcá-las como concluídas. Ela consiste em uma API RESTful feita com C# .NET Core para o backend e uma interrface de usuário com React para o frontend.

## Funcionalidades
- Criar novas tarefas.
- Editar tarefas existentes.
- Excluir tarefas.
- Marcar tarefas como concluídas.
- Listar todas as tarefas, com opções de filtro.

## Tecnologias Utilizadas
- **Backend:** C# .NET Core, Entity Framework, SQL Server.
- **Frontend:** React, Axios, Material UI.
- **Banco de dados:** SQL Server.

## Pré-requisitos
- [**.NET SDK**](https://dotnet.microsoft.com/download) (para o backend)
- [**Node.js e npm**](https://nodejs.org/en/download/) (para o frontend)
- [**SQL Server**](https://www.microsoft.com/en-us/sql-server/sql-server-downloads) (para o banco de dados)

## Configuração do Ambiente
1. Realize a instalação dos pré requisitos (.NET SDK, Node.js e npm, SQL Server)
2. Clone o repositório utilizando o comando ```git clone https://github.com/SGreR/TodoListProject```

### Backend:
3. Ajuste a string de conexão no arquivo appsettings.json se necessário (ela está configurada considerando a localização padrão da instalação do SQL Server)
4. Navegue até a pasta da aplicação utilizando ```cd TodoListProject.Server```
5. Execute a aplicação utilizando o comando ```dotnet run```
6. Durante a execução da aplicação, a migração inicial da base de dados será executada automaticamente se ainda não existir

A API estará disponível por padrão em ```https://localhost:7208```
### Frontend:
7. Navegue até a pasta da aplicação utilizando ```cd todolistproject.client```
8. Realize a instalação das dependências utilizando o comando ```npm install```
9. Inicie a aplicação com ```npm start```

A aplicação estará disponível por padrão em ```https://localhost:5173```

## Utilização da RESTful API
### Endpoints da API
| Método | Rota | Descrição |
| --- | --- | ---
| GET | ```/api/tasks``` | Retorna a lista de todas as tarefas |
| GET | ```/api/tasks/{id}``` | Retorna uma tarefa específica |
| POST | ```/api/tasks``` | Cria uma nova tarefa |
| PUT | ```/api/tasks/{id}``` | Atualiza uma tarefa existente |
| DELETE | ```/api/tasks/{id}``` | Exclui uma tarefa |

### GET /api/tasks
Retorna uma lista de tarefas com base em filtros opcionais

#### Exemplo de Request:
```curl -X GET "https://localhost:7208/api/tasks?title=Tarefa&description=Descricao&created=2023-09-23"```

#### Parâmetros de Filtro (Opcional):
- ```title```: filtra tarefas por parte do título (opcional)
- ```description```: filtra tarefas por parte da descrição (opcional)
- ```created```: filtra tarefas pela data de criação no formato ```YYYY-MM-DD``` (opcional)

#### Respostas esperadas:
- Código 200 OK - Requisição teve sucesso. Retorna a lista de tarefas no corpo do request.
- Código 204 No Content - Requisição teve sucesso, mas a lista de tarefas está vazia. Retorna uma lista de tarefas vazia. 

Se nenhum parâmetro for passado, o endpoint retorna todas as tarefas disponíveis.

### GET /api/tasks/{id}
Retorna uma tarefa específica

#### Exemplo de Request:
```curl -X GET "https://localhost:7208/api/tasks/10"```

#### Respostas esperadas:
- Código 200 OK - Requisição teve sucesso. Retorna a tarefa no corpo do request.
- Código 404 Not Found - Não foi encontrada uma tarefa com o id fornecido. 

### POST /api/tasks
Cria uma nova tarefa

#### Corpo da Request (JSON):
```
{
  "title": "Nova Tarefa",
  "description": "Descrição da nova tarefa",
  "isCompleted": false
}
```
**Obs:** A aplicação não aceita tarefas com título ou descrição nulas, vazias ou composta apenas de espaços vazios.

#### Exemplo de Request
```curl -X POST -H "Content-Type: application/json" -d "{\"title\": \"Nova tarefa\", \"description\": \"Descrição da nova tarefa\", \"isCompleted\": false}" "https://localhost:7208/api/tasks"```

#### Respostas esperadas:
- Código 201 Created - Requisição teve sucesso. Retorna a tarefa criada no corpo do request.
- Código 400 Bad Request - Ocorreu algum erro no formato da tarefa. Retorna uma mensagem informando o erro.

### PUT /api/tasks/{id}
Atualiza uma tarefa existente no id fornecido na url

#### Corpo da Request (JSON):
```
{
  "title": "Tarefa Editada",
  "description": "Descrição da tarefa editada",
  "isCompleted": false
}
```
#### Exemplo de Request:
```curl -X PUT -H "Content-Type: application/json" -d "{\"title\": \"Tarefa editada\", \"description\": \"Descrição da tarefa editada\", \"isCompleted\": true}" "https://localhost:7208/api/tasks/10"```

#### Respostas esperadas:
- Código 200 Ok - Requisição teve sucesso. Retorna a tarefa atualizada no corpo do request.
- Código 400 Bad Request - Ocorreu algum erro no formato da tarefa. Retorna uma mensagem informando o erro.
- Código 404 Not Found - Não foi encontrada uma tarefa com o id fornecido.

### DELETE /api/tasks/{id}
Deleta uma tarefa existente no id fornecido na url

#### Exemplo de Request:
```curl -X DELETE "https://localhost:7208/api/tasks/10"```

#### Respostas esperadas:
- Código 204 No Content - Requisição teve sucesso. Não retorna conteúdo.
- Código 400 Bad Request - Ocorreu algum erro na deleção da tarefa. Retorna uma mensagem informando o erro.
- Código 404 Not Found - Não foi encontrada uma tarefa com o id fornecido.

As endpoints e possíveis respostas também estão documentadas através da interface swagger no endereço ```https://localhost:7208/swagger/index.html``` e podem ser consultadas durante a execução da aplicação.
