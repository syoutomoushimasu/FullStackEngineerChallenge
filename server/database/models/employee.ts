import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../index';

class Employee extends Model {
  public id!: string;

  public name!: string;

  public email!: string;
}

Employee.init(
  {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(64),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(64),
      allowNull: true
    }
  },
  {
    sequelize,
    tableName: 'employee',
    underscored: true
  }
);

export { Employee };
