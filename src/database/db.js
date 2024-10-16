import { Sequelize, DataTypes } from 'sequelize';

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite'
});

export const GuildConfig = sequelize.define('GuildConfig', {
    guildId: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    selectedChannelId: DataTypes.STRING,
    selectedRoleId: DataTypes.STRING,
    customMessage: DataTypes.STRING
});

export const initDB = async () => {
    await sequelize.sync();
};