import { Routes, Route } from "react-router-dom";
import { LoginForm } from "./components/LoginForm";
import Dashboard from "./components/Dashboard";
import Landing from "./components/Landing";
import { RegisterForm } from "./components/RegisterForm";
import BecomeTutor from "./components/BecomeTutor";
import PopularCourses from "./components/PopularCourses";
import CourseDetail from "./components/CourseDetail";
import CategoryPage from "./components/CategoryPage";
import Layout from "./components/Layout";
import LinkPage from "./components/LinkPage";
import Unauthorized from "./components/Unauthorized";
import PersistLogin from "./components/PersistLogin";
import RequireAuth from "./components/RequireAuth";
import Editor from "./components/Tutor";
import Admin from "./components/Admin/Admin";
import Missing from "./components/Missing";
import SubmitAssignment from "./components/Student/SubmitAssignment";
import { CreateCourse } from "./components/Admin/CreateCourse";

const ROLES = {
  User: 2001,
  Editor: 1984,
  Admin: 5150,
};

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route path="login" element={<LoginForm />} />
        <Route path="register" element={<RegisterForm />} />
        <Route path="linkpage" element={<LinkPage />} />
        <Route path="unauthorized" element={<Unauthorized />} />
        <Route path="/" element={<Landing />} />

        {/* we want to protect these routes */}
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
            <Route path="submit-assignment" element={<SubmitAssignment />} />
          </Route>

          <Route element={<RequireAuth allowedRoles={[ROLES.Editor]} />}>
            <Route path="editor" element={<Editor />} />
          </Route>

          <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
            <Route path="admin" element={<Admin />} />
            <Route path="create-course" element={<CreateCourse />} />
          </Route>

          {/* <Route
            element={<RequireAuth allowedRoles={[ROLES.Editor, ROLES.Admin]} />}
          >
            <Route path="lounge" element={<Lounge />} />
          </Route> */}
        </Route>

        {/* catch all */}
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
}
