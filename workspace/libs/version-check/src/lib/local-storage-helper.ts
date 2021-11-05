enum PrefName {
  AppOnStartReloadDate = 'AppOnStartReloadDate',
}

export class LocalStorageHelper {
  /**
   * Use to retrieve the UTC date (if available) of when the
   * application performed a reload during startup/initialization.
   */
  static get appOnStartReloadUTCDate(): Date | null {
    const date: Date | any = localStorage.getItem(PrefName.AppOnStartReloadDate);
    if (date instanceof Date) {
      return new Date(date);
    }
    return null;
  }

  /**
   * Use to set the date that the application performed a [reload] of bundle
   * resources. Provide the current date, the setter will save the
   * valud as UTC.
   */
  static set appOnStartReloadUTCDate(reloadDate: Date | null) {
    if (reloadDate) {
      localStorage.setItem(PrefName.AppOnStartReloadDate, reloadDate.toUTCString());
    }
  }
}
