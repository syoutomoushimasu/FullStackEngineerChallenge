import { Model, DataTypes } from "sequelize";
import { sequelize } from "../index";

class Performance extends Model {
  public id!: string;

  public title!: string;

  public employeeId!: string;
}

Performance.init(
  {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING(64),
      allowNull: false
    },
    employeeId: {
      type: DataTypes.STRING(64),
      allowNull: false
    }
  },
  {
    sequelize,
    tableName: 'performance',
    underscored: true
  }
)

export { Performance };
