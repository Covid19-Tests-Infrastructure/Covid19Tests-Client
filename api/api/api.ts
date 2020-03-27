export * from './authController.service';
import { AuthControllerService } from './authController.service';
export * from './formController.service';
import { FormControllerService } from './formController.service';
export * from './userController.service';
import { UserControllerService } from './userController.service';
export const APIS = [AuthControllerService, FormControllerService, UserControllerService];
