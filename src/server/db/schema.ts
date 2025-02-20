import "server-only";

import {
  text,
  singlestoreTableCreator,
  bigint,
} from "drizzle-orm/singlestore-core";
import { index } from "drizzle-orm/singlestore-core/indexes";

export const createTable = singlestoreTableCreator(
  (name) => `drive_tutorial_${name}`,
);

export const files_table = createTable(
  "files_table",
  {
    id: bigint("id", { mode: "number", unsigned: true })
      .primaryKey()
      .autoincrement(),
    name: text("name").notNull(),
    size: text("size").notNull(),
    url: text("url").notNull(),
    parent: bigint("parent", { mode: "number", unsigned: true }).notNull(),
  },
  (tempTable) => {
    return [index("parent_index").on(tempTable.parent)];
  },
);

export const folders_table = createTable(
  "folders_table",
  {
    id: bigint("id", { mode: "number", unsigned: true })
      .primaryKey()
      .autoincrement(),
    name: text("name").notNull(),
    parent: bigint("parent", { mode: "number", unsigned: true }),
  },
  (tempTable) => {
    return [index("parent_index").on(tempTable.parent)];
  },
);
