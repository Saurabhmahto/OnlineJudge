const { rejects } = require("assert");
const { exec, spawn, execFileSync } = require("child_process");
const fs = require("fs");
const { resolve } = require("path");
function handleSubmit(req, res) {
  const { code, input } = req.body;

  try {
    fs.writeFileSync("./temp.cpp", code);
    fs.writeFileSync("./output.txt", "");
  } catch (error) {
    console.log(error);
  }
  const childProcess1 = exec(
    "g++ ./temp.cpp -o executable",
    (error, stdout, stderr) => {
      if (error) {
        console.log(`compilationn error1:from here`);
        return res.json({
          status: "compilationn error",
          msg:error.message,
          output: "",
        });
      }
      if (stderr) {
        console.log(`compilationn error2:${stderr}`);
        return res.json({
          status: "compilationn error",
          msg: stderr,
          output: "",
        });
      } else {
        console.log("Program compiled succesfully");
        const childProcess2 = spawn("./executable");
        childProcess2.stdout.on("data", (data) => {
          console.log(`program output:${data}`);
          fs.appendFileSync("./output.txt", data);
        });
        childProcess2.stderr.on("data", (data) => {
          console.log(`Runtime error:${data}`);
          return res.json({
            status: "Runtime error",
            msg: data,
            output: "",
          });
        });
        childProcess2.stdin.write(input, (error) => {
          if (error) {
            console.log(`Error in input:${error}`);
          } else {
            console.log(`Input taken succesfully`);
          }
        });
        childProcess2.stdin.end();
        childProcess2.on("close", (code) => {
          const outputValues = fs.readFileSync("./output.txt", "utf-8");
          return res.json({
            status: "Program executed successfully",
            msg: code,
            output: outputValues,
          });
        });
      }
    }
  );
}

module.exports = {
  handleSubmit,
};
