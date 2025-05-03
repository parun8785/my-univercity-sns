import LogoutButton from "./LogoutButton";

export default function Header() {
  return (
    <header className="flex justify-between items-center px-6 py-4 bg-gray-100 shadow">
      <h1 className="text-lg font-bold">大学生SNS</h1>
      <LogoutButton />
    </header>
  );
}
