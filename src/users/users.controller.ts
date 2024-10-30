import { Body, Controller, Delete, Get, NotFoundException, Param, Post } from "@nestjs/common";
import { Repository } from "typeorm";
import { User } from "./users.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { UserDTO } from "./DTO/users.dto";
import { UserService } from "./users.service";
import { Public } from "src/public";

@Controller("users")
export class UsersController {

    constructor(
        private userService: UserService
    ) { }

    @Get()
    getUsersList() {
       return this.userService.find();
    }

    @Get(":id")
    async getUserById(@Param("id") id: number) {
        return this.userService.findOneBy(id);
    }

    @Post()
    @Public()
    createUser(@Body() userDto: UserDTO) {
        console.log(userDto);
        return this.userService.create(userDto);
    }

    @Delete(":id")
    async deleteUserById(@Param("id") id: number) {
        return this.userService.delete(id);
    }
}