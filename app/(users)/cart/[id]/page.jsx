import React from "react";

async function Page(props) {
  const { id } = await props.params;
  console.log(id);
  return <div>Page {id}</div>;
}

export default Page;
