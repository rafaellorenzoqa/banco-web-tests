# banco-web-tests

End-to-end UI test automation for the **banco-web** application, written with [Cypress](https://www.cypress.io/) and JavaScript.

## About this project

This repository is my **first ever contact with UI validation using Cypress**. It was built while following the classes lectured by **[Julio de Lima](https://github.com/juliodelimas)**, as part of the Mentoria JL 2.0 program.

The goal here is not to exhaustively cover a real product, but to learn and practice the fundamentals of web test automation:

- Writing readable end-to-end specs with Cypress
- Keeping the code organized through **custom commands** instead of duplicating interactions across tests
- Externalizing test data into **fixtures**
- Generating human-readable **HTML reports** with Mochawesome

### A note about language

The application under test (**banco-web**) is a Brazilian banking demo, and the classes are lectured in **Brazilian Portuguese**. Because of that, you will find Portuguese words throughout the project — element IDs (`#senha`, `#valor`), selector labels (`conta-origem`, `conta-destino`), button texts (`Entrar`, `Transferir`) and the toast messages asserted by the tests (`Transferência realizada!`).

Everything that was authored by me — test names, custom command names, variables, comments and this documentation — is written in **English**.

## Project components

| Component | Description |
| --- | --- |
| **Cypress** (`^16.0.0`) | Test runner and assertion framework used for all end-to-end tests. |
| **cypress-mochawesome-reporter** (`^5.0.0`) | Generates the HTML test report after each run. |
| **Fixtures** | Static test data (credentials) kept outside of the specs. |
| **Custom commands** | Reusable interactions, split by feature, that keep the specs focused on intent instead of on selectors. |

### Directory structure

```
banco-web-tests
├── cypress
│   ├── e2e
│   │   ├── login.cy.js          # Login test suite
│   │   └── transfer.cy.js       # Money transfer test suite
│   ├── fixtures
│   │   └── credentials.json     # Valid and invalid login credentials
│   └── support
│       ├── commands
│       │   ├── common.js        # Commands shared by every feature
│       │   ├── login.js         # Login-specific commands
│       │   └── transfer.js      # Transfer-specific commands
│       ├── commands.js          # Imports every custom command file
│       └── e2e.js               # Global setup + Mochawesome registration
├── cypress.config.js            # baseUrl, reporter and plugin configuration
└── package.json                 # Dependencies and run scripts
```

## Prerequisites

Before running the tests you need:

1. **Node.js** (the project was developed on Node 24) and **npm** installed.
2. The **banco-api** running — https://github.com/juliodelimas/banco-api
3. The **banco-web** UI running on `http://localhost:4000` — https://github.com/juliodelimas/banco-web

The tests will **not** run without both the API and the web UI up, since the automation drives the real interface and the interface depends on the API.

### Starting the application under test

Follow the instructions in each repository. In short:

```bash
# API
git clone https://github.com/juliodelimas/banco-api.git
cd banco-api
npm install
npm start

# Web UI (in another terminal)
git clone https://github.com/juliodelimas/banco-web.git
cd banco-web
npm install
npm start
```

The `baseUrl` configured in [cypress.config.js](cypress.config.js) is `http://localhost:4000`. If you serve the UI on a different port, update that value.

## Installation

```bash
git clone https://github.com/rafaellorenzoqa/banco-web-tests.git
cd banco-web-tests
npm install
```

## Running the tests

| Command | What it does |
| --- | --- |
| `npm test` | Runs every spec in headless mode and generates the HTML report. |
| `npm run cy:headed` | Runs every spec from the terminal, but with the browser visible. |
| `npm run cy:open` | Opens the interactive Cypress Test Runner, useful while writing tests. |

## Reports

Reports are produced by `cypress-mochawesome-reporter` and are written to `cypress/reports/html/` after a headless run. Open the generated `cypress/reports/html/index.html` in any browser to inspect the results, including screenshots of failed tests.

Both `cypress/reports` and `cypress/screenshots` are git-ignored, so each run produces a fresh local report.

## Test documentation

### `cypress/e2e/login.cy.js` — Login

Each test starts from the application root (`cy.visit('/')`).

| Test | Steps | Expected result |
| --- | --- | --- |
| Must login successfully when credentials are valid | Logs in with the valid credentials from the fixture. | The transfer screen is displayed (the `Realizar Transferência` heading is visible). |
| Must show an error message when credentials are invalid | Logs in with the invalid credentials from the fixture. | The toast shows `Erro no login. Tente novamente.` |

### `cypress/e2e/transfer.cy.js` — Transfer

Each test visits the application root and logs in with valid credentials before starting.

| Test | Steps | Expected result |
| --- | --- | --- |
| Must successfully transfer money when data and values are valid | Transfers `11` from `Maria` to `João`. | The toast shows `Transferência realizada!` |
| Must not transfer money over 5k between accounts when token is missing | Transfers `5000.01` from `Maria` to `João` without providing the authentication token. | The toast shows `Autenticação necessária para transferências acima de R$5.000,00.` |

### Test data

`cypress/fixtures/credentials.json` holds two credential sets:

```json
{
  "valid":   { "username": "julio.lima", "password": "123456" },
  "invalid": { "username": "julio.lima", "password": "654321" }
}
```

## Custom commands

Custom commands are declared under `cypress/support/commands/`, grouped by responsibility, and all imported from `cypress/support/commands.js`.

### Common — `commands/common.js`

| Command | Signature | Description |
| --- | --- | --- |
| `validateToastMessage` | `(message)` | Asserts that the `.toast` element contains exactly the expected text. Used as the assertion step in almost every test. |
| `selectComboBoxOption` | `(label, selection)` | Selects an option in a custom combo box. It locates the field by its `label[for="..."]`, walks up to the parent container, aliases it, opens it and clicks the option matching `selection`. |

### Login — `commands/login.js`

| Command | Signature | Description |
| --- | --- | --- |
| `loginWithValidCredentials` | `()` | Reads the `valid` credentials from the fixture, fills in username and password, and submits the form. |
| `loginWithInvalidCredentials` | `()` | Same flow, using the `invalid` credentials, to exercise the failure path. |

### Transfer — `commands/transfer.js`

| Command | Signature | Description |
| --- | --- | --- |
| `transferMoney` | `(fromAccount, toAccount, amount)` | Selects the origin and destination accounts through `selectComboBoxOption`, fills in the amount and submits the transfer. |

## Work in progress

This project is **actively evolving**. It is a learning repository, and I intend to keep expanding it before moving on to a real-life scenario. Planned next steps include:

- Broadening the transfer suite with more boundary and negative scenarios
- Covering the authentication-token flow for high-value transfers
- Covering the remaining screens of the application
- Improving data handling (dynamic data instead of fixed fixtures)
- Adding CI execution

Feedback and suggestions are welcome.

## Credits

- Classes and the applications under test: **[Julio de Lima](https://github.com/juliodelimas)** — [banco-api](https://github.com/juliodelimas/banco-api) | [banco-web](https://github.com/juliodelimas/banco-web)
- Tests and automation: **[Rafael Lorenzo](https://github.com/rafaellorenzoqa)**
