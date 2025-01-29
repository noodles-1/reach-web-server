import { DatabaseModule } from '@/database/database.module';
import { Module } from '@nestjs/common';
import { ItemsController } from '@/items/items.controller';
import { ItemsService } from '@/items/items.service';

@Module({
    imports: [DatabaseModule],
    controllers: [ItemsController],
    providers: [ItemsService]
})
export class ItemsModule {}
