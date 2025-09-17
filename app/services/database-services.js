import * as SQLite from 'expo-sqlite/next';

export async function getDbConnection() {
    const cx = await SQLite.openDatabaseAsync('dbPersonalRegister.db');
    return cx;
}

export async function createTable() {    
    const query = `CREATE TABLE IF NOT EXISTS tbRegisters
        (
            personalCode TEXT NOT NULL PRIMARY KEY,
            fullName TEXT NOT NULL,
            email TEXT NOT NULL,
            password TEXT NOT NULL          
        )`;
    var cx = await getDbConnection();
    await cx.execAsync(query);   
    await cx.closeAsync() ;
};

export async function getAllData() {

    var result = []
    var dbCx = await getDbConnection();
    const registers = await dbCx.getAllAsync('SELECT * FROM tbRegisters');
    await dbCx.closeAsync() ;

    for (const register of registers) {        
        let obj = {
            personalCode: register.personalCode,
            fullName: register.fullName,
            email: register.email,
            password: register.password            
        }
        result.push(obj);
    }

    return result;
}

export async function addRegister(register) {    
    let dbCx = await getDbConnection();    
    let query = 'INSERT INTO tbRegisters (personalCode, fullName, email, password values (?,?,?,?)';
    const result = await dbCx.runAsync(query, [register.personalCode, register.fullName, register.email, register.password]);    
    await dbCx.closeAsync() ;    
    return result.changes == 1;    
}

export async function changeRegister(register) {
    let dbCx = await getDbConnection();
    let query = 'UPDATE tbRegisters set fullName=?, email=?, password=? WHERE personalCode=?';
    const result = await dbCx.runAsync(query, [register.fullName, register.email, register.password, register.personalCode]);
    await dbCx.closeAsync() ;
    return result.changes == 1;
}

export async function deleteRegister(personalCode) {
    let dbCx = await getDbConnection();
    let query = 'DELETE FROM tbRegisters WHERE personalCode=?';
    const result = await dbCx.runAsync(query, personalCode);
    await dbCx.closeAsync() ;
    return result.changes == 1;    
}

export async function deleteAllRegisters() {
    let dbCx = await getDbConnection();
    let query = 'DELETE FROM tbRegisterss';    
    await dbCx.execAsync(query);    
    await dbCx.closeAsync() ;
}