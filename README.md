# KanbanAngular
Kanban is an app to manage tasks in a team. For now owner of project / board cannot add more person to board but I am thinking how to implement this and websocket to everyone has up-to-date version of board. So far, user can:
- register / login
- add, remove and update project, board, column, task and subtask
- drag and drop task between columns
- change color of dots next to column name and tag background


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

## To do:
- [ ] implement the ability to change the order of columns
- [ ] implement websocker (subscription)
- [ ] add more person to one board

I am thinking about change graphql, apollo and prisma backend to supabase (supabase handles sign in and up). I reckon this is a good idea to simplify an app logic. Graphql causes the most problems because apollo-angular has poor documentation with many mistakes which make harder to use it. Another trouble is an node js hosting on render.com. First load an app (after login) can last up to 2 minutes which is unacceptable. Still, this is the best free node js hosting for my backend.
Now I think how to implement subscription in graphql, apollo server and prisma.

## How to start on local machine:
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
