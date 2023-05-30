require("./logger.ts");
require('dotenv').config()

// import { downloadTo } from "basic-ftp/dist/transfer";
import express from "express";
import { getWarnings } from "./floods/amoc";
import { Downloader } from "./floods/Downloader";
import { getAmocToStateId } from "./getAmocToStateId";
import { FloodWarningParser } from "./parser/floodWarning";
// import { parseXml } from "./parser/parser";

const app = express();
const port = process.env.PORT;

const ERRORMESSAGE = "Something went wrong";

app.get("/", async (req, res) => {
  try {

    const { state } = req.query;

    if(state) {

      const stateId = getAmocToStateId(state?.toString());
      
      const results = stateId ? await getWarnings(stateId) : [];

      // let results = [];
      // for (let key in data) {
      //   if (key.startsWith(state)) {
      //     results.push(key.replace(/\.amoc\.xml/, ""));
      //   }
      // }

      res.send(results);
    } else {
      res.send("No state provided");
    }

  } catch (error) {
    console.log(error);
    res.send(ERRORMESSAGE);
  }
});

app.get("/warning/:id", async (req, res) => {
  try {
    const downloader = new Downloader();
    const { id: xmlid } = req.params;

    const warning = await downloader.download(xmlid);
    const warningParser = new FloodWarningParser(warning);
    // const text = await downloader.downloadText(xmlid);

    res.send({ ...(await warningParser.getWarning()), text: await warningParser.getWarningText() || "" });
  } catch (error) {
    console.log(error);
    res.send(ERRORMESSAGE);
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
