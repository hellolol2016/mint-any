import axios from "axios";
const FormData = import("form-data");
// const fs = require("fs");
const JWT =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI1ODJhZjYyNC00Mjk1LTQ4MWItOTE0OC00NzUyZWJiOGI3NzMiLCJlbWFpbCI6ImRoYXJzaGFuMjQ1N0BnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJpZCI6IkZSQTEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX0seyJpZCI6Ik5ZQzEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiYmY5MjI5NzkxMThjNjk1MmRhODkiLCJzY29wZWRLZXlTZWNyZXQiOiIwMTAxMjRiY2NlZTQwNzI4NzdjMzY3ZmM1ZmYxYWNhNjNkODU3YmUyYjdkMTVlNDg5OWI2ZmJiN2U3N2U2ZThjIiwiaWF0IjoxNzA1NzM5MTgzfQ.Y0L6tx96pCg7YHd-Y5bp9MvtLtDmhTbItTIKmDIPJvo";
// const API Secret = 010124bccee4072877c367fc5ff1aca63d857be2b7d15e4899b6fbb7e77e6e8c
// const API Key = bf922979118c6952da89

export async function uploadJSONToIPFS(JSONBody){
  const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;
  //making axios POST request to Pinata ⬇️
  return axios
    .post(url, JSONBody, {
      headers: {
        pinata_api_key: `bf922979118c6952da89`,
        pinata_secret_api_key: `010124bccee4072877c367fc5ff1aca63d857be2b7d15e4899b6fbb7e77e6e8c`,
      },
    })
    .then(function (response) {
      console.log(response.data);
      return {
        success: true,
        pinataURL:
          "https://gateway.pinata.cloud/ipfs/" + response.data.IpfsHash,
      };
    })
    .catch(function (error) {
      console.log(error);
      return {
        success: false,
        message: error.message,
      };
    });
};

//@ts-ignore
export const pinFileToIPFS = async (file) => {
  const formData = new FormData();
  // const src = "../public/2.png";

  // const file = fs.createReadStream(src);
  formData.append("file", file);

  const pinataMetadata = JSON.stringify({
    name: "File name",
  });
  formData.append("pinataMetadata", pinataMetadata);

  // const pinataOptions = JSON.stringify({
  //   cidVersion: 0,
  // });
  // formData.append("pinataOptions", pinataOptions);
  console.log(formData);
  try {
    const res = await axios.post(
      "https://api.pinata.cloud/pinning/pinFileToIPFS",
      formData,
      {
        //@ts-ignore
        maxBodyLength: "Infinity",
        headers: {
          //@ts-ignore
          "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
          Authorization: `Bearer ${JWT}`,
        },
      }
    );
    console.log(res.data);
    return {
      success: true,
      pinataURL: "https://gateway.pinata.cloud/ipfs/" + res.data.IpfsHash,
    };
  } catch (error) {
    console.log(error);
  }
};
// pinFileToIPFS();
