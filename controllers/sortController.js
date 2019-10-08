const fs = require("fs");
const path = require("path");

exports.asc = (req, res, next) => {
  fs.readFile(
    path.join(__dirname, "../assets/original.txt"),
    "utf-8",
    (error, data) => {
      data = data
        .replace(/;/g, "")
        .split("\r\n")
        .map(arr => {
          arr = JSON.parse(arr);
          return arr.sort((a, b) => a - b);
        });

      sortedData = data.map(arr => `${JSON.stringify(arr)};\r\n`).join("");
      fs.writeFile(
        path.join(__dirname, "../assets/sorted.txt"),
        sortedData,
        err => {
          if (err) {
            res.status(500).json({ error, message: "Error creating file" });
          }
        }
      );

      if (error) {
        res.status(500).json({ error, message: "There was a read file error" });
      }

      res.status(200).json(data);
    }
  );
};

exports.des = (req, res, next) => {
  fs.readFile(
    path.join(__dirname, "../assets/original.txt"),
    "utf-8",
    (error, data) => {
      data = data
        .replace(/;/g, "")
        .split("\r\n")
        .map(arr => {
          arr = JSON.parse(arr);
          return arr.sort((a, b) => b - a);
        });

      sortedData = data.map(arr => `${JSON.stringify(arr)};\r\n`).join("");
      fs.writeFile(
        path.join(__dirname, "../assets/sorted.txt"),
        sortedData,
        err => {
          if (err) {
            res.status(500).json({ error, message: "Error creating file" });
          }
        }
      );

      if (error) {
        res.status(500).json({ error, message: "There was a read file error" });
      }

      res.status(200).json(data);
    }
  );
};

exports.mix = (req, res, next) => {
  fs.readFile(
    path.join(__dirname, "../assets/original.txt"),
    "utf-8",
    (error, data) => {
      data = data
        .replace(/;/g, "")
        .split("\r\n")
        .map((arr, i) => {
          arr = JSON.parse(arr);
          if (i % 2 === 0) arr.sort((a, b) => a - b);
          else arr.sort((a, b) => b - a);
          return arr;
        });

      sortedData = data
        .map((arr, index) => {
          if (index !== data.length - 1) {
            return `${JSON.stringify(arr)};\r\n`;
          }
          return `${JSON.stringify(arr)};`;
        })
        .join("");
      fs.writeFile(
        path.join(__dirname, "../assets/sorted.txt"),
        sortedData,
        err => {
          if (err) {
            res.status(500).json({ error, message: "Error creating file" });
          }
        }
      );

      if (error) {
        res.status(500).json({ error, message: "There was a read file error" });
      }

      res.status(200).json(data);
    }
  );
};

exports.original = (req, res, next) => {
  res.sendFile(path.join(__dirname, "../assets/original.txt"));
};

exports.sorted = (req, res, next) => {
  res.sendFile(path.join(__dirname, "../assets/sorted.txt"));
};
