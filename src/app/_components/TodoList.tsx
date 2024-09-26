"use client";

import React, { useState } from "react";

import { trpc } from "@/app/_trpc/client";

export const TodoList = () => {
    const getTodos = trpc.getTodos.useQuery();
    const addTodos = trpc.addTodo.useMutation({
        onSettled: () => {
            getTodos.refetch();
        },
    });
    const setDone = trpc.setDone.useMutation({
        onSettled: () => {
            getTodos.refetch();
        },
    });

    const [content, setContent] = useState("");

    const addTodoHandler = async () => {
        addTodos.mutate(content);
        setContent("");
    };

    const setDoneHandler = async (id: number, done: boolean) => {
        setDone.mutate({ id, done: +done });
    };

    return (
        <div className="max-w-lg mx-auto my-6">
            <div className="grid gap-2 mb-2">
                <label className="text-lg" htmlFor="content">
                    Content
                </label>
                <input
                    className="text-black border p-2 rounded-md"
                    onChange={(e) => setContent(e.target.value)}
                    value={content}
                    type="text"
                    name="content"
                    id="content"
                    placeholder="Add Todo..."
                />
            </div>
            <button
                className="bg-green-800/90 ml-auto p-2 rounded-md text-white"
                onClick={addTodoHandler}
            >
                Add Todo
            </button>
            <ul className="mt-4 divide-y">
                {getTodos.data?.map((item) => (
                    <li className="p-1 flex gap-1 group " key={item.id}>
                        <input type="checkbox" name="done" checked={!!item.done} id={`done-${item.id}`} onChange={(e) => setDoneHandler(item.id, e.target.checked)} />
                        <label className="group-has-[:checked]:line-through	" htmlFor={`done-${item.id}`}>{item.content}</label>
                    </li>
                ))}
            </ul>
        </div>
    );
};
