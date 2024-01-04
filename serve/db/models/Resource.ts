import {
  Table,
  Model,
  PrimaryKey,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
  AllowNull,
  BelongsToMany,
} from "sequelize-typescript";

import User from "./User.js";
import Article from "./Article.js";
import ResourceArticle from "./ResourceArticle.js";

@Table({
  tableName: "resource",
})
export default class Resource extends Model {
  @PrimaryKey
  @Column({ type: DataType.STRING, comment: "资源id" })
  resourceId!: string;

  @AllowNull(false)
  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, comment: "创建者ID" })
  userId!: number;

  @Column({ type: DataType.STRING, comment: "资源路径" })
  path!: string;

  @Column({ type: DataType.STRING, comment: "资源类型" })
  type!: string;

  @BelongsTo(() => User)
  user!: User;

  @BelongsToMany(() => Article, () => ResourceArticle)
  articles!: Article[];
}
