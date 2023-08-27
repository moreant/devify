<script setup lang="ts"></script>

<template>
  <PageView>
    <NH1>Base64</NH1>
    <div style="flex: 1">
      <NGrid x-gap="12" :cols="2">
        <NGi>
          <NCard title="解码">
            <NButton> 复制 </NButton>
            <div> 内容 </div>
          </NCard>
        </NGi>
        <NGi>
          <NCard title="编码">
            <NButton> 复制 </NButton>
            <div> 内容 </div>
          </NCard>
        </NGi>
      </NGrid>
    </div>
  </PageView>
</template>

<style scoped></style>
