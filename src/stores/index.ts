import { createPinia } from 'pinia'
import util from './utils/util';

const pinia = createPinia()
pinia.use(util)

export default pinia