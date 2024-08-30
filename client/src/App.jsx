import { Routes, Route } from "react-router-dom";
import { LoginForm } from "./components/LoginForm";
import Dashboard from "./components/Student/Dashboard";
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
import Tutor from "./components/Tutor";
import Admin from "./components/Admin/Admin";
import Missing from "./components/Missing";
import SubmitAssignment from "./components/Student/SubmitAssignment";
import { CreateCourse } from "./components/Admin/CreateCourse";
import StudentProfilePage from "./components/Student/StudentProfilePage";
import AdminDashboard from "./components/Admin/AdminDashboard";
import AssignmentDetail from "./components/Tutor/AssignmentDetail";
import TutorAssignmentForm from "./components/Admin/TutorAssignmentForm";
import Profile from "./components/Student/Profile";
import AdminLayout from "./components/Admin/AdminLayout";
import UsersSection from "./components/Admin/sections/UsersSection";
import StudentAssignments from "./components/Student/sections/StudentAssignments";
import StudentCourses from "./components/Student/StudentCourses";
import Assignments from "./components/Admin/sections/Assignments";
import Courses from "./components/Admin/sections/ManageCourses";
import Payments from "./components/Admin/sections/Payments";
import StudentPayments from "./components/Student/sections/StudentPayments";
import AllCourses from "./components/Admin/sections/ManageCourses";
// import { PaymentMethod } from "./components/Student/PaymentMethod";
import { ROLES } from "./utils/roles";
import DashboardLanding from "./components/Student/sections/DashboardLanding";
import { PaymentMethod } from "./components/Student/PaymentMethod";
import PaymentPage from "./components/Student/sections/PaymentPage";
import TutorLayout from "./components/Tutor/TutorLayout";
import TutorRegistrationForm from "./components/Tutor/TutorRegistrationForm";
import ApproveTrainersSection from "./components/Admin/sections/ApproveTrainersSection";
import AdminCategoryManagement from "./components/Admin/sections/AdminCategoryManagement";
import WaitingLobby from "./components/WaitingLobby";
import TutorProfile from "./components/TutorProfile";
// import AssignmentDetails from "./components/Student/AssignmentDetails";
import MyLessons from "./components/Tutor/sections/MyLessons";
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        {/* <Route path="payment" element={<PaymentMethod />} /> */}
        <Route
          path="/assignment/:assignmentId"
          element={<AssignmentDetail />}
        />
        <Route path="login" element={<LoginForm />} />
        <Route path="register" element={<RegisterForm />} />
        <Route path="linkpage" element={<LinkPage />} />
        <Route path="unauthorized" element={<Unauthorized />} />
        <Route path="become-tutor" element={<BecomeTutor />} />
        <Route path="waiting-lobby" element={<WaitingLobby />} />
        <Route path="tutor-registration" element={<TutorRegistrationForm />} />
        <Route path="/" element={<Landing />} />

        {/* we want to protect these routes */}
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
            <Route path="dashboard/*" element={<Dashboard />} />
            <Route path="submit-assignment" element={<SubmitAssignment />} />
            <Route path="profile" element={<Profile />} />
            <Route path="courses/:courseId" element={<CourseDetail />} />
            {/* <Route path="/payment/:courseId" element={<PaymentPage />} /> */}
            <Route path="/payment/:courseId" element={<PaymentMethod />} />
            <Route path="tutor/:id" element={<TutorProfile />} />
            {/* <Route path="/assignment/:id" element={<AssignmentDetails />} /> */}
          </Route>

          <Route element={<RequireAuth allowedRoles={[ROLES.Tutor]} />}>
            <Route path="tutor" element={<TutorLayout />}>
              <Route path="opportunities" element={<Assignments />} />
              <Route path="payments" element={<Payments />} />
              <Route path="mylessons" element={<MyLessons />} />
            </Route>
          </Route>

          <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
            <Route path="admin" element={<AdminLayout />}>
              <Route path="create-course" element={<CreateCourse />} />
              <Route path="users" element={<UsersSection />} />
              <Route path="opportunities" element={<Assignments />} />
              <Route path="courses" element={<Courses />} />
              <Route path="payments" element={<Payments />} />
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route
                path="approvetutors"
                element={<ApproveTrainersSection />}
              />
              {/* <Route
                path="assignment/:assignmentId"
                element={<AssignmentDetail />}
              /> */}
              <Route
                path="assign-tutor/:assignmentId"
                element={<TutorAssignmentForm />}
              />
              <Route path="categories" element={<AdminCategoryManagement />} />
            </Route>
          </Route>

          {/* <Route
            element={<RequireAuth allowedRoles={[ROLES.Tutor, ROLES.Admin]} />}
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
