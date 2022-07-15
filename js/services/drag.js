const SIGNIFICANT_MOUSE_MOVE_THRESHOLD = 1;

export class DragService {
  constructor(currentWindow, elementClass) {
    this.currentWindow = currentWindow;
    this.initialMousePosition = null;
    this.isMouseDown = false;
    this.elementClass = elementClass;

    document.addEventListener('mousedown', this.onDragStart.bind(this));
    document.addEventListener('mousemove', this.onMouseMove.bind(this));
  }

  /**
   * check that the mouse is moved a significant distance to prevent
   * unnecessary calls to dragMove
   * @param event mouse event
   * @returns {boolean}
   * @private
   */
  _isSignificantMouseMove(event) {
    if (!this.initialMousePosition) {
      return false;
    }

    const
      x = event.clientX,
      y = event.clientY,
      diffX = Math.abs(x - this.initialMousePosition.x),
      diffY = Math.abs(y - this.initialMousePosition.y);

    return (
      diffX > SIGNIFICANT_MOUSE_MOVE_THRESHOLD ||
      diffY > SIGNIFICANT_MOUSE_MOVE_THRESHOLD
    );
  }

  onDragStart(event) {
    let target = event.target;
    while (!target.classList.contains('header-drag')) {
      target = target.parentElement;
      if (!target) return;
    }

    this.isMouseDown = true;
    this.initialMousePosition = {
      x: event.clientX,
      y: event.clientY
    };
  }

  onMouseMove(event) {
    if (!this.isMouseDown) {
      return;
    }

    if (!this._isSignificantMouseMove(event)) {
      return;
    }

    this.isMouseDown = false;

    if (this.currentWindow) {
      overwolf.windows.dragMove(this.currentWindow.id);
    }
  }
}
