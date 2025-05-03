"use client";

export default function ChatMessage({ message }: { message: any }) {
  return (
    <div className="p-2 border-b">
      <p className="text-sm text-gray-500">{message.user_name}</p>
      <p>{message.content}</p>
    </div>
  );
}