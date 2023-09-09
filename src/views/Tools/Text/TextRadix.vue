<script setup lang="ts">
  const hexText = ref('')
  const decText = ref('')

  type HexSplitType = 'SPACE' | 'DOT' | 'BREAK' | 'NONE' | 'CUSTOMIZE'
  const hexSplitType = ref<HexSplitType>('DOT')
  const bracket = ref(true)
  const wordCase = ref(true)

  const hexSplitCustomize = ref('')
  const hexSplitText = computed(() => {
    if (hexSplitType.value === 'SPACE') {
      return ' '
    } else if (hexSplitType.value === 'BREAK') {
      return '\n'
    } else if (hexSplitType.value === 'NONE') {
      return ''
    } else if (hexSplitType.value === 'CUSTOMIZE') {
      return hexSplitCustomize.value
    }
    return ','
  })

  /**
   * 更新十六进制文本
   * @param text 十六进制
   */
  const onUpdateHex = (text: string) => {
    let strList = [] as string[]
    if (hexSplitText.value === '') {
      for (var i = 0; i < text.length; i += 2) {
        strList.push(text.substring(i, i + 2))
      }
    } else {
      strList = text.split(hexSplitText.value)
    }

    console.log(strList)

    let result = strList
      .filter((i) => i)
      .map((h) => Number('0x' + h))
      .join(',')

    decText.value = bracket.value ? '[' + result + ']' : result
  }

  /**
   * 更新十六进制分割字符
   */
  const onUpdateHexSplit = () => {
    onUpdateDec(decText.value)
  }

  watch(wordCase, () => {
    onUpdateDec(decText.value)
  })

  /**
   * 是否显示中括号
   * @param val 中括号
   */
  const onUpdateBracket = () => {
    onUpdateHex(hexText.value)
  }

  /**
   * 更新十进制文本
   * @param text 十进制文本
   */
  const onUpdateDec = (text: string) => {
    bracket.value = text.includes('[') && text.includes(']')

    if (text === '') {
      hexText.value = ''
      return
    }

    let result = text
      .replace(/\[|\]/g, '')
      .split(',')
      .map((i) => {
        let hex = Number(i).toString(16)
        if (wordCase.value) {
          hex = hex.toUpperCase()
        }
        return hex.length === 1 ? '0' + hex : hex
      })
      .join(hexSplitText.value)

    hexText.value = result
  }
</script>

<template>
  <PageView>
    <NH1>进制转换</NH1>
    <div style="flex: 1">
      <NGrid x-gap="12" :cols="2">
        <NGi>
          <TextRadixCard v-model:text="hexText" title="Hex" @update:text="onUpdateHex">
            <NSpace item-style="display: flex;" align="center">
              <NRadioGroup
                v-model:value="hexSplitType"
                name="hexSplit"
                @update:value="onUpdateHexSplit"
                @click="
                  () => {
                    hexSplitCustomize = ''
                  }
                "
              >
                <NRadio value="DOT">逗号</NRadio>
                <NRadio value="SPACE">空格</NRadio>
                <NRadio value="BREAK">换行</NRadio>
                <NRadio value="NONE">无</NRadio>
                <!-- <NRadio value="CUSTOMIZE">自定义</NRadio> -->
              </NRadioGroup>
              <NInput
                v-model:value="hexSplitCustomize"
                placeholder="自定义"
                size="small"
                @click="hexSplitType = 'CUSTOMIZE'"
                @blur="onUpdateDec(decText)"
              />

              <NSwitch v-model:value="wordCase">
                <template #checked>大写</template>
                <template #unchecked>小写</template>
              </NSwitch>
            </NSpace>
          </TextRadixCard>
        </NGi>
        <NGi>
          <TextRadixCard v-model:text="decText" title="Dec" @update:text="onUpdateDec">
            <NSpace item-style="display: flex;" align="center" class="h-28px">
              <NCheckbox v-model:checked="bracket" @update:checked="onUpdateBracket">
                中括号
              </NCheckbox>
            </NSpace>
          </TextRadixCard>
        </NGi>
      </NGrid>
    </div>
  </PageView>
</template>

<style scoped></style>
