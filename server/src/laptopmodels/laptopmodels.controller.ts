import {Body, Controller, Delete, Get, HttpException, HttpStatus, Post, Put, Query, UseGuards} from '@nestjs/common';
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {Types} from "../auth/types-auth.decorator";
import {TypesGuard} from "../auth/types.guard";
import {CreateLaptopModelsDto} from "../LaptopModels/dto/create-Laptopmodels.dto";
import {LaptopModelsService} from "./Laptopmodels.service";
import {
    FilterLaptopmodelsDTO,
    TypeLaptopmodelsDto
} from "./dto/type-Laptopmodels.dto";

@Controller('laptopmodels')
export class LaptopModelsController {
    constructor(private LaptopModelsService: LaptopModelsService) {
    }

    @UseGuards(JwtAuthGuard)
    @Types("Admin", "Worker", "Seller")
    @UseGuards(TypesGuard)
    @Get()
    async getLaptopModels(@Query("count") count: number, @Query("offset") offset: number) {
        const data = await this.LaptopModelsService.getLaptopModels(count, offset)
        if (typeof data === "string") {
            throw new HttpException(data, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return data
    }


    @UseGuards(JwtAuthGuard)
    @Types("Admin", "Worker", "Seller")
    @UseGuards(TypesGuard)
    @Get("by_id")
    async getLaptopModelsById (@Query("id_array") id_array: string[]) {
        const response = await this.LaptopModelsService.getLaptopModelsById(id_array)
        return response
    }

    @UseGuards(JwtAuthGuard)
    @Types("Admin", "Worker", "Seller")
    @UseGuards(TypesGuard)
    @Get("list")
    async getLaptopModelList (@Query("filter") filter: string) {
        const response = await this.LaptopModelsService.getLaptopModelList(filter)
        return response
    }

    @UseGuards(JwtAuthGuard)
    @Types("Admin", "Worker", "Seller")
    @UseGuards(TypesGuard)
    @Put("edit_from_list")
    async editLaptopModelFromList (@Body("items") items: string) {
        const response = await this.LaptopModelsService.editLaptopModelFromList(items)
        return response
    }

    @UseGuards(JwtAuthGuard)
    @Types("Admin", "Worker", "Seller")
    @UseGuards(TypesGuard)
    @Get("/filtered/")
    async getFiltredLaptopModels(
        @Query("count") count: number, @Query("offset") offset: number, @Query("type") type: string,
        @Query("filter") filter: string,
    ) {
        const data = await this.LaptopModelsService.getFiltredLaptopModels(count, offset, type, filter)
        if (typeof data === "string") {
            throw new HttpException(data, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return data
    }

    @Types("Admin")
    @UseGuards(TypesGuard)
    @UseGuards(JwtAuthGuard)
    @Delete()
    async deleteLaptopModel(@Query("id") id: string) {
        return await this.LaptopModelsService.deleteLaptopModel(id)
    }

    @Types("Admin", "Worker")
    @UseGuards(TypesGuard)
    @UseGuards(JwtAuthGuard)
    @Put()
    async updateLaptopModel() {
        return await this.LaptopModelsService.updateLaptopModel()
    }

    @Types("Admin")
    @UseGuards(TypesGuard)
    @UseGuards(JwtAuthGuard)
    @Post()
    async createLaptopModel(@Body() dto: CreateLaptopModelsDto) {
        return await this.LaptopModelsService.createLaptopModel(dto)
    }

    @Types("Admin", "Seller")
    @UseGuards(TypesGuard)
    @UseGuards(JwtAuthGuard)
    @Get("get_priority")
    async get_priority() {
        const data = await this.LaptopModelsService.getPriorityLaptopModels()
        if (typeof data === "string") {
            throw new HttpException(data, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return data
    }

    @Types("Admin", "Worker", "Seller")
    @UseGuards(TypesGuard)
    @UseGuards(JwtAuthGuard)
    @Get("number")
    async numbersOfDocument( @Query("filters") filter: string) {
        return await this.LaptopModelsService.numbersOfDocument(filter)
    }
}

