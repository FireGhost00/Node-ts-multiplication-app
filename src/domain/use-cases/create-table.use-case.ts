
export interface CreateTableUseCase{
execute(options: CreateTableOptions ): string;
}
export interface CreateTableOptions{
base: number;
limit?: number;
}

export class CreateTable implements CreateTableUseCase{
    constructor(

    ){}

    execute({base,limit=10}: CreateTableOptions): string{
        let outputMessage = '';
        let HeaderMessage = `
==================================
    Table of ${base}
==================================\n
`;
        outputMessage = HeaderMessage + outputMessage;
        for (let i = 1; i <= limit; i++) {
            outputMessage += `${base} x ${i} = ${base * i}\n`;
        }
        return outputMessage;
}
}