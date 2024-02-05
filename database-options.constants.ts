import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

// export const DatabaseOptions = (
//   configService: ConfigService,
// ): TypeOrmModuleOptions => ({
//   type: 'mysql',
//   host: configService.get<string>('DB_HOST', '127.0.0.1'),
//   port: configService.get<number>('DB_PORT', 3306),
//   username: configService.get<string>('DB_USERNAME', 'your_default_username'),
//   password: configService.get<string>('DB_PASSWORD', 'your_default_password'),
//   database: configService.get<string>('DB_DATABASE', 'your_default_database'),
//   entities: [__dirname + '/**/*.entity{.ts,.js}'],
//   synchronize: true,

// });

// export const DatabaseOptions = (
//   configService: ConfigService,
// ): TypeOrmModuleOptions => {
//   const dbHost = configService.get<string>('DB_HOST', '127.0.0.1');
//   const dbPort = configService.get<number>('DB_PORT', 3306);
//   const dbUsername = configService.get<string>('DB_USERNAME', 'your_default_username');
//   const dbPassword = configService.get<string>('DB_PASSWORD', 'your_default_password');
//   const dbDatabase = configService.get<string>('DB_DATABASE', 'your_default_database');

//   console.log('Database Credentials from ConfigService:');
//   console.log('DB_HOST:', dbHost);
//   console.log('DB_PORT:', dbPort);
//   console.log('DB_USERNAME:', dbUsername);
//   console.log('DB_PASSWORD:', dbPassword);
//   console.log('DB_DATABASE:', dbDatabase);

//   return {
//     type: 'mysql',
//     host: dbHost,
//     port: dbPort,
//     username: dbUsername,
//     password: dbPassword,
//     database: dbDatabase,
//     entities: [__dirname + '/**/*.entity{.ts,.js}'],
//     synchronize: true,
//   };
// };
export const DatabaseOptions: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',      // replace with your actual database host
  port: 3306,                      // replace with your actual database port
  username: 'root',  // replace with your actual database username
  password: 'root@1234',  // replace with your actual database password
  database: 'nestjs_demo',  // replace with your actual database name
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: true,
};
// type: 'mysql',
// host: 'localhost',
// port: 3306,
// username: 'root',
// password: 'root@1234',
// database: 'nestjs_demo',
// entities: [__dirname + '/**/*.entity{.ts,.js}'],
// synchronize: true,

export const DatabaseOptionsProvider = {
  provide: 'DATABASE_OPTIONS',
  //useFactory: DatabaseOptions,
  //inject: [ConfigService],
  useValue: DatabaseOptions,
};