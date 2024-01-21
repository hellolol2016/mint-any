// @ts-nocheck

// still need to import greeter

// import Greeter from "./artifacts/contracts/Greeter.sol/Greeter.json";
import { ethers } from 'ethers'

import { ref } from 'vue'
import Greeter from '../artifacts/contracts/Greeter.sol/Greeter.json'
import { pinFileToIPFS, uploadJSONToIPFS } from './pinata'

const contractAddress = '0x8163647d1108E2dfF08d17CfE866822CCb45bD2B'

export const jsonUrl = ref('')
export const name = ref('')
export const description = ref('')
export const displayImage = ref('')
export const media = ref([])
export const NFTQuantity = ref('')

export const MintSuccessful = ref(false)
const jsonData = {
  name,
  description,
  displayImage,
  media,
}

export async function sayHello() {
  console.log('hello')
}
//////////////////////////////////////////
// Helper Functions

// Requests access to the user's Meta Mask Account
// https://metamask.io/
export async function requestAccount() {
  await window.ethereum.request({ method: 'eth_requestAccounts' })
}

// Sets the greeting from input text box
async function mintNFT(quantity) {
  // If MetaMask exists
  if (window.ethereum) {
    await requestAccount()

    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()

    const contract = new ethers.Contract(
      contractAddress,
      Greeter.abi,
      signer,
    )
    console.log(quantity._value)

    try {
      const transaction = await contract.mint(quantity._value, {
        value: ethers.utils.parseEther(`${quantity._value * 0.001}`),
      })

      console.log('Transaction hash:', transaction.hash)
      console.log('Waiting for transaction to be mined...')

      await transaction.wait()

      console.log('Transaction mined!')
      MintSuccessful.value = true
    }
    catch (error) {
      console.error('Error minting NFT:', error)
    }
  }
}
/////////////////////////////////////////

// handle Name in JSON
export function handleNameChange(event) {
  name.value = event.target.value
  console.log(name)
}

// handle Description in JSON
export function handleDescriptionChange(event) {
  description.value = (event.target.value)
}

// handle Display in JSON
export async function handleDisplayImage(event) {
  console.log(event.files)
  console.log(event)
  const file = event.target.files[0]
  console.log(file)
  if (file) {
    console.log(file)
    const resObj = await pinFileToIPFS(file)
    const pinataURL = resObj.pinataURL
    console.log(pinataURL)
    displayImage.value = (pinataURL)
  }

  console.log(displayImage)
}

// handle Media[] in JSON
export async function handleMediaUpload(event) {
  const files = event.target.files
  if (files) {
    const resObjArray = await Promise.all(
      Array.from(files).map(file => pinFileToIPFS(file)),
    )
    const pinataURLs = resObjArray.map(resObj => resObj?.pinataURL)
    media.value = (pinataURLs)
  }
}

// handle mint function - parameter
export function handleNFTQuantityChange(event) {
  NFTQuantity.value = event.target.value
}

export async function handleMint() {
  if (NFTQuantity) {
    await mintNFT(NFTQuantity)
    console.log(jsonData)
    await uploadJSONToIPFS(jsonData)
      .then((resObj) => {
        const newGatewayURL = resObj.pinataURL.replace(
          'https://gateway.pinata.cloud/ipfs/',
          'https://ipfs.io/ipfs/',
        )
        jsonUrl.value = newGatewayURL
      })
      .catch((error) => {
        console.error('Error uploading JSON to IPFS:', error)
      })
  }
}
