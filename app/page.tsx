import { Container } from "@/src/components/layout";
import Categorybar from "@/src/components/ui/Categorybar";

export default function Home() {
  return (
    <Container className="h-screen">
      <Categorybar />
      <div className="w-full h-full flex justify-center items-center">
        <img src='/logo.png' className="w-64 md:w-80 lg:w-[500px]" alt='' />
      </div>
    </Container>
  );
}
