import { verbose as sqliteVerbose } from 'sqlite3';
import { Sequelize, DataTypes, ModelCtor, Model } from 'sequelize';
import crypto from 'crypto';
import path from 'path';

const EncryptedField = require('sequelize-encrypted');

export const DB_FILE_NAME = 'pass-vault-data.db';
export const KEY_FILE_NAME = 'pass-vault-key.dt';
const sqlite3 = sqliteVerbose();

let PasswordCtor: ModelCtor<Model<any, any>>;

export async function newPassword(key: string, value: string) {
  try {
    const password: any = PasswordCtor.build();
    password.key = key;
    password.value = value;
    password.save();
    return true;
  } catch (error) {
    if (error && (error as any).code === 'ERR_OSSL_BAD_DECRYPT') {
      return 'wrong_passkey';
    }
    return undefined;
  }
}

export async function getPasswords() {
  try {
    return (await PasswordCtor.findAll()).map((v) => v.toJSON());
  } catch (error) {
    if (error && (error as any).code === 'ERR_OSSL_BAD_DECRYPT') {
      return 'wrong_passkey';
    }
    return undefined;
  }
}

export async function init(dataFolder: string, passkey: string) {
  try {
    const dbFilePath = path.join(dataFolder, DB_FILE_NAME);
    // const keyFilePath = path.join(dataFolder, KEY_FILE_NAME);

    let isCreateDBSuccess = true;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const database = new sqlite3.Database(
      dbFilePath,
      sqlite3.OPEN_READWRITE,
      (err) => {
        if (err) {
          isCreateDBSuccess = false;
        }
      },
    );

    if (!isCreateDBSuccess) return false;

    const sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: dbFilePath,
    });

    const encryptedField = EncryptedField(
      Sequelize,
      crypto.createHash('sha256').update(passkey).digest('hex'),
    );

    PasswordCtor = sequelize.define('password', {
      key: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      encrypted: encryptedField.vault('encrypted'),
      value: encryptedField.field('value', {
        type: DataTypes.STRING,
        allowNull: false,
      }),
    });
    await sequelize.authenticate();
    await sequelize.sync();
    await getPasswords();
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}
