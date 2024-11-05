import { BaseStorage } from "./dataStorage";

const KEY = "AUTH_STORAGE";

class AuthStorage extends BaseStorage<string | null> {
  constructor() {
    super(KEY);
    this.initializeStorage();
  }

  private initializeStorage() {
    if (!this.getData()) {
      this.setData(null);
    }
  }

  getAuthToken(): string | null {
    return this.getData();
  }

  setAuthToken(token: string) {
    this.setData(token);
  }

  clearAuthToken() {
    this.deleteData();
  }
}

export const authStorage = new AuthStorage();
