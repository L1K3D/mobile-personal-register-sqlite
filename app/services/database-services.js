import * as SQLite from 'expo-sqlite';

// Abre conexão com o banco
export async function getDbConnection() {
    const cx = await SQLite.openDatabaseAsync('dbPersonalRegister.db');
    return cx;
}

// Cria tabela se não existir
export async function createTable() {
    const query = `
    CREATE TABLE IF NOT EXISTS tbRegisters (
      personalCode TEXT NOT NULL PRIMARY KEY,
      fullName TEXT NOT NULL,
      email TEXT NOT NULL,
      password TEXT NOT NULL
    )
  `;
    const cx = await getDbConnection();
    await cx.execAsync(query);
    await cx.closeAsync();
}

// Retorna todos os registros
export async function getAllData() {
    const cx = await getDbConnection();
    const registers = await cx.getAllAsync('SELECT * FROM tbRegisters');
    await cx.closeAsync();

    return registers.map(register => ({
        personalCode: register.personalCode,
        fullName: register.fullName,
        email: register.email,
        password: register.password
    }));
}

// Adiciona um registro
export async function addRegister(register) {
    const cx = await getDbConnection();
    const query = `
    INSERT INTO tbRegisters (personalCode, fullName, email, password)
    VALUES (?, ?, ?, ?)
  `;
    const result = await cx.runAsync(query, [
        register.personalCode,
        register.fullName,
        register.email,
        register.password
    ]);
    await cx.closeAsync();
    return result.changes === 1;
}

// Atualiza um registro existente
export async function changeRegister(register) {
    const cx = await getDbConnection();
    const query = `
    UPDATE tbRegisters
    SET fullName = ?, email = ?, password = ?
    WHERE personalCode = ?
  `;
    const result = await cx.runAsync(query, [
        register.fullName,
        register.email,
        register.password,
        register.personalCode
    ]);
    await cx.closeAsync();
    return result.changes === 1;
}

// Deleta um registro pelo código
export async function deleteRegister(personalCode) {
    const cx = await getDbConnection();
    const query = 'DELETE FROM tbRegisters WHERE personalCode = ?';
    const result = await cx.runAsync(query, [personalCode]);
    await cx.closeAsync();
    return result.changes === 1;
}

// Deleta todos os registros
export async function deleteAllRegisters() {
    const cx = await getDbConnection();
    const query = 'DELETE FROM tbRegisters';
    await cx.execAsync(query);
    await cx.closeAsync();
}