import {Classifier} from './classifier'
import {Insurer} from './insurer'
import {Policy} from './user/policy'
import {Product} from './insurer/products'

export type Schema = Classifier | Insurer | Policy | Product
