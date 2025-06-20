
import { AuthUser } from '@/types/auth';

// Base API configuration
const API_BASE_URL = process.env.VITE_API_BASE_URL || 'http://localhost:8000';

interface ApiResponse<T = any> {
  data: T;
  success: boolean;
  message?: string;
}

interface ApiError {
  message: string;
  status?: number;
  field?: string;
}

class ApiService {
  private baseURL: string;
  private token: string | null = null;

  constructor(baseURL: string = API_BASE_URL) {
    this.baseURL = baseURL;
    this.loadToken();
  }

  private loadToken() {
    this.token = localStorage.getItem('auth_token');
  }

  private saveToken(token: string) {
    this.token = token;
    localStorage.setItem('auth_token', token);
  }

  private removeToken() {
    this.token = null;
    localStorage.removeItem('auth_token');
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}${endpoint}`;
    
    const headers = {
      'Content-Type': 'application/json',
      ...(this.token && { Authorization: `Bearer ${this.token}` }),
      ...options.headers,
    };

    try {
      const response = await fetch(url, {
        ...options,
        headers,
      });

      const data = await response.json();

      if (!response.ok) {
        throw {
          message: data.message || 'An error occurred',
          status: response.status,
          field: data.field,
        } as ApiError;
      }

      return {
        data,
        success: true,
      };
    } catch (error) {
      if (error instanceof Error) {
        throw {
          message: error.message,
          status: 0,
        } as ApiError;
      }
      throw error;
    }
  }

  // Authentication methods
  async login(email: string, password: string) {
    const response = await this.request<{ user: AuthUser; token: string }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });

    if (response.data.token) {
      this.saveToken(response.data.token);
    }

    return response;
  }

  async logout() {
    try {
      await this.request('/auth/logout', { method: 'POST' });
    } finally {
      this.removeToken();
    }
  }

  async getProfile() {
    return this.request<AuthUser>('/auth/profile');
  }

  async changePassword(currentPassword: string, newPassword: string) {
    return this.request('/auth/change-password', {
      method: 'POST',
      body: JSON.stringify({ current_password: currentPassword, new_password: newPassword }),
    });
  }

  // Dashboard methods
  async getDashboard() {
    return this.request('/dashboard');
  }

  async getDashboardMobile() {
    return this.request('/dashboard/mobile');
  }

  async getQuickStats() {
    return this.request('/dashboard/quick-stats');
  }

  async getUrgentItems() {
    return this.request('/dashboard/urgent-items');
  }

  async getFinancialSnapshot() {
    return this.request('/dashboard/financial-snapshot');
  }

  async getTaskProgress() {
    return this.request('/dashboard/task-progress');
  }

  async getUpcomingEvents() {
    return this.request('/dashboard/upcoming-events');
  }

  async getRecentActivity() {
    return this.request('/dashboard/recent-activity');
  }

  // Tasks methods
  async getTasks() {
    return this.request('/tasks');
  }

  async getMyTasks() {
    return this.request('/tasks/me');
  }

  async createTask(task: any) {
    return this.request('/tasks', {
      method: 'POST',
      body: JSON.stringify(task),
    });
  }

  async updateTask(taskId: string, updates: any) {
    return this.request(`/tasks/${taskId}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
  }

  async deleteTask(taskId: string) {
    return this.request(`/tasks/${taskId}`, {
      method: 'DELETE',
    });
  }

  async completeTask(taskId: string) {
    return this.request(`/tasks/${taskId}/complete`, {
      method: 'PUT',
    });
  }

  // Expenses methods
  async getExpenses() {
    return this.request('/expenses');
  }

  async createExpense(expense: any) {
    return this.request('/expenses', {
      method: 'POST',
      body: JSON.stringify(expense),
    });
  }

  async updateExpense(expenseId: string, updates: any) {
    return this.request(`/expenses/${expenseId}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
  }

  async deleteExpense(expenseId: string) {
    return this.request(`/expenses/${expenseId}`, {
      method: 'DELETE',
    });
  }

  // Events methods
  async getEvents() {
    return this.request('/event/events');
  }

  async createEvent(event: any) {
    return this.request('/event', {
      method: 'POST',
      body: JSON.stringify(event),
    });
  }

  async getMyEvents() {
    return this.request('/event/my-events');
  }

  async rsvpEvent(eventId: string, response: string) {
    return this.request(`/event/events/${eventId}/rsvp`, {
      method: 'POST',
      body: JSON.stringify({ response }),
    });
  }

  // Communications methods
  async getAnnouncements() {
    return this.request('/communications/announcements');
  }

  async createAnnouncement(announcement: any) {
    return this.request('/communications/announcements', {
      method: 'POST',
      body: JSON.stringify(announcement),
    });
  }

  async getPolls() {
    return this.request('/communications/polls');
  }

  async createPoll(poll: any) {
    return this.request('/communications/polls', {
      method: 'POST',
      body: JSON.stringify(poll),
    });
  }

  async voteOnPoll(pollId: string, option: string) {
    return this.request(`/communications/polls/${pollId}/vote`, {
      method: 'POST',
      body: JSON.stringify({ option }),
    });
  }

  // Notifications methods
  async getNotifications() {
    return this.request('/notifications');
  }

  async markNotificationRead(notificationId: string) {
    return this.request(`/notifications/${notificationId}/read`, {
      method: 'PUT',
    });
  }

  async markAllNotificationsRead() {
    return this.request('/notifications/mark-all-read', {
      method: 'PUT',
    });
  }

  async getUnreadCount() {
    return this.request('/notifications/unread-count');
  }

  // Household methods
  async getHousehold() {
    return this.request('/households/me');
  }

  async getHouseholdMembers() {
    return this.request('/households/me/members');
  }

  async updateHousehold(updates: any) {
    return this.request('/households/me', {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
  }

  async inviteMember(email: string) {
    return this.request('/households/me/invite', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  }
}

export const apiService = new ApiService();
export type { ApiResponse, ApiError };
