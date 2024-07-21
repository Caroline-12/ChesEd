import { Link } from "react-router-dom";

const Tutor = () => {
  return (
    <section>
      <h1>Tutors Page</h1>
      <br />
      <p>You must have been assigned a Tutor role.</p>
      <div className="flexGrow">
        <Link to="/">Home</Link>
      </div>
    </section>
  );
};

export default Tutor;
