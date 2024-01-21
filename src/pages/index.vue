<script setup lang="ts">
import { ref } from 'vue'

import { MintSuccessful, NFTQuantity, description, displayImage, handleDescriptionChange, handleMint, handleNFTQuantityChange, handleNameChange, jsonUrl, media, name } from '../lib/backend.js'
import { pinFileToIPFS, uploadJSONToIPFS } from '../lib/pinata.js'

const { t } = useI18n()

async function handleMediaUpload(event) {
  const files = event.target.files
  console.log(files)
  console.log(event)
  if (files) {
    console.log(files)
    const resObjArray = await Promise.all(
      Array.from(files).map(file => pinFileToIPFS(file)),
    )
    const pinataURLs = resObjArray.map(resObj => resObj?.pinataURL)
    media.value = (pinataURLs)
    console.log(media)
    console.log(media.value)
  }
}

async function handleDisplayImage(event) {
  console.log(event.files)
  console.log(event)
  const file = event.target.files[0]
  console.log(file)
  if (file) {
    console.log(file)
    const resObj = await pinFileToIPFS(file)
    const pinataURL = resObj.pinataURL
    console.log(pinataURL)
    const newGatewayURL = pinataURL.replace(
      'https://gateway.pinata.cloud/ipfs/',
      'https://ipfs.io/ipfs/',
    )

    displayImage.value = newGatewayURL
  }

  console.log(displayImage)
  console.log(displayImage._value)
  console.log(displayImage.value)
}

// const router = useRouter()

function go() {
  // THIS FUNCTION IS THE SUBMIT FUNCTION
  if (name.value)
    router.push(`/hi/${encodeURIComponent(name.value)}`)
}

// const contractAddress = 'p0x8163647d1108E2dfF08d17CfE866822CCb45bD2B'
// Function that loads the image from the backend
// TO-DO
</script>

<template>
  <div>
    <div flex justify-center text-4xl>
      <img src="/minty.svg" alt="logo" style="color: aliceblue; height:60px">
    </div>
    <p>
      <a rel="noreferrer" href="https://github.com/antfu/vitesse" target="_blank">
        Mint-Any
      </a>
    </p>
    <p>
      <em text-sm opacity-75>{{ "A digital minting DAPP" }}</em>
    </p>

    <div py-4 />

    <p>Create your NFTs</p>

    <TheInput
      v-model="name"
      :placeholder="t('NFT NAME')"
      autocomplete="false"
      @change="handleNameChange"
    />
    <label class="hidden" for="input">{{ t('NFT name') }}</label>

    <TheInput
      v-model="description"
      :placeholder="t('NFT description')"
      autocomplete="false"
      @change="handleDescriptionChange"
    />
    <label class="hidden" for="input">{{ t('NFT description') }}</label>

    <TheInput
      v-model="NFTQuantity"
      :placeholder="t('# of NFTS to mint')"
      autocomplete="false"
      @change="handleNFTQuantityChange"
    />
    <label class="hidden" for="input">{{ t('# of NFTS to mint') }}</label>

    <div class="button-container">
      <div style="block">
        <p>Display Image</p>
        <input type="file" accept="image/*" @change="handleDisplayImage">
      </div>

      <div style="block">
        <p>Media File</p>
        <input type="file" multiple @change="handleMediaUpload">
      </div>
    </div>

    <div>
      <!-- removed for testing functionality :disabled="!name" -->
      <button
        class="go-button"
        m-2 text-sm btn
        @click="handleMint"
      >
        {{ t('button.go') }}
      </button>

      <div style="display: flex; justify-content: center; align-items: center">
        <div class="image">
          <img v-if="MintSuccessful" :src="displayImage" alt="Display Image">
        </div>
      </div>
      <div>
        View the
        <a :href="jsonUrl" target="_blank" rel="noopener noreferrer">
          Metadata
        </a>
      </div>
      <div>
        <a
          href="https://sepolia.etherscan.io/address/0x8163647d1108E2dfF08d17CfE866822CCb45bD2B"
          target="_blank"
          rel="noopener noreferrer"
        >
          View in Etherscan
        </a>
      </div>
    </div>
  </div>
</template>

<!-- <route lang="yaml">
meta:
  layout: home
</route> -->

<style scoped>
  .button-container {
  display: flex;
  justify-content: center;
  gap: 20px;
  padding: 20px;
}
.go-button {
  width: 100px;
}
.image {
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 90%;
  width: 512px;
  height: 512px;
  margin: 0 25px;
  border: 3px solid green;
  border-radius: 4px;
  overflow: hidden;
}

.image img {
  width: 512px;
  height: 512px;
  border-radius: 6px;
}
</style>
