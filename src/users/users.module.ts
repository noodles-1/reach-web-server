import { Module } from '@nestjs/common';
import { UsersController } from '@/users/users.controller';
import { UsersService } from '@/users/users.service';
import { DatabaseModule } from '@/database/database.module';
import { AuthModule } from '@/auth/auth.module';

@Module({
    imports: [DatabaseModule, AuthModule],
    controllers: [UsersController],
    providers: [UsersService]
})
export class UsersModule {}
