import { Injectable, Inject } from '@nestjs/common';

@Injectable()
export class AppService {
    constructor(@Inject('POSTGRES_POOL') private readonly sql: any) {}

    async getItems(): Promise<any[]> {
        return await this.sql(`SELECT * FROM "Item"`);
    }

    async getItem(name: 'bottle' | 'utensil'): Promise<any> {
        return await this.sql(`
            SELECT * FROM "Item"
            WHERE name = '${name}'
            ORDER BY detected_on ASC   
        `)
    }

    async addItem(name: 'bottle' | 'utensil'): Promise<any> {
        return await this.sql(`
            INSERT INTO "Item" (name) 
            VALUES ('${name}')
        `);
    }
}
