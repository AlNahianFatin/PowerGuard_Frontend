import Image from "next/image";

export default function HomePage() {
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center px-4 text-center">
      <Image src="/logo.svg" alt="Power Guard logo" width="200" height="100" />
      <h1 className="text-5xl font-bold tracking-tight text-primary">
        Welcome to Power Guard!
      </h1>

      <h2 className="mt-4 max-w-2xl text-xl text-muted-foreground md:text-2xl">
        Solving power outage lightning fast
      </h2>
    </div>
  );
}
