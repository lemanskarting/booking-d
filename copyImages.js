// const { exec } = require("child_process");
const fs = require("fs");

// Create a symbolic link to the public folder
// exec(
//   `ln -s "${process.cwd()}/public/images" "${process.cwd()}/public/admin/public"`
// );
// exec(
//   `cp -r "${process.cwd()}/public/images" "${process.cwd()}/public/admin/public/images"`
// );

// // copy directory
fs.cp(
  `${process.cwd()}/public/images`,
  `${process.cwd()}/public/admin/public/images`,
  { recursive: true },
  (err) => {
    if (err) {
      console.error(err);
    }
  }
);
