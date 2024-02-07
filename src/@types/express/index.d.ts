declare namespace Express {
    export interface Request {
        user: {
            id: string;
            nivel: string;
            company_id: string;
        };
    }
}