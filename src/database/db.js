import { Sequelize } from "sequelize";

const sequelize = new Sequelize("db_gestao", "postgres", "12345678", {
  host: "localhost",
  dialect: "postgres",
});

export default sequelize;
