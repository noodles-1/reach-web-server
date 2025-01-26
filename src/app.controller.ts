import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { AppService } from '@/app.service';
import { ItemDto } from '@/item.dto';

@Controller('/item')
export class AppController {
    constructor(private readonly appService: AppService) {}

    /**
     * GET REQUESTS
     */
    @Get()
    async getItems(@Query('dateFrom') dateFrom?: string, @Query('dateTo') dateTo?: string) {
        if (dateFrom && dateTo)
            return this.appService.getItemsWithDateRange(dateFrom, dateTo);
        return this.appService.getItems();
    }

    @Get(':name')
    async getItem(
        @Param() params: ItemDto,
        @Query('dateFrom') dateFrom?: string, @Query('dateTo') dateTo?: string
    ) {
        if (dateFrom && dateTo)
            return this.appService.getItemWithDateRange(params.name, dateFrom, dateTo);
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
