import { Course } from "../types/Course";
import { Token } from "../types/Token";

const API_URL = 'https://api.wisey.app';
const VERSION_URL = '/api/v1';
const BASE_URL = API_URL + VERSION_URL;
const COURSES = '/core/preview-courses';
const AUTH = '/auth/anonymous?platform=subscriptions';

function handleErrors(response: any) {
    if (!response.ok) {
      return Promise.reject(
        new Error(`${response.status} - ${response.statusText}`));
    };

    if (!response?.headers?.get('content-type')?.includes('application/json')) {
      return Promise.reject(
        new Error('Content type is not supported')
      )
    }
    return response.json();
  }

function request<T>(
  url: string,
): Promise<any> {
  return fetch(BASE_URL + AUTH)
    .then(response => {
      return handleErrors(response);
    })
    .then(({ token }: Token) => {
      const options: RequestInit = {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      }
      return fetch(BASE_URL + url, options)
        .then(response => {
          return handleErrors(response);
        })
    })
};

export const fetchClient = {
  getCourses: () => request<Course[]>(COURSES),
  getCourse: (id: string) => request<Course>(`${COURSES}/${id}`)
}