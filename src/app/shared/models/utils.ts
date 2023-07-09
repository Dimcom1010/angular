export class Utils {
  // https://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid
  static uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = (Math.random() * 16) | 0,
        v = c == 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }
  static getTextError(error: any, defaultText = 'Произошла ошибка') {
    if (typeof error === 'string') {
      return error;
    }
    if (typeof error === 'object') {
      if (typeof error?.error === 'string') {
        return error?.error;
      }
      if (typeof error?.message === 'string') {
        return error?.message;
      }
    }
    return defaultText;
  }
}
