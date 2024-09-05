import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Pen, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { queryClient } from "@/main";
import axiosClient from "@/lib/axios-client";

function UserCard({
  id,
  name,
  email,
  phone,
  dob,
}: {
  id: number;
  name: string;
  email: string;
  phone: string;
  dob: string;
}) {
  const { toast } = useToast();

  const deleteUser = useMutation({
    mutationFn: (userId: number) => {
      return axiosClient
        .delete(`/api/v1/users/${userId}`)
        .then((response) => response.data);
    },
    onSuccess: () => {
      toast({
        title: "User deleted!",
      });
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      toast({
        title: error.response.data.error.message,
      });
    },
  });
  return (
    <Card className="border-none shadow-none">
      <CardContent className="p-6 hidden lg:flex flex-row justify-between items-center">
        <p className="min-w-32">{name}</p>
        <p className="min-w-80">{email}</p>
        <p className="min-w-32">{phone}</p>
        <p className="min-w-32">{format(new Date(dob), "dd-MMM, yyyy")}</p>
        <div className="min-w-28 flex justify-end">
          <Link to={`/users/update/${id}`}>
            <Button className="bg-transparent border-none text-[#FEAF00] shadow-none hover:bg-transparent">
              <Pen size={19} />
            </Button>
          </Link>
          <Button
            onClick={() => deleteUser.mutateAsync(id)}
            className="bg-transparent border-none text-[#FEAF00] shadow-none hover:bg-transparent"
          >
            <Trash2 size={19} />
          </Button>
        </div>
      </CardContent>

      <CardContent className="p-4 sm:p-6 grid grid-cols-5 grid-rows-4 sm:grid-cols-10 sm:grid-rows-2 lg:hidden">
        <p className="col-span-3 col-start-1 col-end-5 row-span-1 row-start-1 row-end-2 sm:col-span-2 sm:col-start-1 sm:col-end-3 sm:row-span-1">
          {name}
        </p>
        <p className="col-span-3 col-start-1 col-end-5 row-span-1 row-start-2 row-end-3 sm:col-span-7 sm:col-start-3 sm:col-end-10 sm:row-span-1">
          {email}
        </p>
        <p className="col-span-3 col-start-1 col-end-5 row-span-1 row-start-3 row-end-4 sm:col-span-2 sm:col-start-1 sm:col-end-3 sm:row-span-1">
          {format(new Date(dob), "dd-MMM, yyyy")}
        </p>
        <p className="col-span-3 col-start-1 col-end-5 row-span-1 row-start-4 row-end-5 sm:col-span-7 sm:col-start-3 sm:col-end-10 sm:row-span-1">
          {phone}
        </p>
        <div className="col-span-1 col-start-5 col-end-6 row-span-4 row-start-1 row-end-5 sm:col-start-10 sm:col-end-11 sm:row-span-2 sm:row-start-1 sm:row-end-3">
          <div className="col-span-1 flex flex-col justify-end">
            <Link to={`/users/update/${id}`}>
              <Button className="bg-transparent border-none text-[#FEAF00] shadow-none hover:bg-transparent">
                <Pen size={19} />
              </Button>
            </Link>
            <Button
              onClick={() => deleteUser.mutateAsync(id)}
              className="bg-transparent border-none text-[#FEAF00] shadow-none hover:bg-transparent"
            >
              <Trash2 size={19} />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default UserCard;
