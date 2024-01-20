<script setup lang="ts">

const { t } = useI18n()

</script>

<template>
  <nav flex="~ gap-4" mt-6 justify-center text-xl>
    <RouterLink icon-btn to="/" :title="t('button.home')">

      <img src="/minty.svg" alt="logo" style="color: aliceblue; height:23px"/>
    </RouterLink>

    <button icon-btn :title="t('button.toggle_dark')" @click="toggleDark()">
      <div i="carbon-sun dark:carbon-moon" />
    </button>

    <RouterLink icon-btn to="/about" :title="t('button.about')" data-test-id="about">
      <div i-carbon-wallet />
    </RouterLink>

    <a icon-btn rel="noreferrer" href="https://github.com/capGoblin/mint-any" target="_blank" title="GitHub">
      <div i-carbon-logo-github />
    </a>
  </nav>
</template>
