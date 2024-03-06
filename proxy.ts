import { proxySchema } from 'better-sqlite3-proxy'
import { db } from './db'

export type Category1 = {
  id?: null | number
  name: string
  slug: string
  last_check_time: number
}

export type Category2 = {
  id?: null | number
  category_1_id: number
  category_1?: Category1
  name: string
  slug: string
  last_check_time: number
}

export type Category3 = {
  id?: null | number
  category_2_id: number
  category_2?: Category2
  name: string
  slug: string
  last_check_time: number
}

export type Category4 = {
  id?: null | number
  category_3_id: number
  category_3?: Category3
  name: string
  slug: string
  last_check_time: number
}

export type Product = {
  id?: null | number
  category_4_id: number
  category_4?: Category4
  name: string
  image_filename: string
  unit: null | string
  price: number
  original_price: null | number
  sold: string
  star: number
  reviews: number
  remark: null | string
  last_check_time: number
}

export type DBProxy = {
  category_1: Category1[]
  category_2: Category2[]
  category_3: Category3[]
  category_4: Category4[]
  product: Product[]
}

export let proxy = proxySchema<DBProxy>({
  db,
  tableFields: {
    category_1: [],
    category_2: [
      /* foreign references */
      ['category_1', { field: 'category_1_id', table: 'category_1' }],
    ],
    category_3: [
      /* foreign references */
      ['category_2', { field: 'category_2_id', table: 'category_2' }],
    ],
    category_4: [
      /* foreign references */
      ['category_3', { field: 'category_3_id', table: 'category_3' }],
    ],
    product: [
      /* foreign references */
      ['category_4', { field: 'category_4_id', table: 'category_4' }],
    ],
  },
})
