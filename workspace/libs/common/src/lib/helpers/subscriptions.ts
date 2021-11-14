import { Subscription } from 'rxjs';

export function removeSubscriptions(subscriptions: Subscription[]) {
  if (subscriptions) {
    subscriptions.forEach((subscription: Subscription): void => {
      if (subscription != null) {
        subscription.unsubscribe();
      }
    });
  }
}
