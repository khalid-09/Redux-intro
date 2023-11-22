import { combineReducers, legacy_createStore as createStore } from 'redux';

const initialStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: '',
};

const initialStateCustomer = {
  fullName: '',
  nationalID: '',
  createdAt: '',
};

function accountReducer(state = initialStateAccount, action) {
  switch (action.type) {
    case 'account/deposit':
      return { ...state, balance: state.balance + action.payload };

    case 'account/withdraw':
      return { ...state, balance: state.balance - action.payload };

    case 'account/requestLoan':
      if (state.loan > 0) return state;
      return {
        ...state,
        balance: state.balance + action.payload.amount,
        loan: action.payload.amount,
        loanPurpose: action.payload.purpose,
      };

    case 'account/payLoan':
      return {
        ...state,
        loan: 0,
        loanPurpose: '',
        balance: state.balance - state.loan,
      };

    default:
      return state;
  }
}

function customerReducer(state = initialStateCustomer, action) {
  switch (action.type) {
    case 'customer/createCustomer':
      return {
        ...state,
        fullName: action.payLoad.fullName,
        nationalID: action.payLoad.nationalID,
        createdAt: action.payLoad.createdAt,
      };

    case 'customer/updateName':
      return { ...state, fullName: action.payLoad };

    default:
      return state;
  }
}

// Combining Reducers
const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});

// Creating a Redux store
const store = createStore(rootReducer);

// Action Creators
function deposit(amount) {
  return { type: 'account/deposit', payload: amount };
}
store.dispatch(deposit(500));
console.log(store.getState());

function withdraw(amount) {
  return { type: 'account/withdraw', payload: amount };
}
store.dispatch(withdraw(200));
console.log(store.getState());

function requestLoan(amount, purpose) {
  return {
    type: 'account/requestLoan',
    payload: { amount, purpose },
  };
}
store.dispatch(requestLoan(1000, 'Buy a Car'));
console.log(store.getState());

function payLoan() {
  return { type: 'account/payLoan' };
}
store.dispatch(payLoan());
console.log(store.getState());

function createCustomer(fullName, nationalID) {
  return {
    type: 'customer/createCustomer',
    payLoad: { fullName, nationalID, createdAt: new Date().toISOString() },
  };
}
store.dispatch(createCustomer('Khalid Ansari', '23984'));

function updateName(fullName) {
  return { type: 'customer/updateName', payLoad: fullName };
}
store.dispatch(updateName('Khalid'));

console.log(store.getState());
