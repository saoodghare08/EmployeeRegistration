import employeeMiddleware from './employeeMiddleware';
import uiMiddleware from './uiMiddleware';

// const empMiddleware = employeeMiddleware;
// const uiMiddleware = ui;

export default [...employeeMiddleware, ...uiMiddleware];
