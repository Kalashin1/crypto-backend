import { model } from 'mongoose'
import { transactionInterface, TransactionModel } from '../../controllers/helper/interface'
import { transactionSchema } from '../Schemas/transactions'


transactionSchema.statics.getAllTransaction = async function () {
  const Transactions = await this.find({})
  return Transactions
}

const Transaction = model<transactionInterface, TransactionModel>('transaction', transactionSchema)

export { Transaction }