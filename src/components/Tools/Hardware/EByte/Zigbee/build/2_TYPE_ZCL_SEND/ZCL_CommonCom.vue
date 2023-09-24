<script setup lang="ts">
  import {
    sendModeMapOpt,
    commDirectOpt,
    respModeOpt
  } from '@/components/Tools/Hardware/EByte/Zigbee/zigbeeType'
  import { strToHexNum } from '@/utils/hex'
  import { Buffer } from 'buffer'

  const props = defineProps<{ value: Buffer }>()
  const { value } = useVModels(props)

  const snedMode = ref(0x40)
  const shortAddr = ref('')
  const endpoint = ref('')
  const frame = ref('')
  const commDirect = ref(0)
  const cluster = ref('')
  const compCode = ref('')
  const respMode = ref(0)

  watchEffect(() => {
    const buffer = Buffer.alloc(11)
    buffer.writeUInt8(snedMode.value, 0)
    if (shortAddr.value) {
      buffer.writeUInt16BE(strToHexNum(shortAddr.value), 1)
    }

    if (endpoint.value) {
      buffer.writeUInt8(strToHexNum(endpoint.value), 3)
    }

    if (frame.value) {
      buffer.writeUInt8(strToHexNum(frame.value), 4)
    }

    buffer.writeUInt8(commDirect.value, 5)

    if (cluster.value) {
      buffer.writeUInt16BE(strToHexNum(cluster.value), 6)
    }

    if (compCode.value) {
      buffer.writeUInt16BE(strToHexNum(compCode.value), 8)
    }

    buffer.writeUInt8(respMode.value, 10)

    value.value = buffer
    return buffer
  })
</script>

<template>
  <NFormItem label="发送模式">
    <NSelect v-model:value="snedMode" :options="sendModeMapOpt" style="width: 180px" />
  </NFormItem>
  <NFormItem label="目标短地址">
    <NInput v-model:value="shortAddr" />
  </NFormItem>
  <NFormItem label="目标端口">
    <NInput v-model:value="endpoint" />
  </NFormItem>
  <NFormItem label="帧序号">
    <NInput v-model:value="frame" />
  </NFormItem>
  <NFormItem label="命令方向">
    <NSelect v-model:value="commDirect" :options="commDirectOpt" style="width: 120px" />
  </NFormItem>
  <NFormItem label="簇 ID">
    <NInput v-model:value="cluster" />
  </NFormItem>
  <NFormItem label="厂商码">
    <NInput v-model:value="compCode" />
  </NFormItem>
  <NFormItem label="应答模式">
    <NSelect v-model:value="respMode" :options="respModeOpt" style="width: 180px" />
  </NFormItem>
</template>

<style scoped></style>
