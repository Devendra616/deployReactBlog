import conf from "../conf/conf";
import { Client, ID, Storage, Databases, Query } from "appwrite";

export class Service {
  client;
  bucket;
  databases;
  constructor() {
    this.client = new Client();
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.bucket = new Storage(this.client);
    this.databases = new Databases(this.client);
  }

  async createPost({ title, slug, content, featuredImage, status, user }) {
    try {
      return await this.databases.createDocument(
        conf.appwriteDatabseId,
        conf.appwriteCollectionId,
        // ID.unique(), // auto generate id or slug
        slug,
        {
          title,
          slug,
          content,
          featuredImage,
          status,
          user,
        }
      );
    } catch (error) {
      console.error(`Error creating post: ${error.message}`);
      if (error.cause) {
        console.error(`Appwrite config:: createPost :: ${error.cause.message}`);
      }
      throw error;
    }
  }

  async updatePost(slug, { title, content, featuredImage, status }) {
    try {
      return await this.databases.updateDocument(
        conf.appwriteDatabseId,
        conf.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
        }
      );
    } catch (error) {
      console.error(`Error updating post: ${error.message}`);
      if (error.cause) {
        console.error(`Appwrite config:: updatePost :: ${error.cause.message}`);
      }
      throw error;
    }
  }

  async deletePost(slug) {
    try {
      await this.databases.deleteDocument(
        conf.appwriteDatabseId,
        conf.appwriteCollectionId,
        slug
      );
      return true;
    } catch (error) {
      console.error(`Error deleting post: ${error.message}`);
      if (error.cause) {
        console.error(`Appwrite config:: deletePost :: ${error.cause.message}`);
      }
      return false;
    }
  }

  async getPost(slug) {
    try {
      return await this.databases.getDocument(
        conf.appwriteDatabseId,
        conf.appwriteCollectionId,
        slug
      );
    } catch (error) {
      console.error(`Error getting post: ${error.message}`);
      if (error.cause) {
        console.error(`Appwrite config:: getPost :: ${error.cause.message}`);
      }
      return false;
    }
  }

  async getAllPosts(queries = [Query.equal("status", "active")]) {
    try {
      return await this.databases.listDocuments(
        conf.appwriteDatabseId,
        conf.appwriteCollectionId,
        queries
      );
    } catch (error) {
      console.error(`Error getting all posts: ${error.message}`);
      if (error.cause) {
        console.error(
          `Appwrite config:: getAllPosts :: ${error.cause.message}`
        );
      }
      return false;
    }
  }

  //  file upload service
  async uploadFile(file) {
    try {
      return await this.bucket.createFile(
        conf.appwriteBucketId,
        ID.unique(),
        file
      );
    } catch (error) {
      console.error(`Error uploading file: ${error.message}`);
      if (error.cause) {
        console.error(`Appwrite config:: uploadFile :: ${error.cause.message}`);
      }
      return false;
    }
  }

  //   delete file
  async deleteFile(fileId) {
    try {
      return await this.bucket.deleteFile(conf.appwriteBucketId, fileId);
    } catch (error) {
      console.error(`Error deleting file: ${error.message}`);
      if (error.cause) {
        console.error(`Appwrite config:: deleteFile :: ${error.cause.message}`);
      }
      return false;
    }
  }

  //   file preview
  getFilePreview(fileId) {
    return this.bucket.getFilePreview(conf.appwriteBucketId, fileId);
  }
}

const service = new Service();
export default service;
