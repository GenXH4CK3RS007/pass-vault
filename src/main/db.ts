import { verbose as sqliteVerbose } from 'sqlite3';
import { Sequelize, DataTypes, ModelCtor, Model } from 'sequelize';
import fs from 'fs/promises';
import path from 'path';
// const EncryptedField = require('sequelize-encrypted');
export const DB_FILE_NAME = 'pass-vault-data.db';
const sqlite3 = sqliteVerbose();

let PasswordCtor: ModelCtor<Model<any, any>>;
export async function init(dataFolder: string) {
  try {
    const filePath = path.join(dataFolder, DB_FILE_NAME);

    let isCreateDBSuccess = true;
    const database = new sqlite3.Database(
      filePath,
      sqlite3.OPEN_READWRITE,
      (err) => {
        if (err) {
          console.error(err.message);
          isCreateDBSuccess = false;
        }
        console.log('Connected to the chinook database.');
      },
    );

    if (!isCreateDBSuccess) return false;
    const sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: filePath,
    });

    PasswordCtor = sequelize.define('password', {
      key: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      value: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    });
    await sequelize.authenticate();
    await sequelize.sync();
    return true;
  } catch (error) {
    return false;
  }
}

export async function newPassword(key: string, value: string) {
  return (await PasswordCtor.create({ key, value })).toJSON();
}

export async function getPasswords() {
  return (await PasswordCtor.findAll()).map((v) => v.toJSON());
}
