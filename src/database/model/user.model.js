import { DataTypes, Model } from "sequelize";
import db from "../db.js";
import Receita from "./receita.model.js";  // Adicione esta linha
import Despesa from "./despesa.model.js";  // Adicione esta linha, se necessário

class User extends Model {}

User .init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    modelName: "User ",
    tableName: "users",
    timestamps: true, // Certifique-se de que isso está habilitado
  }
);

// Definindo a relação entre User, Receita e Despesa
User .hasMany(Receita, { foreignKey: 'usuarioId' });
User .hasMany(Despesa, { foreignKey: 'usuarioId' });

export default User;