import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto, UpdateUserUnlikeDto } from './dto/update-user.dto';
import { unlikeRes } from './entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }
  @Get("/noActive")
  findNoActive() {
    return this.usersService.findNoActive()
  }
  @Get("/ds-like-res")
  findUserLikeRes() {
    return this.usersService.findUserLikeRes()
  }
  @Get("ds-like-res-by-id/id=:id")
  findUserLikeResById(@Param('id') id: number) {
    return this.usersService.findUserLikeResById(Number(id))
  }
  @Post('like-res/userid=:id/resid=:resid')
  likeRes(@Param('id') userid, @Param('resid') resid) {
    return this.usersService.likeRes(userid, resid)
  }
  @Post("unlike-res/userid=:id/resid=:resid")
  unlikeRes(@Param('id') userid, @Param('resid') resid) {
    return this.usersService.unlikeRes(Number(userid), Number(resid))
  }
  @Get(':user_id')
  getUserById(@Param('user_id') userId: number) {
    // Sử dụng Prisma để tìm người dùng dựa trên userId
    const user = this.usersService.getUserById(Number(userId));
    return user;
  }



}
