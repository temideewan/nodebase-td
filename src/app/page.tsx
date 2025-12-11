import { Button } from "@/components/ui/button";
import prisma from "@/lib/database";
const Page = async () => {
  const users = await prisma.user.findMany();
  return <div className="min-h-screen min-w-screen flex items-center justify-center">
    {JSON.stringify(users)}
    <Button variant={"outline"}> Click me</Button>
  </div>;
};

export default Page
