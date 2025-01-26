import { Injectable, Inject } from '@nestjs/common';

@Injectable()
export class AppService {
    constructor(@Inject('POSTGRES_POOL') private readonly sql: any) {}

    async getItems(): Promise<any[]> {
        return await this.sql(`SELECT * FROM "Item"`);
    }
}
