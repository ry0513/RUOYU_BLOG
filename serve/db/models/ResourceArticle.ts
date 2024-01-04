import {
  Table,
  Model,
  Column,
  ForeignKey,
  DataType,
} from "sequelize-typescript";

import Resource from "./Resource.js";
import Article from "./Article.js";

@Table({
  tableName: "resourceArticle",
})
export default class resourceArticle extends Model {
  @ForeignKey(() => Resource)
  @Column({ type: DataType.INTEGER, comment: "资源id" })
  resourceId!: number;

  @ForeignKey(() => Article)
  @Column({ type: DataType.INTEGER, comment: "文章id" })
  articleId!: number;
}
