import { Module } from '@nestjs/common';
import { UsersModule } from '@/users/users.module';
import { ItemsModule } from '@/items/items.module';

@Module({
    imports: [UsersModule, ItemsModule],
})
export class AppModule {}
