import { createStore, applyMiddleware,combineReducers } from "redux";
import logger from "redux-logger";
import axios from "axios"; 
import thunk from "redux-thunk"
//action name constants

const inc = "account/increment";
const dec = "account/decrement";
const incByAmount = "account/incrementByAmount";
// const init = "account/init";
const user = "account/users"
const getAccUserPending = "account/getUser/pending"
const getAccUserFulFilled = "account/getUser/fullfilled"
const getAccUserRejected = "account/getUser/rejected"


const incBonus = 'bonus/increment'

//store
const store = createStore(
    combineReducers({
        account:accountReducer,
        bonus:bonusReducer
    }),
     applyMiddleware(logger.default, thunk.default));

const history = [];

//reducer



function accountReducer(state = { amount: 1 }, action) {
  switch (action.type) {
    
    case getAccUserFulFilled : 
    return{amount:action.payload, pending:false};
    
    case getAccUserPending : 
    return{...state,pending:true};
    
    case getAccUserRejected : 
    return{...state,console,error:action.error,pending:false};

    case inc:
      //immutability
      //  state.amount = state.amount +1
      return { amount: state.amount + 1 };
    case dec:
      return { amount: state.amount - 1 };
    case incByAmount:
      return { amount: state.amount + action.payload };
    case user:
        return {amount: state.amount + action.payload}

    default:
  }
  return state;
}

function bonusReducer(state = { points: 1 }, action) {
    switch (action.type) {
      case incBonus:{
         return {points: state.points + 1}
      }
      case incByAmount : 
    if(action.payload >=100){
        return{points:state.points + 1} 
    }
      default:
     }
    return state;
  }

//global state

// store.subscribe(() => {
//   history.push(store.getState());
//   console.log(history);
// });

//Async API CALL

 

// getUser() 

//action creators

function getUserAccount(id) {
       return async (dispatch,getState) => {
          
        try {
            dispatch(getAccountUserPending())
            const {data} = await axios.get(`http://localhost:3000/account/${id}`)
            dispatch(getAccountUserFulFilled(data.amount));
    
        } catch (error) {
          dispatch(getAccountUserFulRejected(error.message))   
        }
       }
 }


function getAccountUserFulFilled(value) {
    return { type: getAccUserFulFilled,payload :value };
  }

  function getAccountUserFulRejected(error) {
    return { type: getAccUserRejected,error :value };
  }

  function getAccountUserPending(value) {
    return { type: getAccUserPending };
  }

function increment() {
  return { type: inc };
}
function decrement() {
  return { type: dec };
}
function incrementByAmount(value) {
  return { type: incByAmount, payload: value };
}

function incrementBonus(value) {
    return { type: incBonus };
  }



setTimeout(() => {
  store.dispatch(getUserAccount(1) );
// store.dispatch(incrementByAmount(200))
// store.dispatch(incrementBonus(200))

}, 1000);
