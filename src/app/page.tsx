import { TodoList } from "@/app/_components/todo-list";
import { serverClient } from "@/app/_trpc/server-client";

export default async function Home() {
  const todos = await serverClient.getTodos();

  return (
    <TodoList initialTodos={todos} />
  );
}
