// import { loadEmployee } from "../actions/employeeAction";
import { PAGE_LOADED } from "../actions/ui";
import * as employeeActions from '../actions/employeeAction'

const pageLoadedFlow =
  ({ api }) =>
  (store) =>
  (next) =>
  async (action) => {
    // console.log('store in middleware:', store);

    if (action.type === PAGE_LOADED) {
      try{
        store.dispatch(employeeActions.loadEmployee()); // Dispatch loadEmployee action
      }catch(err){
        console.log(err);
      }
    }
    return next(action);
  };

export default [pageLoadedFlow];
