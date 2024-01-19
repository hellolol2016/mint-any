import pinataSKD from "@pinata/sdk";
import axios from "axios";
import FormData from "form-data";
import fs from "fs";
// const JWT = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI1ODJhZjYyNC00Mjk1LTQ4MWItOTE0OC00NzUyZWJiOGI3NzMiLCJlbWFpbCI6ImRoYXJzaGFuMjQ1N0BnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJpZCI6IkZSQTEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX0seyJpZCI6Ik5ZQzEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiZDVjOTEzOGNhZjZkZmMwZWNjMmYiLCJzY29wZWRLZXlTZWNyZXQiOiI5NTY2NmQxYWRlYmUwN2Q1YjI3OGU2NWQ2MmQ1ZmY1NTQ1ZjM0MzRmNjU3MzkzYjljOTMwYjQxMWIxNGM2MDllIiwiaWF0IjoxNzA1NjU1NzgzfQ.FeSh0KnULUzfkePvnXkIGlhMA1GXX48BrUngEU3nAaI

export const pinFileToIPFS = async (src: string) => {
  const formData = new FormData();
  // const src = "path/to/file.png";

  const file = fs.createReadStream(src);
  formData.append("file", file);

  const pinataMetadata = JSON.stringify({
    name: "File name",
  });
  formData.append("pinataMetadata", pinataMetadata);

  const pinataOptions = JSON.stringify({
    cidVersion: 0,
  });
  formData.append("pinataOptions", pinataOptions);

  try {
    const res = await axios.post(
      "https://api.pinata.cloud/pinning/pinFileToIPFS",
      formData,
      {
        maxBodyLength: "Infinity",
        headers: {
          "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
          Authorization: `Bearer ${JWT}`,
        },
      }
    );
    console.log(res.data);
  } catch (error) {
    console.log(error);
  }
};
// pinFileToIPFS()
