export class Response<T> {
    data: T | null;
    status: boolean;
    message: string;
    userId: number;
    role: string;

    constructor(data: T | null = null, status: boolean = false, message: string = '') {

        this.data = data;
        this.message = message;
        this.status = status
    }
}