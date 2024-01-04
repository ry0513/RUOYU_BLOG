import {
  Table,
  Model,
  PrimaryKey,
  Column,
  DataType,
  AutoIncrement,
  ForeignKey,
  BelongsToMany,
  BelongsTo,
  Default,
  AllowNull,
} from "sequelize-typescript";

import User from "./User.js";
import Article from "./Article.js";
import TagArticle from "./TagArticle.js";

/**
 * @description 数据库 Tag 表
 */
@Table({
  tableName: "tag",
  paranoid: true,
})
export default class Tag extends Model {
  /**
   * @description 标签id
   */
  @PrimaryKey
  @AutoIncrement
  @Column({ type: DataType.INTEGER, comment: "标签id" })
  tagId!: number;

  @Column({ type: DataType.STRING, comment: "标签名称" })
  content!: string;

  @Column({ type: DataType.STRING, comment: "理由" })
  reason!: string;

  @AllowNull(false)
  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, comment: "创建者" })
  userId!: number;

  @Default(0)
  @Column({ type: DataType.INTEGER, comment: "状态[0审核1正常2驳回]" })
  status!: number;

  @Column({ type: DataType.STRING, comment: "备注" })
  remark!: string;

  @BelongsTo(() => User)
  user!: User;

  @BelongsToMany(() => Article, () => TagArticle)
  articles!: Article[];
}
