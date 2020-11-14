import { Model , DataTypes } from 'sequelize';
import { sequelize } from '../index';

class Feedback extends Model {
  public id!: string;

  public performanceId!: string;

  public reviewerId!: string;

  public feedback!: string;
}

Feedback.init(
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
    reviewerId: {
      type: DataTypes.STRING(64),
      allowNull: false
    },
    feedback: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  },
  {
    sequelize,
    tableName: 'feedback',
    underscored: true,
    timestamps: true
  }
);

export { Feedback };
