import React from "react";

async function page(props) {
  const data = await props.searchParams;
  console.log(data);
  return <div>page:{data.orderId}</div>;
}

export default page;
