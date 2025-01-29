import { Injectable, Inject } from '@nestjs/common';

@Injectable()
export class ItemsService {
    constructor(@Inject('POSTGRES_POOL') private readonly sql: any) {}

    /**
     * GET REQUESTS
     */
    async getItems(): Promise<any[]> {
        return await this.sql(`SELECT * FROM "Item"`);
    }

    async getItemsWithDateRange(dateFrom: string, dateTo: string): Promise<any[]> {
        return await this.sql(`
            SELECT * FROM "Item"
            WHERE DATE(detected_on) BETWEEN '${dateFrom}' AND '${dateTo}'
        `);
    }

    async getItem(name: 'bottle' | 'utensil'): Promise<any[]> {
        return await this.sql(`
            SELECT * FROM "Item"
            WHERE name = '${name}'
            ORDER BY detected_on ASC   
        `)
    }

    async getItemWithDateRange(name: 'bottle' | 'utensil', dateFrom: string, dateTo: string): Promise<any[]> {
        return await this.sql(`
            SELECT
                EXTRACT(YEAR FROM detected_on) AS year,
                EXTRACT(MONTH FROM detected_on) AS month,
                EXTRACT(DAY FROM detected_on) AS day,
                COUNT(*) as item_count
            FROM "Item"
            WHERE name = '${name}'
            AND (DATE(detected_on) BETWEEN '${dateFrom}' AND '${dateTo}')
            GROUP BY year, month, day
            ORDER BY year ASC, month ASC, day ASC
        `);
    }

    /**
     * POST REQUESTS
     */
    async addItem(name: 'bottle' | 'utensil'): Promise<any> {
        return await this.sql(`
            INSERT INTO "Item" (name) 
            VALUES ('${name}')
        `);
    }
}
