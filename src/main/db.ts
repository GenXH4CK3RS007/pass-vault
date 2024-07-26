import { verbose as sqliteVerbose } from 'sqlite3';
import { Sequelize, DataTypes } from 'sequelize';
// const EncryptedField = require('sequelize-encrypted');

const sqlite3 = sqliteVerbose();
const database = new sqlite3.Database(':memory:');

const sequelize = new Sequelize({
  dialect: 'sqlite',
});

const PasswordCtor = sequelize.define('password', {
  key: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  value: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export async function init() {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    await PasswordCtor.create({ key: 'adgdg', value: 'ffh' });
    await PasswordCtor.create({ key: 'vrrfv', value: 'jyrg' });
    await PasswordCtor.create({ key: 'ewfgwg', value: 'gfdrh' });
    await PasswordCtor.create({ key: 'rhsrfr', value: 'htd' });
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
