import {Body, Controller, Delete, Get, HttpException, HttpStatus, Post, Put, Query, UseGuards} from '@nestjs/common';
import {LaptopService} from "./Laptop.service";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {CreateLaptopDto} from "./dto/create-laptop.dto";
import {TypesGuard} from "../auth/types.guard";
import {Types} from "../auth/types-auth.decorator";

@Controller('laptop')
export class LaptopController {
    constructor(private LaptopService: LaptopService) {
    }

    @UseGuards(JwtAuthGuard)
    @Types("Admin", "Worker", "Seller")
    @UseGuards(TypesGuard)
    @Get()
    async getLaptops (@Query("count") count: number, @Query("offset") offset: number) {
        const data = await this.LaptopService.getLaptops(count, offset)
        if(typeof data === "string"){
            throw new HttpException(data, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return data
    }

    @UseGuards(JwtAuthGuard)
    @Types("Admin", "Worker", "Seller")
    @UseGuards(TypesGuard)
    @Get("by_id")
    async getLaptopsById (@Query("id_array") id_array: string[]) {
        const response = await this.LaptopService.getLaptopsById(id_array)
        return response
    }

    @UseGuards(JwtAuthGuard)
    @Types("Admin", "Worker", "Seller")
    @UseGuards(TypesGuard)
    @Get("list")
    async getLaptopList (@Query("filter") filter: string) {
        const response = await this.LaptopService.getLaptopList(filter)
        return response
    }

    @Types("Admin", "Worker", "Seller")
    @UseGuards(TypesGuard)
    @Get("/filtered/")
    async getFilteredLaptops (
        @Query("count") count: number, @Query("offset") offset: number, @Query("type") type: string,
        @Query("filter") filter: string,
    ) {
        const data =  await this.LaptopService.getFilteredLaptops(count, offset, type, filter)
        if(typeof data === "string"){
            throw new HttpException(data, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return data
    }

    @Types("Admin")
    @UseGuards(TypesGuard)
    @UseGuards(JwtAuthGuard)
    @Delete()
    async deleteLaptop (@Query("id") id: string) {
        return await this.LaptopService.deleteLaptop(id)
    }

    @Types("Admin", "Worker")
    @UseGuards(TypesGuard)
    @UseGuards(JwtAuthGuard)
    @Put()
    async updateLaptop () {
        return await this.LaptopService.updateLaptop()
    }

    @Types("Admin")
    @UseGuards(TypesGuard)
    @UseGuards(JwtAuthGuard)
    @Post()
    async createLaptop (@Body() dto: CreateLaptopDto) {
        return await this.LaptopService.createLaptop(dto)
    }

    @Types("Admin", "Worker", "Seller")
    @UseGuards(TypesGuard)
    @UseGuards(JwtAuthGuard)
    @Get("number")
    async numbersOfDocument( @Query("filters") filter: string) {
        return await this.LaptopService.numbersOfDocument(filter)
    }
}
