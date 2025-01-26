import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AppService } from '@/app.service';
import { ItemDto } from '@/item.dto';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    /**
     * GET REQUESTS
     */
    @Get()
    async getItems() {
        return this.appService.getItems();
    }

    @Get(':name')
    async getItem(@Param() params: ItemDto) {
        return this.appService.getItem(params.name);
    }

    /**
     * POST REQUESTS
     */
    @Post('add-item')
    async addItem(@Body() itemDto: ItemDto) {
        return this.appService.addItem(itemDto.name);
    }
}
