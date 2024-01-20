import { useState, useEffect } from "react";
import { pinFileToIPFS, uploadJSONToIPFS } from "./uploadToPinata";
import Greeter from "./artifacts/contracts/Greeter.sol/Greeter.json";
import { ethers } from "ethers";
import "./App.css";
const contractAddress = "0x8163647d1108E2dfF08d17CfE866822CCb45bD2B";

function App() {
  // JSON - name, description, image, media[]
  const [jsonUrl, setJsonUrl] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [displayImage, setDisplayImage] = useState("");
  const [media, setMedia] = useState([]);
  // mint function - parameter
  const [NFTQuantity, setNFTQuantity] = useState(1);

  const jsonData = {
    name,
    description,
    displayImage,
    media,
  };

  //////////////////////////////////////////
  // Helper Functions

  // Requests access to the user's Meta Mask Account
  // https://metamask.io/
  async function requestAccount() {
    await window.ethereum.request({ method: "eth_requestAccounts" });
  }

  // Sets the greeting from input text box
  async function mintNFT(quantity) {
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
    setName(event.target.value);
  };

  // handle Description in JSON
  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  // handle Display in JSON
  const handleDisplayImage = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const resObj = await pinFileToIPFS(file);
      const pinataURL = resObj.pinataURL;
      console.log(pinataURL);
      setDisplayImage(pinataURL);
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
      const pinataURLs = resObjArray.map((resObj) => resObj.pinataURL);
      setMedia(pinataURLs);
    }
  };

  // handle mint function - parameter
  const handleNFTQuantityChange = (event) => {
    setNFTQuantity(event.target.value);
  };

  const handleMint = async () => {
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

  useEffect(() => {
    setName("");
    setDescription("");
    setDisplayImage("");
    setMedia([]);
    setNFTQuantity("");
  }, []);

  return (
    <>
      <div>
        <div>
          <p>Name</p>
          <input type="text" value={name} onChange={handleNameChange} />
          <p>Description</p>
          <input
            type="text"
            value={description}
            onChange={handleDescriptionChange}
          />
          <p># of NFT</p>
          <input
            type="number"
            value={NFTQuantity}
            onChange={handleNFTQuantityChange}
          />
          <p>display image</p>
          <input type="file" multiple onChange={handleDisplayImage} />

          <p>upload media</p>
          <input type="file" multiple onChange={handleMediaUpload} />
        </div>
        <button onClick={handleMint}>Mint</button>
        <div>
          View the
          <a href={jsonUrl} target="_blank" rel="noopener noreferrer">
            Metadata
          </a>
        </div>
        <div>
          <a
            href={`https://sepolia.etherscan.io/address/${contractAddress}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            View in Etherscan
          </a>
        </div>
        {displayImage && <img src={displayImage} alt="NTFImage" />}
      </div>
    </>
  );
}

export default App;
