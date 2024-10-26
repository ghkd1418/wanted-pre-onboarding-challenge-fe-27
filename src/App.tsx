import { RouterProvider } from "react-router-dom";
import { AuthProvider } from "./app/AuthProvider";
import { routers } from "./app/router";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={routers} />
      <Toaster />
    </AuthProvider>
  );
}

export default App;
