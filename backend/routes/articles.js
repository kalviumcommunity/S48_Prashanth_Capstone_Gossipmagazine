const express = require("express");
const router = express.Router();

let articles = [
  { id: 1, title: "Celebrity Scandal Unveiled!", content: "A shocking twist in the entertainment industry...", author: "John Doe" },
  { id: 2, title: "Political Drama Exposed", content: "Insider reveals secret meetings behind closed doors.", author: "Jane Smith" },
  { id: 3, title: "Trending Viral Sensation", content: "A video breaking the internet like never before!", author: "Alex Johnson" }
];

router.get("/articles", (req, res) => {
  res.status(200).json(articles);
});

router.get("/articles/:id", (req, res) => {
  const article = articles.find(a => a.id === parseInt(req.params.id));
  if (!article) return res.status(404).json({ message: "Article not found" });
  res.status(200).json(article);
});

router.post("/articles", (req, res) => {
  console.log("Request Body:", req.body);

  const { title, content, author } = req.body;
  
  if (!title || !content || !author) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const newArticle = {
    id: articles.length + 1,
    title,
    content,
    author,
  };

  articles.push(newArticle);
  
  res.status(201).json(newArticle);
});

router.put("/articles/:id", (req, res) => {
  const articleId = parseInt(req.params.id);
  const { title, content, author } = req.body;

  const articleIndex = articles.findIndex(a => a.id === articleId);
  
  if (articleIndex === -1) {
    return res.status(404).json({ message: "Article not found" });
  }

  if (!title || !content || !author) {
    return res.status(400).json({ message: "All fields are required" });
  }

  articles[articleIndex] = { id: articleId, title, content, author };

  res.status(200).json({ message: "Article updated successfully", article: articles[articleIndex] });
});

module.exports = router;
