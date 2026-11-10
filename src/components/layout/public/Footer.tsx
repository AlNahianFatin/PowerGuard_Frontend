"use client"

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <div className="w-full h-16 border border-t flex justify-center items-center">
      <p className="text-lg font-md font-semibold"> &copy; Power Guard {year}</p>
    </div>
  );
}
