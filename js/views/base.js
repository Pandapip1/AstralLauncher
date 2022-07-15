import { DragService } from '../services/drag.js';

export class BaseView {
  constructor() {
    // Initialize
    this.init();
  }

  init() {
    // Close app on X button click
    window.addEventListener('click', event => {
      if (event.target.id == 'closeButton') overwolf.windows.getMainWindow().close();
      if (event.target.id == 'minimizeButton') overwolf.windows.minimize("index");
    })
    // Enable dragging on this window
    overwolf.windows.getCurrentWindow(result => {
      this.dragService = new DragService(result.window);
    });
  }
}
