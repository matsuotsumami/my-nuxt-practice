<script lang="tsx">
import { defineComponent, onMounted, ref } from '@nuxtjs/composition-api'
import { Notification, MessageBox } from 'element-ui'
import { moneyDataModule, IMoneyItem } from '@/store/moneyData/moneyData'

export default defineComponent({
  setup() {
    const registerDate = ref<string>('')
    const changedRegisterDate = (value: Date) => {
      registerDate.value = value.toLocaleDateString()
      console.log(registerDate.value)
    }

    const itemName = ref<string>('')
    const changedItemName = (value: string) => {
      itemName.value = value
    }

    const money = ref<number>()
    const changedMoney = (value: number) => {
      money.value = value
    }

    const tableMoneyData = ref<IMoneyItem[] | null>(null)

    onMounted(() => {
      console.log('onMounted!')
      moneyDataModule.load()
      tableMoneyData.value = moneyDataModule.isMoneyData ?? []
    })

    const clearValue = () => {
      registerDate.value = ''
      itemName.value = ''
      money.value = undefined
    }

    const dataArray = ref<string[]>([])

    const onDeleteClick = (row: IMoneyItem, column: any, event: {parentElement: { children: Array<{innerText: string}> }}) => {
      console.log('event')
      console.log(row)
      console.log(column)
      console.log(event.parentElement)

      dataArray.value = []

      for (let i = 0; i < 3; i++) {
        dataArray.value.push(event.parentElement?.children[i].innerText)
      }

      MessageBox.confirm('選択した項目を削除しますか？', '削除', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        type: 'warning'
        }).then(() =>
          deleteSuccess()
        ).catch(() =>
          deleteCancel()
        )

      console.log(dataArray.value)
    }

    const deleteSuccess = () => {
      Notification.success({
        title: 'success',
        message: '削除が完了しました！',
        type: 'success',
      })
      // const val = dataArray.value
      // const obj: IMoneyItem = { registerDate: val[0], itemName: val[1], money: Number(val[3]) }
      // const findArray = tableMoneyData.value?.findIndex(value => value === obj)
      // tableMoneyData.value?.splice(findArray!, 1)
    }

    const deleteCancel = () => {
      Notification({
        title: 'cancel',
        message: '削除を中断しました。',
      })
    }

    const onAddClick = () => {
      if (!registerDate.value || !itemName.value || !money.value) {
        MessageBox.alert(
          '登録日、登録する内容、金額は全て入力してください。',
          'エラー',
          { confirmButtonText: 'OK', type: 'error' }
        )
        return
      }

      console.log(registerDate)

      tableMoneyData.value?.push({
        registerDate: registerDate.value,
        itemName: itemName.value,
        money: money.value,
      })

      moneyDataModule.moneyItemArraySet(tableMoneyData.value ?? [])

      Notification.success({
        title: 'success',
        message: '保存が完了しました！',
        type: 'success',
      })

      clearValue()
    }

    return () => (
      <div class="container">
        <div>
          <h1 class="title">Simple KAKEIBO</h1>
          <div class="panel">
            <div class="inner-block">
              <span class="text-sub">登録日</span>
              <el-date-picker
                value={registerDate.value}
                onInput={changedRegisterDate}
                format="yyyy-MM-dd"
                type="date"
                placeholder="登録する日"
                style="width: 250px;"
              ></el-date-picker>
            </div>
            <div class="inner-block">
              <span class="text-sub">登録する内容</span>
              <el-input
                onInput={changedItemName}
                value={itemName.value}
                placeholder="内容"
                style="width: 250px;"
              ></el-input>
            </div>
            <div class="inner-block">
              <span class="text-sub">金額</span>
              <el-input-number
                onInput={changedMoney}
                controls-position="right"
                min={1}
                value={money.value}
                placeholder="￥9999999"
                style="width: 250px;"
              ></el-input-number>
            </div>
          </div>
          <el-button
            type="primary"
            size="medium"
            class="primaryBtn"
            onClick={onAddClick}
          >
            追加
          </el-button>
          <el-main>
            <el-table
              style="width: 100%"
              data={tableMoneyData.value}
              vOn:cell-click={onDeleteClick}
            >
              <el-table-column
                label="登録日"
                prop="registerDate"
              ></el-table-column>
              <el-table-column
                label="登録する内容"
                prop="itemName"
              ></el-table-column>
              <el-table-column label="金額" prop="money"></el-table-column>
              <el-table-column align="right">
                <div slot="header" scopedSlots="scope">
                  <el-input size="mini" placeholder="Search" />
                </div>
              </el-table-column>
              <el-table-column
                fixed="right"
                width="120">
                <div slot-scope="scope">
                  <el-button
                    type="text"
                    size="small">
                    Remove
                  </el-button>
                </div>
              </el-table-column>
            </el-table>
          </el-main>
        </div>
      </div>
    )
  },
})
</script>

<style scoped>
/* Sample `apply` at-rules with Tailwind CSS
.container {
@apply min-h-screen flex justify-center items-center text-center mx-auto;
}
*/
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  text-align: center;
}

.title {
  font-family: 'Orbitron', sans-serif;
  display: block;
  font-weight: 300;
  font-size: 80px;
  color: #35495e;
  letter-spacing: 1px;
  margin-bottom: 20px;
}

.inner-block {
  justify-content: center;
  margin-bottom: 30px;
  display: flex;
}

.text-sub {
  width: 150px;
  font-size: 20px;
  margin-right: 20px;
}

.primaryBtn {
  width: calc(100% - 200px);
}
</style>
