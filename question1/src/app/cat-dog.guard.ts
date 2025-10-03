import { CanActivateFn, createUrlTreeFromSnapshot } from "@angular/router";

export const catDogGuard: CanActivateFn = (route, state) => {
  let userKey = localStorage.getItem('user');
  
  if (!userKey) {
    return createUrlTreeFromSnapshot(route, ['/login']);
  }

  try {
    let user = JSON.parse(userKey);

    if (user.prefercat == true) {
      return true;
    } else {
      return createUrlTreeFromSnapshot(route, ['/dog']);
    }
  } catch (e) {
    return createUrlTreeFromSnapshot(route, ['/login']);
  }

};
