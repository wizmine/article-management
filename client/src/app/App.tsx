import { useEffect } from "react";
import AppLayout from "../components/layout/AppLayout";
import { useAppDispatch } from "../hooks/hooks";
import { fetchArticle } from "../redux/slices/articles";
import { fetchAuthMe } from "../redux/slices/auth";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchArticle());
    dispatch(fetchAuthMe());
  }, [dispatch]);

  return <AppLayout />;
}

export default App;
