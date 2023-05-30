import { Client } from "basic-ftp";

const bomConfig = {
  host: process.env.FTP_BOM_HOST || '',
  path: process.env.FTP_BOM_PATH || '',
}

export async function getWarnings(stateId: string) {
  const client = new Client();
  client.ftp.verbose = true;
  try {
    await client.access({
      host: bomConfig.host,
      secure: false,
    });

    await client.cd(bomConfig.path);

    const files = await client.list();

    let warns: any = [];

    warns = files
    ?.filter((file) => file.name.startsWith(stateId) && file.name.endsWith(".amoc.xml"))
    ?.map((file) => file.name.replace(/\.amoc\.xml/, ""));

    // for (var file in files) {
    //   if (files[file].name.endsWith(".amoc.xml")) {
    //     warns[files[file].name] = true;
    //   }
    // }

    return warns;
  } catch (err) {
    console.log(err);
  }

  client.close();
}

export function getWarning(id: string) {
  //
}
