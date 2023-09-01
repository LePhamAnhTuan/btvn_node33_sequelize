import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class UsersService {
  model= new PrismaClient
  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }
 async findAllLike ()  { 
    return await this.model.user.findMany({
      where: {
        AND:[
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
  findAll() {
    return this.model.user.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
