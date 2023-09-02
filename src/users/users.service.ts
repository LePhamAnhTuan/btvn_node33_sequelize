import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaClient } from '@prisma/client';
import { retryWhen } from 'rxjs';

@Injectable()
export class UsersService {
  model = new PrismaClient
  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }
  async findNoActive() {
    return await this.model.user.findMany({
      where: {
        AND: [
          {
            NOT: {
              like_res: { some: {} }
            }
          },
          {
            NOT: {
              rate_res: { some: {} }
            }
          },
          {
            NOT: {
              order: { some: {} }
            }
          },
        ]
      }
    })
  }

  findUserLikeRes() {
    return this.model.user.findMany({
      include: {
        like_res: {
          select: {
            restaurant: {
              select: {
                res_name: true
              }
            }
          }
        }

      }

    })
  }
  async getUserById(id) {
    try {
      const user = await this.model
        .user.findUnique({
          where: {
            user_id: id
          }
        });
      return user;
    } catch (error) {
      console.error('Lỗi khi cập nhật trạng thái:', error);
      throw error;
    }
  }
  async findUserLikeResById(userId) {
    try {
      const user = await this.model.user.findUnique({
        where: {
          user_id: userId,
        },
        include: {
          like_res: {
            select: {
              restaurant: {
                select: {
                  res_name: true
                }
              }
            }
          }

        }
      });

      if (!user) {
        return "khong co user";
      }
      return user
    } catch (error) {
      return "server 404"
    }
  }
  async unlikeRes(user_id: number, res_id: number) {
    try {
      const unLike = await this.model.like_res.updateMany({
        where: {
          user_id: user_id,
        },
        data: {
          like: 1
        },

      });
      return unLike;
    } catch (error) {

      return error
    }
  }
  async likeRes(user_id, res_id) {
    try {
      // Tìm mối quan hệ giữa người dùng và nhà hàng cụ thể
      const existingLike = await this.model.like_res.updateMany({
        where: {
          user_id,
          res_id,
        },
        data: {
          like: 1
        }
      });

      return existingLike;
    } catch (error) {

      console.error('Lỗi khi cập nhật trạng thái "unlike":', error);
      throw error;
    }
  }




}
