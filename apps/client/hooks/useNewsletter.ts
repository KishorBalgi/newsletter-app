import { useAxios } from "./useAxios";
import { Newsletter } from "@repo/types/newsletter";
import { Article } from "@repo/types/article";

export const useNewsletter = () => {
  const axios = useAxios();

  // Create a newsletter:
  const createNewsletter = async (name: string): Promise<Newsletter> => {
    try {
      const response = await axios.post("/newsletter", {
        name,
      });
      return response.data.data;
    } catch (error) {
      throw new Error(
        error.response.data.message || "Failed to create newsletter"
      );
    }
  };

  //   Get all newsletters
  const getAllNewsletters = async (): Promise<Newsletter[]> => {
    try {
      const response = await axios.get("/newsletter");
      return response.data.data;
    } catch (error) {
      throw new Error(
        error.response.data.message || "Failed to get newsletters"
      );
    }
  };

  // Create a arrticle for a newsletter:
  const createArticle = async (
    newsletterId: number,
    title: string,
    content: string
  ): Promise<Article> => {
    try {
      const response = await axios.post(`/newsletter/${newsletterId}/article`, {
        title,
        body: content,
      });
      return response.data.data;
    } catch (error) {
      throw new Error(
        error.response.data.message || "Failed to create article for newsletter"
      );
    }
  };

  //   Get All articles for a newsletter:
  const getArticlesForNewsletter = async (
    newsletterId: number
  ): Promise<Article[]> => {
    try {
      const response = await axios.get(`/newsletter/${newsletterId}/articles`);
      return response.data.data;
    } catch (error) {
      if (error.response.status === 404) {
        throw new Error("404-page-not-found");
      }

      throw new Error(
        error.response.data.message || "Failed to get articles for newsletter"
      );
    }
  };

  //   Get Article by Id:
  const getArticleById = async (
    newsletterId: number,
    articleId: number
  ): Promise<Article> => {
    try {
      const response = await axios.get(
        `/newsletter/${newsletterId}/article/${articleId}`
      );
      return response.data.data;
    } catch (error) {
      throw new Error(
        error.response.data.message || "Failed to get article by id"
      );
    }
  };

  //   Subscribe to a newsletter:
  const subscribeToNewsletter = async (newsletterId: number, email: string) => {
    try {
      const response = await axios.post(
        `/newsletter/${newsletterId}/subscribe`,
        {
          email,
        }
      );
      console.log(response.data);
      return response.data.status;
    } catch (error) {
      throw new Error(
        error.response.data.message || "Failed to subscribe to newsletter"
      );
    }
  };

  return {
    createNewsletter,
    createArticle,
    getAllNewsletters,
    getArticlesForNewsletter,
    getArticleById,
    subscribeToNewsletter,
  };
};
