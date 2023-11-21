import {parse} from 'querystring';

export const getPageQuery = () => parse(window.location.href.split('?')[1]);

export const fileDownload = (res: any, filename: string) => {
  let blob = new Blob([res]); // 将返回的数据通过Blob的构造方法，创建Blob对象
  const link = document.createElement('a'); // 创建a标签
  link.download = filename;
  link.style.display = 'none';
  link.href = URL.createObjectURL(blob);
  document.body.appendChild(link);
  link.click();
  URL.revokeObjectURL(link.href);
  document.body.removeChild(link);
}
