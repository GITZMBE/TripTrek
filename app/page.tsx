import Image from "next/image";


export default function Home() {
  return (
    <main className="w-full min-h-screen flex justify-center items-center bg-primary">
      <Image src='/logo.png' width='550' height='200' alt='' />
    </main>
  );
}
