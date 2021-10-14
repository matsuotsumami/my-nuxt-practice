import {
  Mutation,
  Action,
  getModule,
  Module,
  VuexModule,
} from 'vuex-module-decorators'
import { store } from '../index'

export interface IMoneyItem {
  registerDate: string
  itemName: string
  money: number
}

interface IMoneyData {
  readonly localStorageKey: string
  moneyArrayData: IMoneyItem[] | null
}

@Module({ dynamic: true, store, name: 'moneyData', namespaced: true })
class moneyData extends VuexModule implements IMoneyData {
  readonly localStorageKey: string = 'KAKEIBO_ITEM_KEY'
  moneyArrayData: IMoneyItem[] | null = null

  public get isMoneyData(): IMoneyItem[] | null {
    return this.moneyArrayData
  }

  @Mutation
  private setMoneyData(value: IMoneyItem[] | null) {
    this.moneyArrayData = value
  }

  @Action({ rawError: true })
  public moneyItemArraySet(moneyItemArray: IMoneyItem[]) {
    localStorage.setItem(this.localStorageKey, JSON.stringify(moneyItemArray))
    this.setMoneyData(moneyItemArray)
  }

  @Action({ rawError: true })
  public load() {
    const jsonLoadMoneyItemArray = localStorage.getItem(this.localStorageKey)
    if (jsonLoadMoneyItemArray === null) {
      this.setMoneyData(null)
      return
    }
    const loadMoneyItemArray = JSON.parse(jsonLoadMoneyItemArray)
    const plainMoneyItemArray = loadMoneyItemArray as IMoneyItem[]
    this.setMoneyData(plainMoneyItemArray)
  }
}

export const moneyDataModule = getModule(moneyData)
