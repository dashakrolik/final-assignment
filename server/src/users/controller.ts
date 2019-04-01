import {
    JsonController,
    Get,
    Param,
    HttpCode,
    Post,
    Body
  } from "routing-controllers";
import User from "./entity";
  
@JsonController()
export default class UsersController {
    @Get('/users/:id')
    @HttpCode(200)
    getUser(
      @Param('id') id: number
    ) {
      return User.findOne(id)
    }
  
    @Get('/users')
    async allPages() {
      const users = await User.find()
      return { users }
    }
  
    @Post('/users')
    async createUser(
      @Body() user: User
    ) {
      const {password, ...rest} = user
      const entity = User.create(rest)
      await entity.setPassword(password)
      return entity.save()
    }
  }
  