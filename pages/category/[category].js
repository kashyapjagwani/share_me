import Feed from "../../components/feed/Feed";
import Layout from "../../layouts/Layout";
import { useRouter } from "next/router";

export default function Category() {
  const router = useRouter();

  return (
    <Layout>
      <Feed category={router.query.category} />
    </Layout>
  );
}
