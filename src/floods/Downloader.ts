import { Client } from "basic-ftp";

import fs from "fs";

const bomConfig = {
  host: process.env.FTP_BOM_HOST || '',
  path: process.env.FTP_BOM_PATH || '',
}
export class Downloader {
  async download(key: string) {
    const client = new Client();
    client.ftp.verbose = true;
    try {
      await client.access({
        host: bomConfig.host,
        secure: false,
      });

      await client.cd(bomConfig.path);

      const files = await client.list();

      const file = files
      ?.filter((file) => file.name.endsWith(".amoc.xml") && `${key}.amoc.xml` == file.name);

      if(file) {
        await client.downloadTo(`./src/tmp/xml/${key}.xml`, file[0].name);
        await client.downloadTo(`./src/tmp/txt/${key}.txt`, key + ".txt");
      }

      // for (var file in files) {
      //   if (files[file].name.endsWith(".amoc.xml")) {
      //     if (`${key}.amoc.xml` == files[file].name) {
      //       await client.download(`./${key}.xml`, files[file].name);
      //     }
      //   }
      // }

      client.close();

      const data = this.readData(key, "xml");
      const text = this.readData(key, "txt");

      return {data, text};
    } catch (err) {
      console.log(key + " file not found");
      return {};
    } finally{
      client.close();
    }

  }

  readData(key: string, ext: string): string {
    return fs.readFileSync(`./src/tmp/${ext}/${key}.${ext}`, { encoding: "utf-8" });
  }

  async downloadText(key: string) {
    const client = new Client();
    client.ftp.verbose = true;
    let warningText = "";
    try {
      await client.access({
        host: bomConfig.host,
        secure: false,
      });

      await client.cd(bomConfig.path);

      await client.downloadTo(`./${key}.txt`, key + ".txt");

      warningText = this.readData(key, "txt");

      // warningText = fs.readFileSync(`./${key}.txt`, {
      //   encoding: "utf-8",
      // });

    } catch (err) {
      console.log(key + " file not found");
      return "";
    }

    client.close();

    return warningText;
  }
}
