export async function getTodoItems(): Promise<TodoItem[]> {
  return [
    {
      id: "3c07bafe-fc6a-412a-b90f-72ddf89c5cc3",
      title: "Shopping",
      description: "Need to buy milk",
      done: false,
    },
    {
      id: "d4476275-c941-4893-a518-a50767f89929",
      title: "Yoga",
      description: null,
      done: true,
    },
  ];
}
