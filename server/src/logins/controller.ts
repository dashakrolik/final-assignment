// src/logins/controller.ts
import { JsonController, Post, Body, BadRequestError } from "routing-controllers";
import { IsString } from 'class-validator'
import User from "../users/entity";
import {sign} from '../jwt'

class AuthenticatePayload {
  @IsString()
  email: string

  @IsString()
  password: string
}

@JsonController()
export default class LoginController {

  @Post('/logins')
  async authenticate(
    @Body() {email, password}: AuthenticatePayload
  ) {
    const user = await User.findOne({ where: { email } })
    if (!user || !user.id) throw new BadRequestError('A user with this email does not exist')

    if (!await user.checkPassword(password)) throw new BadRequestError('The password is not correct')

    const jwt = sign({ id: user.id })
    return { jwt }
  }
}

//http post :4000/secret-endpoint Authorization:"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjo2fSwiaWF0IjoxNTE5MzkyMTI3LCJleHAiOjE1MTk0MDY1Mjd9.1Y529TrVnWPbFIS81gCflQYvBXcQer05TjryuQGRBxQ"
