import { Button, Flex, Input, List, Space } from "antd";
import Article from "../components/Article";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { useState } from "react";
import { fetchCreateArticle } from "../redux/slices/articles";

const AdminPanel = () => {
  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state.articles.articles);
  const [newText, setNewText] = useState("");
  const reversedData = [...data].reverse();

  const handleCreate = () => {
    const updatedInfo = {
      text: newText,
    };

    dispatch(fetchCreateArticle(updatedInfo));
    window.location.reload();
  };

  return (
    <Flex vertical align="center" justify="center">
      <Space.Compact style={{ width: "700px", marginBottom: "10px" }}>
        <Input
          placeholder="Write something..."
          value={newText}
          onChange={(e) => setNewText(e.target.value)}
        />
        <Button type="primary" onClick={handleCreate}>
          Create
        </Button>
      </Space.Compact>
      <List
        itemLayout="vertical"
        size="default"
        pagination={{
          onChange: (page) => {
            console.log(page);
          },
          pageSize: 9,
          align: "center",
        }}
        dataSource={reversedData}
        renderItem={(item) => <Article id={item._id} text={item.text} isAdmin={true} />}
      />
    </Flex>
  );
};

export default AdminPanel;
