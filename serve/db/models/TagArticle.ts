import {
  Table,
  Model,
  Column,
  ForeignKey,
  DataType,
} from "sequelize-typescript";

import Tag from "./Tag.js";
import Article from "./Article.js";

@Table({
  tableName: "tagArticle",
})
export default class tagArticle extends Model {
  @ForeignKey(() => Tag)
  @Column({ type: DataType.INTEGER, comment: "标签id" })
  tagId!: number;

  @ForeignKey(() => Article)
  @Column({ type: DataType.INTEGER, comment: "标签id" })
  articleId!: number;
}
