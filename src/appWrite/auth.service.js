import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";

export class AuthService {
  client;
  account;
  constructor() {
    this.client = new Client();
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.account = new Account(this.client);
  }

  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (userAccount) {
        // call another method
        return this.login({ email, password });
      } else {
        // appwrite with handle error
        return userAccount;
      }
    } catch (error) {
      console.error(`Error creating account: ${error.message}`);
      if (error.cause) {
        console.error(
          `Appwrite service:: createAccount :: ${error.cause.message}`
        );
      }
      throw error;
    }
  }

  async login({ email, password }) {
    try {
      return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
      console.error(`Error logging in account: ${error.message}`);
      if (error.cause) {
        console.error(`Appwrite service:: login :: ${error.cause.message}`);
      }
      throw error;
    }
  }

  async getCurrentUser() {
    try {
      const current = await this.account.get();

      return current;
    } catch (error) {
      console.error(`Error getting current user: ${error.message}`);
      if (error.cause) {
        console.error(
          `Appwrite service:: getCurrentUser :: ${error.cause.message}`
        );
      }
      throw error;
    }
  }

  async checkActiveSession() {
    try {
      const session = await this.account.getSession("current"); // Get the current session
      return session !== null; // Return true if there is an active session
    } catch (error) {
      // If there's an error (e.g., no active session), handle it appropriately
      if (error.code === 401) {
        return false; // No active session
      }
      throw error; // Re-throw other unexpected errors
    }
  }

  // Function to delete all sessions for the current user

  async deleteSessions() {
    try {
      // Get the list of all sessions
      const sessions = await this.account.listSessions();

      // Delete each session
      await Promise.all(
        sessions.sessions.map(async (session) => {
          await this.account.deleteSession(session.$id);
        })
      );
      console.log("All sessions deleted successfully");
    } catch (error) {
      console.error("Error deleting sessions:", error.message);
      throw error; // Re-throw the error for further handling
    }
  }

  async logout() {
    try {
      /* 
        * To delete single current session
        await this.account.deleteSession("current");
        */
      await this.account.deleteSessions();
    } catch (error) {
      console.error(`Error logging out account: ${error.message}`);
      if (error.cause) {
        console.error(`Appwrite service:: logout :: ${error.cause.message}`);
      }
    }
  }
}

const authService = new AuthService();

export default authService;
