import Layout from "../components/Layout";

const Dashboard = () => {

  return (
    <Layout>

      <h1>Dashboard</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "20px",
          marginTop: "30px",
        }}
      >

        <Card title="Teams" value="0" />

        <Card title="Tournaments" value="0" />

        <Card title="Matches" value="0" />

      </div>

    </Layout>
  );
};

const Card = ({ title, value }) => {

  return (
    <div
      style={{
        background: "white",
        padding: "30px",
        borderRadius: "10px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      }}
    >

      <h2>{title}</h2>

      <h1>{value}</h1>

    </div>
  );
};

export default Dashboard;