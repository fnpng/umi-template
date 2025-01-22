import { getAssetUrls } from '@tldraw/assets/selfHosted';
import { Divider } from 'antd';
import { createContext } from 'react';
import {
  ColorSchemeMenu,
  DefaultMainMenu,
  EditSubmenu,
  Editor,
  ExportFileContentSubMenu,
  KeyboardShortcutsMenuItem,
  TLComponents,
  Tldraw,
  TldrawUiMenuGroup,
  TldrawUiMenuSubmenu,
  ToggleDebugModeItem,
  ToggleDynamicSizeModeItem,
  ToggleEdgeScrollingItem,
  ToggleFocusModeItem,
  ToggleGridItem,
  TogglePasteAtCursorItem,
  ToggleReduceMotionItem,
  ToggleSnapModeItem,
  ToggleToolLockItem,
  ToggleWrapModeItem,
  ViewSubmenu,
  createShapeId,
  setUserPreferences,
} from 'tldraw';
import 'tldraw/tldraw.css';
import { onDrag } from './custom-component-list';
import shapeUtils from './custom-component-list/shape-utils';
import './index.less';
import LeftPanel from './left-panel';
import RightPanel from './right-panel';
import TopBar from './top-bar';

const assetUrls = getAssetUrls({ baseUrl: 'https://asset.9997.fun/tldraw' });

setUserPreferences({ id: '', locale: 'zh-cn', isSnapMode: true });

export const editorContext = createContext({} as { editor: Editor });

export default function Index() {
  const components: TLComponents = {
    Toolbar: null,
    StylePanel: null,
    MainMenu: CustomMainMenu,
  };

  const handleMount = (editor: Editor) => {
    handleDrag(editor);
    // editor.updateInstanceState({ isReadonly: true });
    const id = createShapeId('root-frame');
    editor.createShapes([
      {
        id,
        type: 'frame',
        x: 0,
        y: 0,
        props: {
          name: 'page',
          w: 1920,
          h: 1080,
        },
      },
    ]);
    // editor.sideEffects.registerBeforeDeleteHandler('shape', (shape) => {
    //   if (shape.type === 'frame') {
    //     return false;
    //   }
    //   return;
    // });
  };

  const handleDrag = (editor: Editor) => {
    const target = document.getElementById('TldrawCanvas');
    target?.addEventListener('drop', (ev) => {
      const type = ev?.dataTransfer?.getData('component') as string;
      onDrag(editor, ev, type);
      ev.preventDefault();
    });
  };

  return (
    <div className="bg-white rounded-lg relative">
      <div className="flex h-screen">
        <div className="flex-1 relative">
          <div className="absolute inset-0" id="TldrawCanvas">
            <Tldraw
              persistenceKey="Tldraw"
              assetUrls={assetUrls}
              options={{ maxPages: 1 }}
              components={components}
              isShapeHidden={(s) => !!s.meta.hidden}
              shapeUtils={shapeUtils}
              onMount={handleMount}
            >
              <div className="absolute top-0 left-0 bg-white w-full h-[48px] flex flex-col justify-between">
                <TopBar />
                <Divider className="m-0" />
              </div>
              <div className="absolute left-0 top-[48px] w-[260px] order-first bg-white">
                <LeftPanel />
              </div>
              <div className="absolute right-0 top-[48px] w-[260px] h-[calc(100vh-48px)] bg-white shadow-[-1px_0_1px_rgba(0,0,0,0.04)]">
                <RightPanel />
              </div>
            </Tldraw>
          </div>
        </div>
      </div>
    </div>
  );
}

function CustomMainMenu() {
  return (
    <DefaultMainMenu>
      <EditSubmenu />
      <ViewSubmenu />
      <ExportFileContentSubMenu />
      <TldrawUiMenuSubmenu id="preferences" label="menu.preferences">
        <TldrawUiMenuGroup id="preferences-actions">
          <ToggleSnapModeItem />
          <ToggleToolLockItem />
          <ToggleGridItem />
          <ToggleWrapModeItem />
          <ToggleFocusModeItem />
          <ToggleEdgeScrollingItem />
          <ToggleReduceMotionItem />
          <ToggleDynamicSizeModeItem />
          <TogglePasteAtCursorItem />
          <ToggleDebugModeItem />
        </TldrawUiMenuGroup>
        <TldrawUiMenuGroup id="color-scheme">
          <ColorSchemeMenu />
        </TldrawUiMenuGroup>
      </TldrawUiMenuSubmenu>
      <KeyboardShortcutsMenuItem />
    </DefaultMainMenu>
  );
}
