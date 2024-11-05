import { Route, Routes } from "react-router-dom";
import "./App.css";
import { lazy } from "react";
import { LazyPageWrapper } from "./Components/Common/LazyPageWrapper/LazyPageWrapper";
import { useAuth } from "./Context/UserDataContextProvider/UserDataContextProvder";
import { ProtectedRoute } from "./Utils/ProtectedRoute/ProtectedRoute";
// Error Page
const ErrorPage = lazy(() => import("./Components/Layout/ErrorPage/ErrorPage"));
// Auth
const Register = lazy(() => import("./Feutures/Auth/Register/Index"));
const Login = lazy(() => import("./Feutures/Auth/Login/Index"));
// Main Routes
const Main = lazy(() => import("./Feutures/AuthenticatedRoutes/Index"));
// User Profile Route
const UserProfile = lazy(() =>
  import("./Feutures/AuthenticatedRoutes/UserProfile/Index")
);
const UpdateUserProfileData = lazy(() =>
  import("./Feutures/AuthenticatedRoutes/UpdateUserData/Index")
);
// Accountants Application
const AccountantsApplications = lazy(() =>
  import("./Feutures/AuthenticatedRoutes/AccountantsApplication/@View/Index")
);
const AccountantApplication = lazy(() =>
  import(
    "./Feutures/AuthenticatedRoutes/AccountantsApplication/@View_{Id}/Index"
  )
);
function App() {
  const { user } = useAuth();
  return (
    <>
      <LazyPageWrapper>
        <Routes>
          <Route
            path="/register"
            element={
              <ProtectedRoute
                condition={!user.data}
                navigate={{
                  to: "/",
                  message: "لقد سجلت الدخول بالفعل",
                }}
              >
                <Register />
              </ProtectedRoute>
            }
          />
          <Route
            path="/login"
            element={
              <ProtectedRoute
                condition={!user.data}
                navigate={{
                  to: "/",
                  message: "لقد سجلت الدخول بالفعل",
                }}
              >
                <Login />
              </ProtectedRoute>
            }
          />
          <Route
            path="/"
            element={
              <ProtectedRoute
                condition={user.data}
                navigate={{
                  to: "/login",
                  message: "الرجاء تسجيل الدخول",
                }}
              >
                <Main />
              </ProtectedRoute>
            }
          >
            <Route
              path="*"
              element={
                <ErrorPage
                  errorMessage="خطأ في العثور علي تلك الصفحة"
                  navigateTo="/"
                />
              }
            />
            <Route index element={<UserProfile />} />
            <Route path="user" element={<UserProfile />} />
            <Route path="user/update" element={<UpdateUserProfileData />} />
            <Route
              path="accounants-applications"
              element={<AccountantsApplications />}
            />
            <Route
              path="accounants-applications/:id"
              element={<AccountantApplication />}
            />
          </Route>
        </Routes>
      </LazyPageWrapper>
    </>
  );
}

export default App;
