import { Body, Controller, Delete, Get, Param, ParseIntPipe, ParseUUIDPipe, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CarsService } from './cars.service';
import { CreateCardDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';

@Controller('cars')
//@UsePipes(ValidationPipe)
export class CarsController {

    constructor(
        private readonly carsService: CarsService
    ) {}

    @Get()
    getAllCars() {
        return this.carsService.findAll();
    }

    @Get(':id')
    getCarById(@Param("id", new ParseUUIDPipe({version: "4"})) id: string) {
        return this.carsService.findOneById(id);
    }

    @Post()
    createCar( @Body() createCarDto: CreateCardDto){
        return this.carsService.create(createCarDto);
    }

    @Patch(":id")
    updateCar( 
        @Param("id", ParseUUIDPipe) id: string,
        @Body() updateCarDto: UpdateCarDto
    ){
        return updateCarDto;
    }

    @Delete(":id")
    deleteCar( @Param("id") id: string){
        return {
            method: "delete",
            id
        }
    }
}
