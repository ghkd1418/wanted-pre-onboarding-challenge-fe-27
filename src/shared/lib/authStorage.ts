import { BaseStorage } from "./dataStorage";

const KEY = "AUTH_STORAGE";

class AuthStorage extends BaseStorage<string | null> {
  constructor() {
    super(KEY);

    if (!super.getData()) {
      super.setData(null);
    }
  }

  getAuthToken(): string | null {
    return this.getData();
  }

  setAuthToken(token: string) {
    this.setData(token);
  }

  clearAuthToken() {
    this.setData(null);
  }
}

export const authStorage = new AuthStorage();
