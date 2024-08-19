    import { Injectable } from '@nestjs/common';
    import * as mysql from 'mysql2/promise';
    import { databaseConfig } from '../config/database.config';

    @Injectable()
    export class DatabaseService {
    private pool: mysql.Pool;

    constructor() {
        this.pool = mysql.createPool(databaseConfig);
    }

    async query(sql: string, values: any[] = []) {
        const [results] = await this.pool.execute(sql, values);
        return results;
    }

    async callProcedure(procedureName: string, params: any[]): Promise<any> {
        const placeholders = params.map(() => '?').join(',');
        const [results] = await this.pool.query(
        `CALL ${procedureName}(${placeholders})`,
        params,
        );
        return results;
    }
    }
