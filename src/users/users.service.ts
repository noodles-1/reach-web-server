import { Injectable, Inject } from '@nestjs/common';
import { UsersDto } from '@/users/users.dto';
import * as bcrypt from "bcrypt";

@Injectable()
export class UsersService {
    constructor(@Inject('POSTGRES_POOL') private readonly sql: any) {}

    /**
     * GET REQUESTS
     */
    async getUser(userId: number): Promise<any> {
        return await this.sql(`
            SELECT id, full_name, email FROM "User"
            WHERE id = ${userId}
        `);
    }

    async checkEmail(email: string): Promise<any> {
        return await this.sql(`
            SELECT * FROM "User"
            WHERE email = '${email}'    
        `);
    }

    /**
     * POST REQUESTS
     */
    async createUser(user: UsersDto): Promise<any> {
        await this.sql(`
            INSERT INTO "User" (full_name, email, password)
            VALUES ('${user.firstName} ${user.lastName}', '${user.email}', '${user.password}');
        `);

        return await this.sql(`
            SELECT id FROM "User"
            WHERE email = '${user.email}'    
        `);
    }

    async checkPassword(user: UsersDto): Promise<any> {
        const response = await this.sql(`
            SELECT id, password FROM "User"
            WHERE email = '${user.email}'
        `);

        const result = response[0];
        const areMatching = await bcrypt.compare(user.password, result.password);
        return {
            id: result.id,
            isVerified: areMatching,
        };
    }
}
