import { TodoList } from "./_components/TodoList";
import { serverClient } from "./_trpc/server-client";

export default async function Home() {
  const todos = await serverClient.getTodos();

  return (
    <TodoList initialTodos={todos} />
  );
}
