import { Request, Response } from "express";
import ArticleModel from "../models/Article";
import puppeteer from "puppeteer";

const isArticleExist = async (title: string) => {
  const existingArticle = await ArticleModel.findOne({ text: title });
  return !!existingArticle;
};

export const fetchRSS = async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto("https://www.youtube.com/@NatGeo/videos");

  const arr = await page.evaluate(() => {
    const text = Array.from(document.querySelectorAll("#video-title"), (el) => el.textContent);
    return text;
  });

  for (const title of arr) {
    const articleExists = await isArticleExist(title);
    if (!articleExists) {
      const newArticle = new ArticleModel({
        text: title,
      });
      await newArticle.save();
    }
  }

  await browser.close();
};

export const getAll = async (req: Request, res: Response) => {
  try {
    const posts = await ArticleModel.find();

    res.json(posts);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Failed to retrieve article",
    });
  }
};

export const remove = async (req: Request, res: Response) => {
  try {
    const postId = req.params.id;

    const doc = await ArticleModel.findByIdAndDelete({
      _id: postId,
    });

    if (!doc) {
      return res.status(404).json({
        message: "Article not found",
      });
    }

    res.json({
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Failed to remove article",
    });
  }
};

export const create = async (req: Request, res: Response) => {
  try {
    const doc = new ArticleModel({
      text: req.body.text,
    });

    const post = await doc.save();

    res.json(post);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Failed to create article",
    });
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    const article = await ArticleModel.findById(req.body.id);

    if (!article) {
      return res.status(404).json({
        message: "Article not found",
      });
    }

    article.text = req.body.text;
    article.save();

    res.json({
      success: true,
      article,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Failed to update article",
    });
  }
};
