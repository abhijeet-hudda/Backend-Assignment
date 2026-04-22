import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { API } from "../api/api";

// 🔹 Get tasks with filters
export const useTasks = (filters) => {
  return useQuery({
    queryKey: ["tasks", filters],
    queryFn: async () => {
      const { data } = await API.get("/tasks", { params: filters });
      return data.data;
    },
  });
};

// 🔹 Create task
export const useCreateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (task) => API.post("/tasks", task),
    onSuccess: () => {
      queryClient.invalidateQueries(["tasks"]);
    },
  });
};

// 🔹 Delete task
export const useDeleteTask = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (taskId) => API.delete(`/tasks/${taskId}`),
    onSuccess: () => {
      queryClient.invalidateQueries(["tasks"]);
    },
  });
};

// 🔹 Update task
export const useUpdateTask = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ taskId, ...updates }) => API.put(`/tasks/${taskId}`, updates),
    onSuccess: () => {
      queryClient.invalidateQueries(["tasks"]);
    },
  });
};