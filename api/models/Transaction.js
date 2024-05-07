const mongoose = require('mongoose');
const { isEnabled } = require('../server/utils/handleText');
const transactionSchema = require('./schema/transaction');
const { getMultiplier } = require('./tx');
const Balance = require('./Balance');
const TokenUsage = require('./TokenUsage');
const cancelRate = 1.15;

// Method to calculate and set the tokenValue for a transaction
transactionSchema.methods.calculateTokenValue = function () {
  if (!this.valueKey || !this.tokenType) {
    this.tokenValue = this.rawAmount;
  }
  const { valueKey, tokenType, model, endpointTokenConfig } = this;
  const multiplier = Math.abs(getMultiplier({ valueKey, tokenType, model, endpointTokenConfig }));
  this.rate = multiplier;
  this.tokenValue = this.rawAmount * multiplier;
  if (this.context && this.tokenType === 'completion' && this.context === 'incomplete') {
    this.tokenValue = Math.ceil(this.tokenValue * cancelRate);
    this.rate *= cancelRate;
  }
};

transactionSchema.methods.getRawTokenCount = function () {
  return this.rawAmount;
};

/**
 * Creates a transaction and updates the balance.
 * @memberof Transaction
 * @static
 * @method create
 * @param {Transaction} transactionData - The data for the transaction.
 * @returns {Object} - The updated balance and transaction details.
 */
transactionSchema.statics.create = async function (transactionData) {
  const Transaction = this;

  const transaction = new Transaction(transactionData);
  transaction.endpointTokenConfig = transactionData.endpointTokenConfig;
  transaction.calculateTokenValue();

  // Save the transaction
  await transaction.save();

  // Update the token usage count
  await TokenUsage.findOneAndUpdate(
    { user: transaction.user },
    { $inc: { tokenUsage: transaction.getRawTokenCount() } },
    { upsert: true },
  );

  if (!isEnabled(process.env.CHECK_BALANCE)) {
    return;
  }

  let balance = await Balance.findOne({ user: transaction.user }).lean();
  let incrementValue = transaction.tokenValue;

  if (balance && balance?.tokenCredits + incrementValue < 0) {
    incrementValue = -balance.tokenCredits;
  }

  balance = await Balance.findOneAndUpdate(
    { user: transaction.user },
    { $inc: { tokenCredits: incrementValue } },
    { upsert: true, new: true },
  ).lean();

  return {
    rate: transaction.rate,
    user: transaction.user.toString(),
    balance: balance.tokenCredits,
    [transaction.tokenType]: incrementValue,
  };
};

const Transaction = mongoose.model('Transaction', transactionSchema);

/**
 * Queries and retrieves transactions based on a given filter.
 * @async
 * @function getTransactions
 * @param {Object} filter - MongoDB filter object to apply when querying transactions.
 * @returns {Promise<Array>} A promise that resolves to an array of matched transactions.
 * @throws {Error} Throws an error if querying the database fails.
 */
async function getTransactions(filter) {
  try {
    return await Transaction.find(filter).lean();
  } catch (error) {
    console.error('Error querying transactions:', error);
    throw error;
  }
}

module.exports = { Transaction, getTransactions };
