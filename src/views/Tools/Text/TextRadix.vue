<script setup lang="ts">
  const hexText = ref('')

  const decText = computed(() =>
    hexText.value
      .split(' ')
      .filter((i) => i)
      .map((h) => Number('0x' + h))
      .join(',')
  )
</script>

<template>
  <PageView>
    <NH1>进制转换</NH1>
    <div style="flex: 1">
      <NGrid x-gap="12" :cols="2">
        <NGi>
          <NCard title="Hex">
            <!-- <div class="mb-4">
              <NButton> 复制 </NButton>
            </div> -->
            <NInput v-model:value="hexText" type="textarea" placeholder="" />
          </NCard>
        </NGi>
        <NGi>
          <NCard title="Dec">
            <!-- <div class="mb-4">
              <NButton> 复制 </NButton>
            </div> -->
            <NInput v-model:value="decText" type="textarea" placeholder="" />
          </NCard>
        </NGi>
      </NGrid>
    </div>
  </PageView>
</template>

<style scoped></style>
