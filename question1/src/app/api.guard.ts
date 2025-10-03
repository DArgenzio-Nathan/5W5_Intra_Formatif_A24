import { CanActivateFn, createUrlTreeFromSnapshot } from "@angular/router";

export const apiGuard: CanActivateFn = (route, state) => {

  let userKey = localStorage.getItem('user');

  if (!userKey) {
     return createUrlTreeFromSnapshot(route, ["/login"]);
  }
  else return true;
};
