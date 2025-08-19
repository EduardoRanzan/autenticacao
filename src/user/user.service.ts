import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common"
import { User } from "./user.entity";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly repository: Repository<User>
    ) {}

    findAll(): Promise<User[]> {
        return this.repository.find();
    }

    async findById(id: string): Promise<User | null> {
        const found = await this.repository.findOneBy({ id: id })

        if (!found) {
            throw new HttpException('No users found', HttpStatus.NOT_FOUND);
        }
        return found;
    }

    async findByEmail(email: string): Promise<User | null> {
        const found = await this.repository.findOneBy({ email: email })

        if (!found) {
            throw new HttpException('No users found', HttpStatus.NOT_FOUND);
        }
        return found;
    }

    save(User: User): Promise<User> {
        return this.repository.save(User);
    }

    async remove(id: string): Promise<void> {
        await this.repository.delete(id)
    }

}