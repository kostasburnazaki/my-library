import { Course } from "../types/Course";
import { Token } from "../types/Token";

const API_URL = 'https://api.wisey.app';
const VERSION_URL = '/api/v1';
const BASE_URL = API_URL + VERSION_URL;
const COURSES = '/core/preview-courses';
const AUTH = '/auth/anonymous?platform=subscriptions';

// function handleErrors(response: any) {
//   if (!response.ok) {
//     return Promise.reject(
//       new Error(`${response.status} - ${response.statusText}`));
//   };

//   if (!response?.headers?.get('content-type')?.includes('application/json')) {
//     return Promise.reject(
//       new Error('Content type is not supported')
//     )
//   }
//   return response.json();
// }

async function request<T>(
  url: string,
): Promise<any> {
  const tokenData = await fetch(BASE_URL + AUTH);
  const { token } = await tokenData.json();
  const options: RequestInit = {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  };
  const data = await fetch(BASE_URL + url, options);
  return data.json();
};

export const fetchClient = {
  getCourses: () => request<Course[]>(COURSES),
  getCourse: (id: string) => request<Course>(`${COURSES}/${id}`)
}