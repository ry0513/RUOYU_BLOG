import {
  Table,
  Model,
  PrimaryKey,
  Column,
  DataType,
  AutoIncrement,
  ForeignKey,
  HasMany,
  BelongsTo,
  AllowNull,
} from "sequelize-typescript";

import User from "./User.js";
import Article from "./Article.js";

@Table({
  tableName: "sort",
  paranoid: true,
})
export default class Sort extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column({ type: DataType.INTEGER, comment: "标签id" })
  sortId!: number;

  @Column({ type: DataType.STRING, comment: "标签名称" })
  content!: string;

  @AllowNull(false)
  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, comment: "创建者" })
  userId!: number;

  @BelongsTo(() => User)
  user!: User;

  @HasMany(() => Article)
  articles!: Article[];
}
