import { Model, DataTypes } from "sequelize";
import { sequelize } from "../index";

class Review extends Model {
  public id!: string;

  public performanceId!: string;

  public employeeId!: string;
}

Review.init(
  {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    },
    performanceId: {
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
    tableName: 'review',
    underscored: true
  }
);

export { Review };
