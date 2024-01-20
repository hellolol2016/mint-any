<script setup lang="ts">
import FileUpload from 'primevue/fileupload'

defineOptions({
  name: 'IndexPage',
})
const user = useUserStore()
const name = ref(user.savedName)

const router = useRouter()
function go() {
  // THIS FUNCTION IS THE SUBMIT FUNCTION
  if (name.value)
    router.push(`/hi/${encodeURIComponent(name.value)}`)
}

const { t } = useI18n()
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
      @keydown.enter="go"
    />
    <label class="hidden" for="input">{{ t('NFT name') }}</label>

    <TheInput
      v-model="name"
      :placeholder="t('NFT description')"
      autocomplete="false"
      @keydown.enter="go"
    />
    <label class="hidden" for="input">{{ t('NFT description') }}</label>

    <TheInput
      v-model="name"
      :placeholder="t('# of NFTS to mint')"
      autocomplete="false"
      @keydown.enter="go"
    />
    <label class="hidden" for="input">{{ t('# of NFTS to mint') }}</label>

    <div class="button-container">
      <div style="block">
        <p>Display Image</p>
        <FileUpload mode="basic" name="demo[]" url="/api/upload" accept="image/*" :max-file-size="1000000" />
      </div>

      <div style="block">
        <p>Media File</p>
        <FileUpload mode="basic" name="demo[]" url="/api/upload" accept="image/*" :max-file-size="1000000" />
      </div>
    </div>

    <div>
      <button
        class="go-button"
        m-2 text-sm btn
        :disabled="!name"
        @click="go"
      >
        {{ t('button.go') }}
      </button>
    </div>
  </div>
</template>

<route lang="yaml">
meta:
  layout: home
</route>

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
</style>
