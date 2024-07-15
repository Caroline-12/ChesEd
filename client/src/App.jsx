import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LoginForm } from "./components/LoginForm";
import Dashboard from "./components/Dashboard";
import Landing from "./components/Landing";
import { RegisterForm } from "./components/RegisterForm";
import BecomeTutor from "./components/BecomeTutor";
import PopularCourses from "./components/PopularCourses";
import CourseDetail from "./components/CourseDetail";
import CategoryPage from "./components/CategoryPage";
export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/become-tutor" element={<BecomeTutor />}></Route>
        <Route exact path="/" element={<Landing />}></Route>
        <Route path="/sign-in" element={<LoginForm />}></Route>
        <Route path="/sign-up" element={<RegisterForm />}></Route>
        {/* courses need to have is popular flag */}
        <Route path="/popular-courses" element={<PopularCourses />}></Route>
        <Route path="/courses/:category/:id" element={<CourseDetail />} />
        <Route path="/courses/:category" element={<CategoryPage />} />
      </Routes>
    </Router>
  );
}
