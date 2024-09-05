import {
  initBackButton,
  initClosingBehavior,
  initHapticFeedback,
  initMiniApp,
  initSettingsButton,
  initUtils,
  postEvent,
  request,
  retrieveLaunchParams,
  setDebug,
  BackButton,
  InitDataParsed,
  MiniApp,
  SettingsButton,
  Utils,
  ClosingBehavior,
  HapticFeedback,
} from '@tma.js/sdk';

class TelegramAuthenticationProvider {
  utils: Utils = {} as Utils;
  miniApp: MiniApp = {} as MiniApp;
  backButton: BackButton = {} as BackButton;
  settingsButton: SettingsButton = {} as SettingsButton;
  closingBehavior: ClosingBehavior = {} as ClosingBehavior;
  hapticFeedback: HapticFeedback = {} as HapticFeedback;

  data = {
    supported: false,
    version: 'Unknown',
    initData: {} as InitDataParsed,
    initDataRaw: '{}',
    user: {} as InitDataParsed['user'],
  };

  init() {
    const { version, initData, initDataRaw } = retrieveLaunchParams();
    if (!initData || !initData.user) return;

    this.data.supported = true;
    this.data.initData = initData;
    this.data.version = version;
    this.data.initDataRaw = initDataRaw as string;
    this.data.user = initData.user;

    // 默认展开
    postEvent('web_app_expand');

    // 开启调试模式
    setDebug(true);

    // 初始化其他工具方法
    const utils = initUtils();
    if (utils) {
      this.utils = utils;
    }

    const [miniApp] = initMiniApp();
    if (miniApp) {
      this.miniApp = miniApp;
    }

    const [backButton] = initBackButton();
    if (backButton) {
      this.backButton = backButton;
    }

    const [settingsButton] = initSettingsButton();
    if (settingsButton) {
      settingsButton.show();
      this.settingsButton = settingsButton;
    }

    const [closingBehavior] = initClosingBehavior();
    if (closingBehavior) {
      closingBehavior.enableConfirmation();
      this.closingBehavior = closingBehavior;
    }

    const hapticFeedback = initHapticFeedback();
    if (hapticFeedback) {
      this.hapticFeedback = hapticFeedback;
    }
  }

  private _sendMessageToUnity(method: string, data: unknown) {
    unityInstance?.SendMessage('WebGLInteraction', 'OnRequested', JSON.stringify({ method, data }));
  }

  /**
   * 请求获取用户的手机号码
   * @description 如果返回为 true TG将会把用户的手机号发送至 Telegram Bot
   */
  async requestPhone() {
    if (!this.data.supported) {
      this._sendMessageToUnity('RequestPhone', false);
      return;
    }

    const res = await request({
      method: 'web_app_request_phone',
      event: 'phone_requested',
      timeout: 10000,
    });

    this._sendMessageToUnity('RequestPhone', res);
  }
}

(
  window as unknown as { TelegramAuthenticationProvider: TelegramAuthenticationProvider }
).TelegramAuthenticationProvider = new TelegramAuthenticationProvider();
