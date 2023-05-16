import React from "react";
import PinDetail from "../../components/feed/PinDetail";
import Layout from "../../layouts/Layout";

export default function createPin() {
  return (
    <Layout disableSearch>
      <PinDetail />
    </Layout>
  );
}
