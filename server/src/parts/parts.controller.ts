import {Body, Controller, Delete, Get, HttpException, HttpStatus, Post, Put, Query, UseGuards} from '@nestjs/common';
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {Types} from "../auth/types-auth.decorator";
import {TypesGuard} from "../auth/types.guard";
import {PartsService} from "./parts.service";
import {CreatePartsDto} from "./dto/create-parts.dto";

@Controller('parts')
export class PartsController {
    constructor(private PartsService: PartsService) {
    }

    @UseGuards(JwtAuthGuard)
    @Types("Admin", "Worker", "Seller")
    @UseGuards(TypesGuard)
    @Get()
    async getParts (@Query("count") count: number, @Query("offset") offset: number) {
        const data = await this.PartsService.getParts(count, offset)
        if(typeof data === "string"){
            throw new HttpException(data, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return data
    }

    @Types("Admin", "Worker", "Seller")
    @UseGuards(TypesGuard)
    @Get("/filtered/")
    async getFiltredParts (@Query("count") count: number, @Query("offset") offset: number, @Query("type") type: string,
                           @Query("filter") filter: string,) {
        const data = await this.PartsService.getFiltredParts(count, offset, type, filter)
        if(typeof data === "string"){
            throw new HttpException(data, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return data
    }

    @Types("Admin")
    @UseGuards(TypesGuard)
    @UseGuards(JwtAuthGuard)
    @Delete()
    async deletePart (@Query("id") id: string) {
        return await this.PartsService.deletePart(id)
    }

    @Types("Admin", "Worker")
    @UseGuards(TypesGuard)
    @UseGuards(JwtAuthGuard)
    @Put()
    async updatePart () {
        return await this.PartsService.updatePart()
    }

    @Types("Admin", "Seller")
    @UseGuards(TypesGuard)
    @UseGuards(JwtAuthGuard)
    @Post()
    async createPart (@Body() dto: CreatePartsDto) {
        return await this.PartsService.createPart(dto)
    }

    @Types("Admin", "Worker", "Seller")
    @UseGuards(TypesGuard)
    @UseGuards(JwtAuthGuard)
    @Get("number")
    async numbersOfDocument( @Query("filters") filter: string) {
        return await this.PartsService.numbersOfDocument(filter)
    }
}
