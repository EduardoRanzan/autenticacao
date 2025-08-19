import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { User } from "./user.entity";
import { JwtAuthGuard } from "src/auth/jwt.guard";

@Controller('users')
export class UserController{
    constructor (
        private readonly service: UserService
    ){}

    @UseGuards(JwtAuthGuard)
    @Get()
    findAll(): Promise<User[]> {
        return this.service.findAll();
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    findById(@Param('id', ParseUUIDPipe) id: string): Promise<User | null> {
        return this.service.findById(id);
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    create(@Body() User: User): Promise<User> {
        return this.service.save(User);
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id')
    update(
        @Body() User: User,
        @Param('id', ParseUUIDPipe) id: string
    ): Promise<User>{
        User.id = id;

        return this.service.save(User);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async remove(@Param('id', ParseUUIDPipe) id: string) {
        await this.service.remove(id);
    }
    
}