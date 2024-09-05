import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CalendarIcon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@/main";
import { useToast } from "@/hooks/use-toast";
import axiosClient from "@/lib/axios-client";

const phoneRegex = new RegExp(/^[6-9]\d{9}$/);
const passwordValidation = new RegExp(
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
);

const formSchema = z.object({
  name: z
    .string()
    .min(3, {
      message: "Name must be at least 3 characters!",
    })
    .max(100, {
      message: "Name can be at max 100 characters!",
    }),
  email: z
    .string()
    .min(1, { message: "Email is required!" })
    .email("This is not a valid email!"),
  phone: z
    .string()
    .length(10, {
      message: "Phone number must be exactly 10 characters!",
    })
    .regex(phoneRegex, "This is not a valid phone number!"),
  password: z
    .string()
    .min(1, { message: "Password is required!" })
    .regex(passwordValidation, {
      message: "Your password is not valid",
    }),
  dob: z.date({
    required_error: "A date of birth is required.",
  }),
});

function UsersCreatePage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
    },
  });

  const navigate = useNavigate();

  const { toast } = useToast();

  const createUser = useMutation({
    mutationFn: (values: {
      name: string;
      email: string;
      phone: string;
      password: string;
      dob: Date;
    }) => {
      return axiosClient
        .post("/api/v1/users/", values)
        .then((response) => response);
    },
    onSuccess: () => {
      toast({
        title: "User created!",
      });
      form.reset();
      queryClient.invalidateQueries({ queryKey: ["users"] });
      navigate("/users");
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      toast({
        title: error.response.data.error.message,
      });
    },
  });

  function handleSubmit(values: z.infer<typeof formSchema>) {
    createUser.mutateAsync(values);
  }

  return (
    <div className="w-full lg:max-w-screen-lg xl:max-w-screen-xl 2xl:max-w-screen-2xl mx-auto p-4 md:px-6">
      <div className="w-full flex flex-row justify-between items-center">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">
          Create User
        </h1>

        <Link to={"/users"}>
          <Button className="bg-[#FEAF00] hover:bg-[#ffc446] text-white px-4 sm:px-6 py-4 text-base sm:text-lg md:text-xl">
            Go Back
          </Button>
        </Link>
      </div>

      <Separator className="bg-gray-300 my-4" />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      className="bg-white text-black px-4 lg:px-6 py-4 lg:py-5"
                      placeholder="Name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      className="bg-white text-black px-4 lg:px-6 py-4 lg:py-5"
                      placeholder="Email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      className="bg-white text-black px-4 lg:px-6 py-4 lg:py-5"
                      placeholder="Phone"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="dob"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date of birth</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "bg-white text-black px-4 lg:px-6 py-4 lg:py-5 w-full",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      className="bg-white text-black px-4 lg:px-6 py-4 lg:py-5"
                      placeholder="Password"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Minimum 8 characters, at least one uppercase letter, one
                    lowercase letter, one number and one special character
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="w-full flex justify-center">
            <Button
              className="bg-[#FEAF00] hover:bg-[#ffc446] text-white px-4 sm:px-6 py-4 text-base sm:text-lg md:text-xl my-4 lg:my-6"
              type="submit"
            >
              Create User
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

export default UsersCreatePage;
