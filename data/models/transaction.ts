import { model } from 'mongoose'
import { transactionSchema } from '../Schemas/transactions'


const Transaction = model<any>('transaction', transactionSchema)

export { Transaction }