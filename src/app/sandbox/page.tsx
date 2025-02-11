import { db } from "~/server/db";
import { files, folders } from "~/server/db/schema";
import { mockFiles, mockFolders } from "~/lib/mock-data";

export default function SandboxPage() {
  return (
    <div className="flex flex-col gap-4">
      Seed Function{" "}
      <form
        action={async () => {
          "use server";

          const folderInsert = await db.insert(folders).values(
            mockFolders.map((folder, index) => ({
              id: index + 1,
              name: folder.name,
              parent: index !== 0 ? 1 : null,
            })),
          );
          const fileInsert = await db.insert(files).values(
            mockFiles.map((file, index) => ({
              id: index + 1,
              name: file.name,
              size: file.size,
              url: file.url,
              parent: (index % 3) + 1,
            })),
          );

          console.log(folderInsert);
          console.log(fileInsert);
        }}
      >
        <button type="submit">Seed</button>
      </form>
    </div>
  );
}
