import Feed from "../components/feed/Feed";
import Layout from "../layouts/Layout";
import { useState } from "react";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <Layout searchTerm={searchTerm} setSearchTerm={setSearchTerm}>
      <Feed searchTerm={searchTerm} />
    </Layout>
  );
}
