<script setup lang="ts">
  import EByteZigbeeBuildIndex from '@/components/Tools/Hardware/EByte/Zigbee/build/EByteZigbeeBuildIndex.vue'
  import { calculator, toStr, typeList, codeList, parse } from '@/utils/EByte-Zigbee'
  const payload = ref('')

  const formValue = reactive({
    type: 0,
    code: 0,
    data: ''
  })

  const typeCodeList = computed(() => codeList[formValue.type])

  watch(formValue, (val) => {
    const data = [] as number[]
    if (val.data !== '') {
      val.data.split(' ').forEach((i) => {
        data.push(Number('0x' + i))
      })
    }

    const buffer = calculator({
      type: val.type,
      code: val.code,
      data
    })
    const res = toStr(buffer)
    payload.value = res
  })

  const resultText = ref('')
  const resultVal = reactive({
    type: '',
    code: '',
    data: '',
    desc: ''
  })
  watch(resultText, (val) => {
    if (val === '') {
      resultVal.type = ''
      resultVal.code = ''
      resultVal.data = ''
      resultVal.desc = ''
    }
    const { type, code, data, desc } = parse(val)
    resultVal.type = type
    resultVal.code = code
    resultVal.data = data
    resultVal.desc = desc
  })
</script>

<template>
  <PageView>
    <NH1>亿佰特 ZigBee</NH1>

    <div style="flex: 1">
      <NGrid y-gap="24" :cols="1">
        <NGi>
          <NCard title="命令">
            <NForm ref="formRef" inline :label-width="80" :model="formValue">
              <NFormItem label="命令类型" path="type">
                <NSelect v-model:value="formValue.type" :options="typeList" style="width: 300px" />
              </NFormItem>
              <NFormItem label="命令码" path="code">
                <NSelect
                  v-model:value="formValue.code"
                  :options="typeCodeList"
                  style="width: 300px"
                />
              </NFormItem>
              <NFormItem label="命令数据" path="data">
                <NInput v-model:value="formValue.data" placeholder="命令数据" />
              </NFormItem>
            </NForm>
            <EByteZigbeeBuildIndex :com-code="formValue.code" :com-type="formValue.type" />
          </NCard>
        </NGi>
        <NGi>
          <NCard title="解析">
            <NFormItem label="报文">
              <NInput v-model:value="resultText" type="textarea" />
            </NFormItem>
            <NDescriptions
              label-style="width: 100px;"
              content-style="white-space: break-spaces;"
              label-placement="left"
              bordered
              class="my-2"
              :column="1"
            >
              <NDescriptionsItem label="命令类型">
                {{ resultVal.type }}
              </NDescriptionsItem>
              <NDescriptionsItem :span="3" label="命令码">
                {{ resultVal.code }}
              </NDescriptionsItem>
              <NDescriptionsItem label="描述">
                {{ resultVal.desc }}
              </NDescriptionsItem>
              <NDescriptionsItem label="数据">
                {{ resultVal.data }}
              </NDescriptionsItem>
            </NDescriptions>
          </NCard>
        </NGi>
      </NGrid>
    </div>
  </PageView>
</template>

<style scoped></style>
