<script setup lang="ts">
  import { calculator, toStr } from '@/utils/EByte-Zigbee'
  import { ZclCommon } from '../../zigbeeType'
  import { Buffer } from 'buffer'
  import { strToHexNum } from '@/utils/hex'

  const formValue = ref<ZclCommon>()

  const commBuffer = ref<Buffer>(Buffer.alloc(11))

  const comId = ref('')

  const result = computed(() => {
    const data = Buffer.concat([commBuffer.value, Buffer.from([strToHexNum(comId.value)])])
    console.log(data)

    const buffer = calculator({
      type: 0x02,
      code: 0x0f,
      data
    })

    return toStr(buffer)
  })
</script>

<template>
  <div>
    <NForm ref="formRef" inline :label-width="80" :model="formValue">
      <ZCL_CommonCom v-model:value="commBuffer" />
      <NFormItem label="命令ID">
        <NInput v-model:value="comId" />
      </NFormItem>
    </NForm>

    {{ result }}
  </div>
</template>

<style scoped></style>
