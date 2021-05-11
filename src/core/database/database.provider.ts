/* eslint-disable prettier/prettier */
import { Sequelize } from 'sequelize';
import { DEVELOPMENT, PRODUCTION, SEQUELIZE, TEST } from '../constants';
import { databaseConfig } from './database.config';

export const databaseProviders = [
  {
    provide: SEQUELIZE,
    useFactory: async () => {
      let config;
      switch (process.env.NODE_ENV) {
        case DEVELOPMENT:
          config = databaseConfig.development;
          break;
        case TEST:
          config = databaseConfig.test;
          break;
        case PRODUCTION:
          config = databaseConfig.production;
        default:
          config = databaseConfig.development;
      }
      const sequelize = new Sequelize(config);
      // sequelize.addModels(['models goes here']);
      await sequelize.sync();
      return sequelize;
    },
  },
];
