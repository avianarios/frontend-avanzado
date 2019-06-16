/* import * as moment from 'moment'; */
export class AppSettings {
  public static readonly APP_NAME = 'PoliJob';
  public static readonly APP_LOCALSTORAGE_TOKEN = 'PoliJob_Token';
  public static readonly APP_VERSION = '0.1.0';
  public static readonly API_ENDPOINT = 'api/';
  public static readonly STATIC_ENDPOINT = AppSettings.API_ENDPOINT + 'static/';
  public static readonly STATIC_AVATAR_ENDPOINT =
    AppSettings.STATIC_ENDPOINT + 'images/avatar/';
  public static readonly API_ENDPOINT_APP = AppSettings.API_ENDPOINT + 'app/';
  public static readonly API_ENDPOINT_USER = AppSettings.API_ENDPOINT + 'user';
  public static readonly API_ENDPOINT_USERS =
    AppSettings.API_ENDPOINT + 'users';
  public static readonly API_ENDPOINT_OFFERS =
    AppSettings.API_ENDPOINT + 'offers';
  public static readonly API_ENDPOINT_USER_ME =
    AppSettings.API_ENDPOINT + 'user-me';
  public static readonly API_ENDPOINT_USER_CREATE =
    AppSettings.API_ENDPOINT_USER + '/create';
  public static readonly API_ENDPOINT_CONFIRM_USER =
    AppSettings.API_ENDPOINT_USER + '/confirm-user';
  public static readonly API_ENDPOINT_USER_REMEMBER_PASSWORD =
    AppSettings.API_ENDPOINT_USER + '/remember-password';
  public static readonly API_ENDPOINT_USER_REQUEST_REMEMBER_PASSWORD =
    AppSettings.API_ENDPOINT_USER + '/request-remember-password';
  public static readonly API_ENDPOINT_USER_REQUEST_USER_AVATAR =
    AppSettings.API_ENDPOINT_USER + '/request-avatar-user';

  public static readonly API_ENDPOINT_USER_UPLOAD_AVATAR =
    AppSettings.API_ENDPOINT_USER + '/upload-avatar';
  public static readonly API_ENDPOINT_USER_SENDMAIL =
    AppSettings.API_ENDPOINT_USER + '/sendmail';
  public static readonly API_ENDPOINT_AUTH = AppSettings.API_ENDPOINT + 'auth/';
  public static readonly API_ENDPOINT_AUTH_LOCAL =
    AppSettings.API_ENDPOINT + 'auth/local/';

  public static readonly APP_QUILL_EDITOR_CONFIGURATION = {
    toolbar: [
      ['bold', 'italic', 'underline'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ direction: 'rtl' }],
      ['clean'],
      ['link']
    ]
  };

  public static readonly APP_DEFAULT_MOMENT_LOCALE = 'es';
  public static readonly GUESS_ROL = {
    value: 'guess',
    text: 'settings.rol.GUESS'
  };
  public static readonly STUDENT_ROL = {
    value: 'student',
    text: 'settings.rol.STUDENT'
  };
  public static readonly ADMINISTRATOR_ROL = {
    value: 'admin',
    text: 'settings.rol.ADMINISTRATOR'
  };
  public static readonly COMPANY_ROL = {
    value: 'company',
    text: 'settings.rol.COMPANY'
  };
  public static readonly ROLES = [
    AppSettings.GUESS_ROL,
    AppSettings.STUDENT_ROL,
    AppSettings.COMPANY_ROL,
    AppSettings.ADMINISTRATOR_ROL
  ];

  public static readonly USER_STATUS_PENDING = {
    value: 'pending',
    text: 'settings.status.PENDING'
  };
  public static readonly USER_STATUS_ACTIVE = {
    value: 'active',
    text: 'settings.status.ACTIVE'
  };
  public static readonly USER_STATUS_INACTIVE = {
    value: 'inactive',
    text: 'settings.status.INACTIVE'
  };
  public static readonly USER_STATUS = [
    AppSettings.USER_STATUS_PENDING,
    AppSettings.USER_STATUS_ACTIVE,
    AppSettings.USER_STATUS_INACTIVE
  ];
  public static readonly FORMAT_DATE = 'MM/DD/YYYY';

  public static readonly IMAGES = {
    UNKNOWN_IMAGE: 'assets/images/image-not-found.png',
    UNKNOWN_FACE: 'assets/images/face-unknown.png',
    UNKNOWN_TEAM: 'assets/images/image-not-found.png'
  };

  public static readonly NOTIFICATIONS = {
    DEFAULT_TIME: 2000
  };

  public static getAvatar(
    user: { uid: string; avatar_hash: string },
    size: string = 'sm'
  ): string {
    if (!user || !user.avatar_hash) {
      return this.IMAGES.UNKNOWN_FACE;
    }
    const [hash, extension] = user.avatar_hash.split('.');
    return `${this.STATIC_AVATAR_ENDPOINT}${
      user.uid
    }/${hash}${size}.${extension}`;
  }
  /*  public static getDateFormatted(date: moment.Moment | string) {
    let dateFormatted = date;
    if (typeof date === 'string') {
      dateFormatted = moment(date, 'X');
    }
    return (dateFormatted as moment.Moment).format(this.FORMAT_DATE);
  } */
}
