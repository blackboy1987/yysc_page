import { ProLayoutProps } from '@ant-design/pro-components';

/**
 * @name
 */
const Settings: ProLayoutProps & {
  pwa?: boolean;
  logo?: string;
} = {
  navTheme: 'light',
  // 拂晓蓝
  colorPrimary: '#1890ff',
  layout: 'mix',
  contentWidth: 'Fluid',
  fixedHeader: false,
  fixSiderbar: true,
  colorWeak: false,
  title: '应用市场',
  pwa: true,
  logo: '/logo.png',
  iconfontUrl: '',
  token: {
    pageContainer:{
      colorBgPageContainer:'rgba(239, 239, 239, 0.45)',
      paddingBlockPageContainerContent:8,
      paddingInlinePageContainerContent:8,
    },
  },
};

export default Settings;
