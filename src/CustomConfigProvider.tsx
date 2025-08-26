import { ConfigProvider } from 'antd';
import locale from 'antd/es/locale/zh_CN';
import React from 'react';
import { userStore } from './store';

export default function CustomConfigProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const containerBg = '#f3f4f6';
  const themeColor = userStore.userSettings?.themeColor;
  const formStyle = userStore.userSettings?.formStyle;
  const themeStyle = {
    colorBgContainer: containerBg,
    colorBorder: containerBg,
  };
  // 在 JavaScript 中设置 CSS 变量
  document.documentElement.style.setProperty(
    '--theme-color',
    `${themeColor}40` || '#ffffff',
  );

  return (
    <ConfigProvider
      locale={locale}
      theme={
        formStyle === 'linear'
          ? {}
          : {
              token: { colorPrimary: themeColor, colorLink: themeColor },
              components: {
                Segmented: { itemSelectedColor: themeColor },
                Slider: { railBg: containerBg },
                Table: { headerBg: containerBg },
                Descriptions: { labelBg: containerBg },
                Button: themeStyle,
                DatePicker: themeStyle,
                Input: themeStyle,
                Select: themeStyle,
                InputNumber: themeStyle,
                Mentions: themeStyle,
                ColorPicker: themeStyle,
              },
            }
      }
    >
      {children}
    </ConfigProvider>
  );
}
