import { Observable } from 'rxjs';

export interface IHttpApplicationInfoRepositoryService {
  retrieveApplicationInfo(): Observable<any>;
}
