import 'reflect-metadata'
import {createKoaServer} from "routing-controllers"
import UsersController from "./users/controller"
import LoginController from "./logins/controller"
import EventsController from "./events/controller"
import TicketsController from "./tickets/controller"
import CommentsController from "./comments/controller"
import setupDb from './db'

const port = process.env.PORT || 4000

const app = createKoaServer({
   controllers: [
      UsersController,
      LoginController,
      EventsController,
      TicketsController,
      CommentsController
   ]
})

setupDb()
  .then(_ =>
    app.listen(port, () => console.log(`Listening on port ${port}`))
  )
  .catch(err => console.error(err))