module.exports = {
  type: process.env.DATABASE_TYPE,
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: [__dirname + '/**/*.entity{ .ts,.js}'],
  migrations: [__dirname + '/**/migrations/*.ts'],
  cli: {
    migrationsDir: 'src/database/migrations',
  },
};
