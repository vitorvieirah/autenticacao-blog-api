import { Like, Repository } from "typeorm";
import { User } from "./users.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Injectable, NotFoundException } from "@nestjs/common";
import { UserDTO } from "./DTO/users.dto";

@Injectable()
export class UserService {
    
    find() {
        return this.userRepository.find();    
    }

    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) {}


    async delete(id: number) {
        const user = await this.userRepository.findOneBy({ id });
        if (!user) {
            throw new NotFoundException("Usuário não encontrado");
        }

        this.userRepository.delete({ id: user.id });
    }

    async create(userDto: UserDTO) {
        console.log('No create' + userDto);
        const user = this.userRepository.create();
        console.log('No create 2' + userDto);
        user.name = userDto.name;
        user.email = userDto.email;
        user.password = userDto.password;
        user.role = userDto.role;
        user.isActive = userDto.isActive;

        console.log('No create 3' + userDto);

        this.userRepository.save(user);
        console.log('No create 4' + userDto);
        return user;
    }

    async findOneBy(id: number) {
        const user = await this.userRepository.findOneBy({ id });
        if (!user) {
            throw new NotFoundException("Usuário não encontrado");
        }

        return user;
    }

    async findOne(name: string): Promise<User | undefined> {
        return this.userRepository.findOne({
            where: { name: Like(`%${name}%`) },
        });
    }
    
}