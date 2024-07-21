import { Link } from "react-router-dom";
import Users from "../Users";
import Navbar from "../Navbar";
import { CreateCourse } from "./CreateCourse";
const Admin = () => {
  return (
    <>
      <Navbar />
      <section>
        <CreateCourse />
        <h1>Admins Page</h1>
        <br />
        <Users />
        <br />
        <div className="flexGrow">
          <Link to="/">Home</Link>
        </div>
      </section>
    </>
  );
};

export default Admin;
