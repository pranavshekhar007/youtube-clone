import { Link, useRouteError } from "react-router-dom";

function Error() {
  const err = useRouteError();

  return (
    <div className="error-page text-center p-8">
      <h1 className="text-4xl font-bold">Oops!!</h1>
      <h2 className="text-2xl text-gray-700">
        {err.status} - {err.statusText}
      </h2>
      <p className="text-xl text-gray-500">{err.data || "Page Not Found"}</p>
      <Link
        to="/"
        className="mt-4 inline-block bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition-all duration-300"
      >
        Go Back to Home
      </Link>
    </div>
  );
}

export default Error;
