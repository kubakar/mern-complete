import {
  ActionFunction,
  LoaderFunction,
  RouterProvider,
  createBrowserRouter,
  redirect,
} from "react-router-dom";
import HomeLayout from "./pages/HomeLayout";
import Register from "./pages/Register";
import Login from "./pages/Login";
import DashboardLayout from "./pages/DashboardLayout";
import Landing from "./pages/Landing";
import Error from "./pages/Error";
import AddJob from "./pages/AddJob";
import Stats from "./pages/Stats";
import AllJobs from "./pages/AllJobs";
import Profile from "./pages/Profile";
import Admin from "./pages/Admin";
import { ThemeContextProvider } from "./context/themeContext";
import axios, { AxiosPromise, isAxiosError } from "axios";
import { toast } from "react-toastify";

const actionHandler = async (
  apiCall: () => AxiosPromise,
  msg: string,
  successReturn: Response | null,
  errorReturn?: Response | null
) => {
  try {
    const apiResponse = await apiCall();
    toast.success(msg);

    // return successReturn;
    return successReturn ?? apiResponse;
  } catch (error) {
    console.error(error);

    if (isAxiosError(error)) {
      const errorResponse = error.response?.data;
      toast.error(errorResponse?.msg ?? errorResponse);
    } else toast.error("Error");

    return errorReturn ?? null;
  }
};

const addJobAction: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  console.log(data);

  return await actionHandler(
    () => axios.post("/api/v1/jobs", data),
    "Adding job successful 2",
    redirect("all-jobs")
  );
};

const registerAction: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  return await actionHandler(
    () => axios.post("/api/v1/auth/register", data),
    "Reg. successful 2",
    redirect("/login")
  );
};

const loginAction: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  return await actionHandler(
    () => axios.post("/api/v1/auth/login", data),
    "Login successful 2",
    // null // api response will be returned instead
    redirect("/dashboard/")
  );
};

const editJob: ActionFunction = async ({ request, params }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  console.log("request", data);
  console.log("params", params);
  // return redirect("/dashboard/all-jobs");

  // TODO : when query params (filters) are applied when submitting, then => they are lost
  return await actionHandler(
    () => axios.patch(`/api/v1/jobs/${params.id}`, data),
    "Edit successful",
    redirect("/dashboard/all-jobs"),
    redirect("/dashboard/all-jobs")
  );
};

const deleteJob: ActionFunction = async ({ params }) => {
  console.log(params);

  // TODO : when query params (filters) are applied when submitting, then => they are lost
  return await actionHandler(
    () => axios.delete(`/api/v1/jobs/${params.id}`),
    "Delete successful",
    redirect("/dashboard/all-jobs"),
    redirect("/dashboard/all-jobs")
  );
};

const editUser: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  console.log(data);
  // return null;

  return await actionHandler(
    () => axios.patch("/api/v1/users/update", data),
    "Edit User successful",
    null
  );
};

// LOADERS
// this will load every time when dashboard subpage is loading!
const getUserLoader: LoaderFunction = async () => {
  try {
    const { data } = await axios.get("/api/v1/users/current-user");
    return data;
  } catch (error) {
    return redirect("/");
  }
};

const jobsLoader: LoaderFunction = async ({ request }) => {
  const allParams = [...new URL(request.url).searchParams.entries()];

  console.log("request", allParams);

  const params = allParams.reduce<Record<string, string>>((acc, curr) => {
    const [k, v] = curr;
    if (!v) return acc;
    acc[k] = v;
    return acc;
  }, {});

  try {
    const { data } = await axios.get("/api/v1/jobs", { params });
    return { data, params }; // params passed back to search container
  } catch (error) {
    toast.error(isAxiosError(error) ? error.response?.data.msg : "Error");
    return null;
  }
};

const adminLoader: LoaderFunction = async () => {
  try {
    const { data } = await axios.get("/api/v1/users/admin/stats");
    return data;
  } catch (error) {
    toast.error(isAxiosError(error) ? error.response?.data.msg : "Error");
    return redirect("/dashboard");
  }
};

const statsLoader: LoaderFunction = async () => {
  try {
    const { data } = await axios.get("/api/v1/jobs/stats");
    return data;
  } catch (error) {
    toast.error(isAxiosError(error) ? error.response?.data.msg : "Error");
    return null;
  }
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      { index: true, element: <Landing /> }, // default page
      {
        path: "register",
        element: <Register />,
        // https://reactrouter.com/en/main/route/action
        // Actions are called whenever the app sends a non-get submission ("post", "put", "patch", "delete") to your route.
        action: registerAction,
      },
      { path: "login", element: <Login />, action: loginAction },
      {
        path: "dashboard",
        // element: <DashboardLayout darkTheme={checkDefaultTheme()} />,
        element: <DashboardLayout />,
        loader: getUserLoader, // getting user is only used to pass user data to subpages (no extra auth logic)
        children: [
          { index: true, element: <AddJob />, action: addJobAction },
          { path: "stats", element: <Stats />, loader: statsLoader },
          {
            path: "all-jobs",
            element: <AllJobs />,
            loader: jobsLoader,
            // action: testAction,
          },
          { path: "edit-job/:id", action: editJob },
          { path: "delete-job/:id", action: deleteJob },
          { path: "profile", element: <Profile />, action: editUser },
          { path: "admin", element: <Admin />, loader: adminLoader },
        ],
      },
    ],
  },
]);

const App: React.FC = () => {
  return (
    <ThemeContextProvider>
      <RouterProvider router={router} />
    </ThemeContextProvider>
  );
};
export default App;
