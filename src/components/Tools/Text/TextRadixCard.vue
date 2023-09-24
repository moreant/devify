<script setup lang="ts">
  const props = defineProps<{ title: string; text: string; inputStyle?: string }>()
  const emit = defineEmits(['update:text'])
  const { text } = useVModels(props, emit)

  const { copy, copied } = useClipboard({ source: text, legacy: true })

  const onCopy = () => {
    copy(text.value)
  }
</script>

<template>
  <NCard :title="title">
    <template #header-extra>
      <n-tooltip :show="copied" trigger="manual">
        <template #trigger>
          <NButton @click="onCopy"> 复制 </NButton>
        </template>
        复制成功！
      </n-tooltip>
    </template>

    <slot></slot>

    <slot name="input">
      <NInput
        v-model:value="text"
        type="textarea"
        placeholder=""
        autosize
        class="my-2 h-xl"
        :style="inputStyle"
      />
    </slot>
  </NCard>
</template>

<style scoped></style>
