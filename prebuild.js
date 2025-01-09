const fs = require("fs").promises;

async function deleteFolder(path) {
  try {
    await fs.rm(path, { recursive: true, force: true });
  } catch (error) {
    console.error(`Error while deleting folder ${path}.`, error);
  }
}

deleteFolder(process.cwd() + "/public/optimised");
