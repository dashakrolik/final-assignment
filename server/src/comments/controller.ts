import {
    JsonController,
    Get,
    Param,
    Put,
    Body,
    NotFoundError,
    Post,
    HttpCode, Authorized
  } from "routing-controllers";
  import Event from "./entity";
  
  @JsonController()
  export default class CommentsController {
    @Get('/comments/:id')
    getComment(
      @Param('id') id: number
    ) {
      return Comment.findOne(id)
    }
  
    @Get('/comments')
    async allComments() {
      const comments = await Comment.find()
      return { comments }
    }
  
    @Put('/comments/:id')
    async updatePage(
      @Param('id') id: number,
      @Body() update: Partial<Comment>
    ) {
      const comment = await Comment.findOne(id)
      if (!comment) throw new NotFoundError('Cannot find comment')
  
      return Comment.merge(comment, update).save()
    }
  
    @Authorized()
    @Post('/events')
    @HttpCode(201)
    createComment(
      @Body() comment: Comment //put json data into the body of the page variable
    ) {
      return comment.save()
    }
  }
  