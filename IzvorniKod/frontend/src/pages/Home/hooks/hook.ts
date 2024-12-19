export const useGetUsers = async () => {
  return await fetch(
    `${import.meta.env.VITE_DEV ? "http://localhost:8080" : ""}/api/users`
  );
};
