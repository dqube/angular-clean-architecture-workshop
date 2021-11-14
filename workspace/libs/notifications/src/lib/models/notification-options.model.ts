export class NotificationOptions {
  cancelButtonText?: string;
  actionButtonText?: string;

  constructor(actionButtonText?: string, cancelButtonText?: string) {
    this.actionButtonText = actionButtonText;
    this.cancelButtonText = cancelButtonText;
  }
}
