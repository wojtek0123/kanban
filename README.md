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
![login-page](https://user-images.githubusercontent.com/87533043/226334698-6aaa381b-536e-4555-9a43-84c8e2f895eb.png)

![kanban-view](https://user-images.githubusercontent.com/87533043/226334729-4c18a152-15c2-4b69-a1c9-3b36815ea09c.png)

![table-view](https://user-images.githubusercontent.com/87533043/226334740-a6d06c54-675b-41c0-bea5-3103b82e5dd5.png)

![add-task](https://user-images.githubusercontent.com/87533043/226334784-0e3832a2-9b98-4346-be56-0556a14ce74d.png)

![assign-tasks](https://user-images.githubusercontent.com/87533043/226334798-5bf8aae4-666e-4cdd-b635-3808541b80cb.png)

## To do:
- [x] implement the ability to change the order of columns
- [ ] implement websocket (subscription)
- [x] add more person to one board
- [x] add additionall views of tasks (table and kanban)
- [ ] divide components into smart and dump
- [ ] write tests

## What I learned:
- reactive form
- how rxjs works and how to use some of the rxjs operators
- how to create more reactive code
- components should be devide on smart and dumb

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
