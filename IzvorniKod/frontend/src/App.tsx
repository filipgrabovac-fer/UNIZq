import { Home } from "./pages/Home/Home";

export const App = () => {
  return (
    <div className="bg-green-200">
      <p>this is working</p>
      <p>
        This is our default page. All of the pages will be rendered inside this
        layout
      </p>
      We will use our components like this one!:
      <Home />
    </div>
  );
};
