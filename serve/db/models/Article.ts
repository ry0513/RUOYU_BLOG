import {
  Table,
  Model,
  PrimaryKey,
  Column,
  DataType,
  AutoIncrement,
  ForeignKey,
  BelongsToMany,
  Default,
  BelongsTo,
  AllowNull,
} from "sequelize-typescript";

import User from "./User.js";
import Tag from "./Tag.js";
import Sort from "./Sort.js";
import TagArticle from "./TagArticle.js";
import Resource from "./Resource.js";
import ResourceArticle from "./ResourceArticle.js";

@Table({
  tableName: "article",
  paranoid: true,
})
export default class Article extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column({ type: DataType.INTEGER, comment: "文章id" })
  articleId!: number;

  @ForeignKey(() => User)
  @AllowNull(false)
  @Column({ type: DataType.INTEGER, comment: "作者id" })
  userId!: number;

  @ForeignKey(() => Sort)
  @Column({ type: DataType.INTEGER, comment: "分类id" })
  sortId!: number;

  @Column({ type: DataType.STRING, comment: "标题" })
  title!: string;

  @Column({
    type: DataType.INTEGER,
    comment: "编辑器类型[0WangEditor,1Markdown]",
  })
  editorType!: number;

  @Column({ type: DataType.TEXT, comment: "HTML" })
  html!: string;

  @Column({ type: DataType.TEXT, comment: "Markdown" })
  markdown!: string;

  @Default("")
  @Column({ type: DataType.TEXT, comment: "前言" })
  foreword!: string;

  @Column({ type: DataType.TEXT, comment: "格式后的HTML" })
  formatHtml!: string;

  @Column({
    type: DataType.INTEGER,
    comment: "类型[0无图1一图2二图3三图]",
  })
  type!: string;

  @Column({ type: DataType.STRING, comment: "封面图片" })
  set images(val: string[]) {
    this.setDataValue("images", JSON.stringify(val));
  }
  get images(): string[] {
    if (this.getDataValue("images")) {
      return JSON.parse(this.getDataValue("images"));
    }
    return [];
  }

  @Column({ type: DataType.DATE, comment: "发布时间" })
  releaseAt!: Date;

  @Column({
    type: DataType.INTEGER,
    comment: "状态[0草稿1审核2发布3驳回9回收站]",
  })
  status!: number;

  @Default("")
  @Column({ type: DataType.STRING, comment: "密码" })
  password!: string;

  @Default(true)
  @Column({ type: DataType.BOOLEAN, comment: "是否公开" })
  publicly!: boolean;

  @BelongsTo(() => User)
  user!: User;

  @BelongsTo(() => Sort)
  sort!: Sort;

  @BelongsToMany(() => Tag, () => TagArticle)
  tags!: Tag[];

  @BelongsToMany(() => Resource, () => ResourceArticle)
  resources!: Resource[];
}
