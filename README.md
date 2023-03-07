# KanbanAngular
Kanban is an app to manage tasks in a team. For now owner of project / board cannot add more person to board but I am thinking how to implement this and websocket to everyone has up-to-date version of board.

- [Features](#user-can)
- [Live](#live-demo)
- [Built with](#built-with)
- [Screenshots](#screenshots)
- [To do](#to-do)
- [How to run on local machine]($how-to-run-on-local-machine)
- [What I learned](#what-i-learned)

 ## User can:
- register / login
- add, remove and update project, board, column, task and subtask
- drag and drop task between columns
- drag and drop columns (change of order)
- change color of dots next to column name and tag background
- filter tasks by tags or title
- sort tasks by title, updated and created time


## [Live demo](https://project-kanban-angular.vercel.app/)
##### Warning! First load an app after login can last up to 2 minutes.
###### This is couse of render.com node js app hosting. This problem isn't appear on localhost.

## Built with:
- angular
- nodejs
- supabase
- graphql
- prisma
- apollo server

## Screenshots

## To do:
- [x] implement the ability to change the order of columns
- [ ] implement websocker (subscription)
- [x] add more person to one board
- [x] add additionall views of tasks (table and kanban)

## What I learned:
- reactive form
- how rxjs works and how to use some of the rxjs operators
- how to create more reactive code
- components should be devide on smart and dumb (I didn't change my components to smart and dumb so far)
- nx folder structure will be better than mine

## How to run on local machine:
```bash
git clone https://github.com/wojtek0123/kanban.git
cd kanban
cd client
npm install
npm run serve
```
create new terminal and go to kanban folder
```bash
cd server
npm install
npm run dev
```
Client and dev server must go simultaneously.
Dev servers:
- app is available on localhost:4200
- server is available on localhost:4000
