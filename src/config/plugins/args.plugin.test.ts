//import { yarg } from './args.plugin';


const runCommand = async (args: string[]) => {
    process.argv = [...process.argv, ...args];

    const {yarg}= await import('./args.plugin');
    return yarg;
}


describe('Test args.plugin.ts', () => {   

    const orginalArgv = process.argv;
    
    beforeEach(() => {
        process.argv = orginalArgv;
        jest.resetModules();
    });

    test('should return default values', async() => {
    
        const argv= await runCommand(['-b', '2']);

        expect(argv).toEqual(expect.objectContaining({
            base: expect.any(Number),
            limit: expect.any(Number),
            show: expect.any(Boolean),
            name: expect.any(String),
            destination: expect.any(String)
        }));

        
        expect(argv.base).toBe(2);
        expect(argv.limit).toBe(10);
        expect(argv.show).toBeFalsy();
        expect(argv.name).toBe('multiplication-table');
        expect(argv.destination).toBe('outputs');



    });

    
    test('should return configuration with custom values', async() => {
    
        const argv= await runCommand(['-b', '3', '-l', '20', '-s', '-n', 'custom-table-name', '-d', 'custom-output']);

        expect(argv).toEqual(expect.objectContaining({
            base: expect.any(Number),
            limit: expect.any(Number),
            show: expect.any(Boolean),
            name: expect.any(String),
            destination: expect.any(String)
        }));

        
        expect(argv.base).toBe(3);
        expect(argv.limit).toBe(20);
        expect(argv.show).toBeTruthy();
        expect(argv.name).toBe('custom-table-name');
        expect(argv.destination).toBe('custom-output');
    });




});
