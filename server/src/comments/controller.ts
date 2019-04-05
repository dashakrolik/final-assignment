import { JsonController, Get, Param, Authorized, Post, HttpCode, Body, CurrentUser } from 'routing-controllers'
import Comment from './entity'
import User from '../users/entity'

@JsonController()
export default class CommentsController {

    @Get('/tickets/comments/:ticketId')
    async allComments(
        @Param('ticketId') id: number
    ) {
        const comments = await Comment.find({where: {ticket: id}})
        return { comments }
    }   

    @Authorized()
    @Post('/comments')
    @HttpCode(201)
    async createComment(
        @CurrentUser() user: User, 
        @Body() comment: Comment
    ) {
        if(user instanceof User) comment.user = user
        return await comment.save()
    }
}