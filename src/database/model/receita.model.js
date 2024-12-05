import { DataTypes, Model } from "sequelize";
import db from "../db.js";

class Receita extends Model {}

Receita.init(
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
    modelName: "Receita",
    tableName: "receitas",
  }
);

export default Receita;