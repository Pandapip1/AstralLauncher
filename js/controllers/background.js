import { kWindowNames } from '../constants/window-names.js';
import { WindowsService } from '../services/windows.js';
import { EventBus } from '../services/event-bus.js';

export class BackgroundController {
  constructor() {
    this.windowsService = WindowsService;
    this.owEventBus = new EventBus();
  }

  async run() {
    // this will be available when calling overwolf.windows.getMainWindow()
    window.owEventBus = this.owEventBus;
    window.minimize = () => this.minimize();

    this.windowsService.restore(kWindowNames.INDEX);
  }

  /**
   * Minimize all UI windows
   * @public
   */
  async minimize() {
    const windowsStates = await this.windowsService.getWindowsStates();

    if (!windowsStates.success)
      return;

    const states = windowsStates.resultV2;

    const promises = [];

    if (states[kWindowNames.DESKTOP] !== 'closed') {
      promises.push(this.windowsService.minimize(kWindowNames.DESKTOP));
    }

    if (states[kWindowNames.IN_GAME] !== 'closed') {
      promises.push(this.windowsService.minimize(kWindowNames.IN_GAME));
    }

    if (promises.length) {
      await Promise.all(promises);
    }
  }
}
