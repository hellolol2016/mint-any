/* eslint-disable import/order */

import { pinFileToIPFS,uploadJSONToIPFS } from "./pinata";

//still need to import greeter
//import Greeter from "./artifacts/contracts/Greeter.sol/Greeter.json";
import { ethers } from "ethers";
import { ref } from "vue"; 

const contractAddress = "0x8163647d1108E2dfF08d17CfE866822CCb45bD2B";


const jsonUrl = ref("")
const name = ref("")
const description = ref("")
const displayImage = ref("")
const media = ref([])
const NFTQuantity = ref("")

const jsonDate = {
  name,
  description,
  displayImage,
  media
}


export async function sayHello(){
  console.log("hello");
}


//////////////////////////////////////////
// Helper Functions

// Requests access to the user's Meta Mask Account
// https://metamask.io/
export async function requestAccount() {
  await window.ethereum.request({ method: "eth_requestAccounts" });
}

// Sets the greeting from input text box
export async function mintNFT(quantity) {
  // If MetaMask exists
  if (typeof window.ethereum !== "undefined") {
    await requestAccount();

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    const contract = new ethers.Contract(
      contractAddress,
      Greeter.abi,
      signer
    );

    try {
      const transaction = await contract.mint(quantity, {
        value: ethers.utils.parseEther(`${quantity * 0.001}`),
      });

      console.log("Transaction hash:", transaction.hash);
      console.log("Waiting for transaction to be mined...");

      await transaction.wait();

      console.log("Transaction mined!");
    } catch (error) {
      console.error("Error minting NFT:", error);
    }
  }
}
/////////////////////////////////////////


// handle Name in JSON
const handleNameChange = (event) => {
  name.value = event.target.value;
};

// handle Description in JSON
const handleDescriptionChange = (event) => {
  description.value=(event.target.value);
};

// handle Display in JSON
const handleDisplayImage = async (event) => {
  const file = event.target.files[0];
  if (file) {
    const resObj = await pinFileToIPFS(file);
    const pinataURL = resObj.pinataURL;
    console.log(pinataURL);
    displayImage.value=(pinataURL);
  }

  console.log(displayImage);
};

// handle Media[] in JSON
const handleMediaUpload = async (event) => {
  const files = event.target.files;
  if (files) {
    const resObjArray = await Promise.all(
      Array.from(files).map((file) => pinFileToIPFS(file))
    );
    const pinataURLs = resObjArray.map((resObj) => resObj?.pinataURL);
    media.value=(pinataURLs);
  }
};

  // handle mint function - parameter
export const handleNFTQuantityChange = (event) => {
  setNFTQuantity(event.target.value);
};

export const handleMint = async () => {
  if (NFTQuantity) {
    mintNFT(NFTQuantity);
    console.log(jsonData);
    await uploadJSONToIPFS(jsonData)
      .then((resObj) => {
        setJsonUrl(resObj.pinataURL);
      })
      .catch((error) => {
        console.error("Error uploading JSON to IPFS:", error);
      });
  }
  };