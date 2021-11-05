/**
 * Use this model to represent service error/message information from the
 * application's service APIs.
 *
 * The DisplayToUser boolean value indicates whether the message should be
 * displayed to the user if desired.
 */
export class ServiceError {
  DisplayToUser!: boolean;
  Exception: any;
  Message!: string;
  Name!: string;
  Source!: string;
  Target!: string;
}
