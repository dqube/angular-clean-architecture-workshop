import { ActiveToast, GlobalConfig, IndividualConfig, ToastContainerDirective } from 'ngx-toastr';

interface IToastrService {
  toastrConfig: GlobalConfig;
  currentlyActive: number;
  toasts: ActiveToast<any>[];
  overlayContainer?: ToastContainerDirective;
  previousToastMessage: string | undefined;
  show(message: string, title: string, override: Partial<IndividualConfig>, type: string): ActiveToast<any>;
  success(message: string, title: string, override: Partial<IndividualConfig>): ActiveToast<any>;
  error(message: string, title: string, override: Partial<IndividualConfig>): ActiveToast<any>;
  info(message: string, title: string, override: Partial<IndividualConfig>): ActiveToast<any>;
  warning(message: string, title: string, override: Partial<IndividualConfig>): ActiveToast<any>;
  clear(toastId: number): void;
  remove(toastId: number): boolean;
  findDuplicate(title: string, message: string, resetOnDuplicate: boolean, countDuplicates: boolean): ActiveToast<any>;
}

export class ToastrServiceMock implements IToastrService {
  toastrConfig: GlobalConfig;
  currentlyActive: number;
  toasts: ActiveToast<any>[];
  overlayContainer?: ToastContainerDirective;
  previousToastMessage: string;
  show(message: string, title: string, override: Partial<IndividualConfig>, type: string): ActiveToast<any> {
    throw new Error('Method not implemented.');
  }
  success(message: string, title: string, override: Partial<IndividualConfig>): ActiveToast<any> {
    throw new Error('Method not implemented.');
  }
  error(message: string, title: string, override: Partial<IndividualConfig>): ActiveToast<any> {
    throw new Error('Method not implemented.');
  }
  info(message: string, title: string, override: Partial<IndividualConfig>): ActiveToast<any> {
    throw new Error('Method not implemented.');
  }
  warning(message: string, title: string, override: Partial<IndividualConfig>): ActiveToast<any> {
    throw new Error('Method not implemented.');
  }
  clear(toastId: number): void {
    throw new Error('Method not implemented.');
  }
  remove(toastId: number): boolean {
    throw new Error('Method not implemented.');
  }
  findDuplicate(title: string, message: string, resetOnDuplicate: boolean, countDuplicates: boolean): ActiveToast<any> {
    throw new Error('Method not implemented.');
  }

}
