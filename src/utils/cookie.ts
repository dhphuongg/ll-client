export default class CookieUtil {
  public static setCookie(key: string, value: string, seconds?: number) {
    let expires = '';
    if (seconds) {
      const date = new Date();
      date.setTime(date.getTime() + seconds * 1000);
      expires = '; expires=' + date.toUTCString();
    }
    document.cookie = key + '=' + (value || '') + expires + '; path=/';
  }

  public static getCookie(key: string) {
    const keyEQ = key + '=';
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1, c.length);
      if (c.indexOf(keyEQ) === 0) return c.substring(keyEQ.length, c.length);
    }
    return null;
  }

  public static removeCookie(key: string) {
    document.cookie = key + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  }
}
