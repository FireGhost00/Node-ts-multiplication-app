import { SaveFile } from './save-file.use-case';
import fs from 'fs';



describe ('SaveFileUseCase', () => {
    
    const options = {
        fileContent: 'test content',
        fileDestination: 'custom-output/file-destination',
        fileName: 'custom-table-name'
    }
    const filePath = `${options.fileDestination}/${options.fileName}.txt`;
  

    afterEach(() => {
      const outputFolderExists = fs.existsSync('outputs');
      if (outputFolderExists) fs.rmdirSync('outputs', {recursive: true});

      const customOutputFolderExists = fs.existsSync('custom-output');
        if (customOutputFolderExists) fs.rmdirSync('custom-output', {recursive: true});
        


    });



    test('should save file with default values', () => {

        const saveFileInstance = new SaveFile();
        const options = {
            fileContent: 'test content'
        }
        const filePath = 'outputs/table.txt';
        const result = saveFileInstance.execute(options);

        const checkFile = fs.existsSync(filePath);
        const fileContent = fs.readFileSync(filePath, 'utf-8');   
        
        expect(result).toBeTruthy();
        expect(checkFile).toBeTruthy();
        expect(fileContent).toBe(options.fileContent);

        
    
    });

    test('should save file with custom values', () => {
        const saveFileInstance = new SaveFile();
        
        const result = saveFileInstance.execute(options);
        const filesExists = fs.existsSync(filePath);
        const fileContent = fs.readFileSync(filePath, 'utf-8');   
        
        expect(result).toBeTruthy();
        expect(filesExists).toBeTruthy();
        expect(fileContent).toBe(options.fileContent);

    });

    test('should return false if directory could not be created', () => {


        const saveFile = new SaveFile();
        const mkdirSpy = jest.spyOn(fs, 'mkdirSync').mockImplementation(
            () => {throw new Error('Error creating directory')}
        );

        const result = saveFile.execute(options);

        expect(result).toBeFalsy();

        mkdirSpy.mockRestore();

    });

    test('should return false if file could not be created', () => {


        const saveFile = new SaveFile();
       

        const writeFileSyncSpy = jest.spyOn(fs, 'writeFileSync').mockImplementation(
            () => {throw new Error('Error creating file')}
        );

        const result = saveFile.execute({fileContent: 'Hola'});

        

        expect(result).toBeFalsy();

        writeFileSyncSpy.mockRestore();

    });

});