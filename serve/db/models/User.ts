import {
  Table,
  Model,
  PrimaryKey,
  Column,
  DataType,
  Default,
  HasMany,
  Unique,
  AutoIncrement,
} from "sequelize-typescript";

import Article from "./Article.js";
import Tag from "./Tag.js";
import Sort from "./Sort.js";
import Resource from "./Resource.js";
@Table({
  tableName: "user",
  paranoid: true,
})
export default class User extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column({ type: DataType.INTEGER, comment: "用户id" })
  userId!: number;

  @Column({ type: DataType.STRING, comment: "昵称" })
  nickName!: string;

  @Column({ type: DataType.STRING, comment: "邮箱" })
  email!: string;

  @Column({ type: DataType.STRING, comment: "头像地址" })
  avatar!: string;

  @Default(0)
  @Column({ type: DataType.INTEGER, comment: "用户状态" })
  status!: number;

  @Column({ type: DataType.STRING, comment: "用户权限" })
  set permission(val: string[] | "*") {
    this.setDataValue("permission", JSON.stringify(val));
  }
  get permission(): string[] | "*" {
    return JSON.parse(this.getDataValue("permission"));
  }

  @HasMany(() => Article)
  articles!: Article[];

  @HasMany(() => Tag)
  tags!: Tag[];

  @HasMany(() => Sort)
  sorts!: Sort[];

  @HasMany(() => Resource)
  resources!: Resource[];
}
