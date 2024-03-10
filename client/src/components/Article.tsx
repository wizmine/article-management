import { Button, Flex, Input, List, Space } from "antd";
import { useState } from "react";
import { fetchRemoveArticle, fetchUpdateArticle } from "../redux/slices/articles";
import { useAppDispatch } from "../hooks/hooks";

type Props = {
  id: string;
  text: string;
  isAdmin: boolean;
};

const Article = ({ id, text, isAdmin }: Props) => {
  const dispatch = useAppDispatch();
  const [isEditing, setEditing] = useState(false);
  const [newText, setNewText] = useState("");

  const handleRemove = () => {
    if (window.confirm("Are you sure you want to delete article?")) {
      dispatch(fetchRemoveArticle(id));
    }
  };

  const handleSave = () => {
    const updatedInfo = {
      id: id,
      text: newText,
    };

    dispatch(fetchUpdateArticle(updatedInfo));
    window.location.reload();
  };

  const articleScreen = () => (
    <>
      <List.Item style={{ width: "700px" }} key={id}>
        {text}
      </List.Item>
      {isAdmin && (
        <Flex>
          <Button
            type="primary"
            onClick={handleRemove}
            style={{ width: "80px", margin: "6px" }}
            danger
          >
            Delete
          </Button>
          <Button
            onClick={() => setEditing(!isEditing)}
            type="primary"
            style={{ width: "80px", margin: "6px" }}
          >
            Edit
          </Button>
        </Flex>
      )}
    </>
  );

  const editScreen = () => (
    <Space.Compact style={{ width: "100%" }}>
      <Input
        placeholder="Edit article..."
        value={newText}
        onChange={(e) => setNewText(e.target.value)}
      />
      <Button type="primary" onClick={handleSave}>
        Save
      </Button>
    </Space.Compact>
  );

  return (
    <Flex vertical align="center">
      {!isEditing ? articleScreen() : editScreen()}
    </Flex>
  );
};

export default Article;
