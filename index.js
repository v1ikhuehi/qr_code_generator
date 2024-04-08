import inquirer from "inquirer";
import fs from "fs";
import qr from "qr-image";

const question = {
  type: "input",
  name: "url",
  message: "Enter the website url",
};

//
inquirer
  .prompt([question])
  .then((answers) => {
    // Use user feedback for... whatever!!

    const qr_png = qr.image(answers.url, { type: "png" });

    qr_png.pipe(fs.createWriteStream("qr-image.png"));

    fs.writeFile(
      "weburl.txt",
      answers.url,
      (err) => {
        console.log("error occured while writing files", err);
      },
      console.log("file saved successfully.")
    );
  })
  .catch((error) => {
    if (error.isTtyError) {
      console.log("error occured", error);
    } else {
      console.log("error", error);
    }
  });
