import {Body, Controller, Delete, Get, Post, Put, Query, UseGuards} from '@nestjs/common';
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {Types} from "../auth/types-auth.decorator";
import {TypesGuard} from "../auth/types.guard";
import {CreatePartsModelsDto} from "./dto/create-partmodels.dto";
import {PartModelsService} from "./partmodels.service";


@Controller('partmodels')
export class PartModelsController {
    constructor(private PartsModelsService: PartModelsService) {
    }

    @UseGuards(JwtAuthGuard)
    @Types("Admin", "Worker", "Seller")
    @UseGuards(TypesGuard)
    @Get()
    async getPartsModels (@Query("count") count: number, @Query("offset") offset: number) {
        return await this.PartsModelsService.getPartsModels(count, offset)
    }

    @Types("Admin", "Worker", "Seller")
    @UseGuards(TypesGuard)
    @Get("/filtered/")
    async getFiltredPartsModels (
        @Query("count") count: number, @Query("offset") offset: number, @Query("type") type: string,
        @Query("filter") filter: string,
    ) {
        return await this.PartsModelsService.getFiltredPartsModels(count, offset, type, filter)
    }

    @Types("Admin")
    @UseGuards(TypesGuard)
    @UseGuards(JwtAuthGuard)
    @Delete()
    async deletePartsModel (@Query("id") id: string) {
        return await this.PartsModelsService.deletePartsModel(id)
    }

    @Types("Admin", "Worker")
    @UseGuards(TypesGuard)
    @UseGuards(JwtAuthGuard)
    @Put()
    async updatePartsModel () {
        return await this.PartsModelsService.updatePartsModel()
    }

    @Types("Admin")
    @UseGuards(TypesGuard)
    @UseGuards(JwtAuthGuard)
    @Post()
    async createPartsModel (@Body() dto: CreatePartsModelsDto) {
        return await this.PartsModelsService.createPartsModel(dto)
    }

    @Types("Admin", "Seller")
    @UseGuards(TypesGuard)
    @UseGuards(JwtAuthGuard)
    @Get("profit_by_model")
    async get_profit_by_model(@Query("model") model: string){
        return await this.PartsModelsService.getProfitByModel(model)
    }

    @Types("Admin", "Worker", "Seller")
    @UseGuards(TypesGuard)
    @UseGuards(JwtAuthGuard)
    @Get("number")
    async numbersOfDocument( @Query("filters") filter: string) {
        return await this.PartsModelsService.numbersOfDocument(filter)
    }
}
