import React from 'react'
import { Button, ConfigProvider, Space } from 'antd';
import '../styles/fonts.css'


export default function ThemeProvider({ children }) {
    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary : '#7A5CFA',
                    fontFamily: 'Noto Sans, sans-serif'
                 },
                components: {
                    Button: {
                        defaultBg: '#7A5CFA',
                        contentFontSize: 16,
                        defaultColor: '#FFF',
                        fontWeight: 500,
                        textHoverBg: '#FFF'
                    },
                    Menu: {
                        itemHeight: 51,
                        itemColor: '#848484',
                        itemSelectedColor: '#FFF',
                        itemSelectedBg: '#7A5CFA'
                    },
                    Input: {
                        activeBorderColor: '#7A5CFA'
                    },
                    Radio: {
                        dotSize : 12,
                        radioSize : 24,
                    },
                }

            }}
        >
            {children}
        </ConfigProvider>
    )
}
