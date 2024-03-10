import { Flex, Input, List } from "antd";
import Article from "../components/Article";
import { useAppSelector } from "../hooks/hooks";
import { useState } from "react";

const Main = () => {
  const data = useAppSelector((state) => state.articles.articles);
  const [searchArticle, setSearchArticle] = useState("");
  const reversedData = [...data].reverse();

  const filteredArticles = reversedData.filter((article) =>
    article.text.toLowerCase().includes(searchArticle.toLowerCase())
  );

  return (
    <Flex vertical align="center" justify="center">
      <Input
        type="text"
        placeholder="Search article..."
        value={searchArticle}
        style={{ width: "700px" }}
        onChange={(e) => setSearchArticle(e.target.value)}
      />
      <List
        itemLayout="vertical"
        size="default"
        pagination={{
          onChange: (page) => {
            console.log(page);
          },
          pageSize: 12,
          align: "center",
        }}
        dataSource={filteredArticles}
        renderItem={(item) => <Article id={item._id} text={item.text} isAdmin={false} />}
      />
    </Flex>
  );
};

export default Main;
