let url = 'http://localhost:9902/api/admin/';
const isDev = process.env.NODE_ENV === 'development';
if (!isDev) {
  url = '/';
}
export const Constants = {
  apiUrl: `${url}`,
  uploadUrl: `${url}file/upload`,
};
