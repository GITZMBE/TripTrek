import Categorybar from "@/src/components/ui/Categorybar";

export default function Home() {
  return (
    <main className="w-full h-screen min-h-screen flex flex-col items-center py-[105px] bg-primary">
      <Categorybar />
      <div className="w-full h-full flex justify-center items-center">
        <img src='/logo.png' width='550' height='200' alt='' />
      </div>
    </main>
  );
}
