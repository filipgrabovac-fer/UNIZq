export const useGetUsers = async () => {
  return await fetch("http://localhost:3000/api/users");
};
