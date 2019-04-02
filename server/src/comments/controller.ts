import { JsonController, Get, Param, Authorized, Post, HttpCode, Body, CurrentUser } from 'routing-controllers'
import Comment from './entity'
import User from '../users/entity'

@JsonController()
export default class CommentsController {

    @Get('/comments')
    async allComments() {
        const comments = await Comment.find()
        return { comments }
    }   
   
    @Get('/comments/:id([0-9]+)')
    getComment(
        @Param('id') id: number
    ) {
        return Comment.findOne(id)
    }  

    @Authorized()
    @Post('/comments')
    @HttpCode(201)
    async createComment(
        @CurrentUser() user: User, 
        @Body() comment: Comment
    ) {
        if (user) comment.user = user
        return await comment.save()
    }
}