import { DataTypes, Model } from "sequelize";
import { sequelize } from "../DBconnection";

export interface BabyNameAttributes {
  id?: number;
  name: string;
  sex: string;
}

export class BabyName extends Model<BabyNameAttributes> implements BabyNameAttributes {
  public id!: number;
  public name!: string;
  public sex!: string;
}

BabyName.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sex: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "baby_names",
    sequelize, 
    timestamps: false,
  }
);
