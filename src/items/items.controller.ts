import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ItemsService } from '@/items/items.service';
import { ItemsDto } from '@/items/items.dto';

@Controller('/item')
export class ItemsController {
    constructor(private readonly itemsService: ItemsService) {}

    /**
     * GET REQUESTS
     */
    @Get()
    async getItems(@Query('dateFrom') dateFrom?: string, @Query('dateTo') dateTo?: string) {
        if (dateFrom && dateTo)
            return this.itemsService.getItemsWithDateRange(dateFrom, dateTo);
        return this.itemsService.getItems();
    }

    @Get(':name')
    async getItem(
        @Param() params: ItemsDto,
        @Query('dateFrom') dateFrom?: string, @Query('dateTo') dateTo?: string
    ) {
        if (dateFrom && dateTo)
            return this.itemsService.getItemWithDateRange(params.name, dateFrom, dateTo);
        return this.itemsService.getItem(params.name);
    }

    /**
     * POST REQUESTS
     */
    @Post('add-item')
    async addItem(@Body() body: ItemsDto) {
        return this.itemsService.addItem(body.name);
    }
}
