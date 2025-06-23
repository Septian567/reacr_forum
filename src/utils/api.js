import axios from 'axios';

const BASE_URL = 'https://forum-api.dicoding.dev/v1';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Token management
function putAccessToken(token) {
  localStorage.setItem('accessToken', token);
  axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

function getAccessToken() {
  return localStorage.getItem('accessToken');
}

function removeAccessToken() {
  localStorage.removeItem('accessToken');
  delete axiosInstance.defaults.headers.common['Authorization'];
}

// Automatically include token in each request
axiosInstance.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Helper to validate API response
function handleResponse(response) {
  if (response.data.status !== 'success') {
    throw new Error(response.data.message);
  }
  return response.data.data;
}

// API methods
const api = {
  putAccessToken,
  getAccessToken,
  removeAccessToken,

  async register({ name, email, password }) {
    const response = await axiosInstance.post('/register', {
      name,
      email,
      password,
    });
    return handleResponse(response).user;
  },

  async login({ email, password }) {
    const response = await axiosInstance.post('/login', { email, password });
    return handleResponse(response).token;
  },

  async getOwnProfile() {
    const response = await axiosInstance.get('/users/me');
    return handleResponse(response).user;
  },

  async getAllUsers() {
    const response = await axiosInstance.get('/users');
    return handleResponse(response).users;
  },

  async getAllThreads() {
    const response = await axiosInstance.get('/threads');
    return handleResponse(response).threads;
  },

  async getThreadDetail(id) {
    const response = await axiosInstance.get(`/threads/${id}`);
    return handleResponse(response).detailThread;
  },

  async createThread({ title, body, category = '' }) {
    const response = await axiosInstance.post('/threads', {
      title,
      body,
      category,
    });
    return response.data; // Kembalikan semua agar fleksibel
  },

  async createComment({ threadId, content }) {
    const response = await axiosInstance.post(`/threads/${threadId}/comments`, {
      content,
    });
    return handleResponse(response).comment;
  },

  async upVoteThread(threadId) {
    const response = await axiosInstance.post(`/threads/${threadId}/up-vote`);
    return handleResponse(response);
  },

  async downVoteThread(threadId) {
    const response = await axiosInstance.post(`/threads/${threadId}/down-vote`);
    return handleResponse(response);
  },

  async neutralizeVoteThread(threadId) {
    const response = await axiosInstance.post(
      `/threads/${threadId}/neutral-vote`
    );
    return handleResponse(response);
  },

  async upVoteComment({ threadId, commentId }) {
    const response = await axiosInstance.post(
      `/threads/${threadId}/comments/${commentId}/up-vote`
    );
    return handleResponse(response);
  },

  async downVoteComment({ threadId, commentId }) {
    const response = await axiosInstance.post(
      `/threads/${threadId}/comments/${commentId}/down-vote`
    );
    return handleResponse(response);
  },

  async neutralizeVoteComment({ threadId, commentId }) {
    const response = await axiosInstance.post(
      `/threads/${threadId}/comments/${commentId}/neutral-vote`
    );
    return handleResponse(response);
  },

  async getLeaderboards() {
    const response = await axiosInstance.get('/leaderboards');
    return handleResponse(response).leaderboards;
  },
};

export default api;
