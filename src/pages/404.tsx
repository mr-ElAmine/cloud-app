export default function Custom404() {
  return (
    <div className="flex h-screen justify-center items-center">
      <title>The Cude: 404 - Not Found</title>
      <div className="text-center">
        <h1 className="text-5xl font-bold mb-4">404 - Not Found</h1>
        <p className="text-gray-600">
          Sorry, the page you're looking for doesn't exist.
        </p>

        <p className="mt-4 text-gray-600 flex gap-1 justify-center">
          Let's get you back
          <a href="/dashboard" className="text-blue-500">
            dashboard
          </a>
          .
        </p>
      </div>
    </div>
  );
}
