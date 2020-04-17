const Account = require('../models/account');
let account = new Account();

class AccountRepository {
    get() {
        return account;
    }

    updateBalance(type, amount) {
        account.updateBalanceAmount(type, amount);
    }
}

module.exports = AccountRepository;