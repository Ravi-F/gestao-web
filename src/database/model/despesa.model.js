import { DataTypes, Model } from "sequelize";
import db from "../db.js";

class Despesa extends Model {}

Despesa.init(
  {
    descricao: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    valor: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    data: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    usuarioId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    modelName: "Despesa",
    tableName: "despesas",
  }
);

export default Despesa;