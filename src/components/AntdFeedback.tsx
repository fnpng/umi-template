import {
  App,
  message as antdMessage,
  Modal as antdModal,
  notification as antdNotification,
} from 'antd';

import type { MessageInstance } from 'antd/es/message/interface';
import type { ModalStaticFunctions } from 'antd/es/modal/confirm';
import type { NotificationInstance } from 'antd/es/notification/interface';

let Message: MessageInstance = antdMessage;
let Notification: NotificationInstance = antdNotification;

// because warn is deprecated, so we need to remove it.
const { warn, ...resetFns } = antdModal;
let Modal: Omit<ModalStaticFunctions, 'warn'> = resetFns;

/**
 * This component is used to escape the antd's static functions.
 */
function AntdFeedback() {
  const staticFunctions = App.useApp();

  Message = staticFunctions.message;
  Notification = staticFunctions.notification;
  Modal = staticFunctions.modal;

  return null;
}

export { Message, Modal, Notification };

export default AntdFeedback;
